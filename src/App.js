import './assets/css/App.css';
/* Page Imports */
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Designs from './pages/Designs';
import PlantCollection from './pages/PlantCollection';
import SubscriptionPlans from './pages/Subscriptions';
import DecorationItemCollection from './pages/DecorationItemCollection';
import PageTemplate from './pages/PageTemplate';
import CollectionTemplate from './pages/CollectionTemplate';
/* Content Provider And Storage Imports */
import { BotanicProvider } from './context/BotanicContext';
import { useLocalStorage } from './context/useLocalStorage';

/* React Imports */
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* Shared Import */
import MakeRequest from './components/shared/MakeRequest';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {

  const { getItem, removeAll } = useLocalStorage();

  const [isSubscription, setIsSubscription] = useState(false);
  
  const [baseUrl, setBaseUrl] = useState("https://mis-botanic.herokuapp.com");

  const [isUser, setIsUser] = useState(false);

  const [user, setUser] = useState({
    userType: 0,
    token: "",
    firstName: "",
    lastName: ""
  });

  const isUserLoggedIn = () => {
    if (getItem("token")) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }


  const tokenExpireCheck = () => {
    // if (jwtDecode(getItem("token")).exp < Date.now() / 1000) {
    //   removeAll();
    // }
  }


  const hasSubscription = async () => {

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + getItem("token"));

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };

    let response = await fetch(baseUrl + "/api/subscription/hassubscription", requestOptions);
    let data = await response.json();

    setIsSubscription(data.data);
  }

  const openMakeRequestSideBar = (e) => {
    e.preventDefault();
    if (isSubscription) {
      let requestSidebar = document.querySelector('.request.sidebar-container');
      document.querySelectorAll(".sidebar-container.active").forEach(element => {
        element.classList.remove('active');
      });
      requestSidebar.classList.add('active');
      document.querySelector('.click-capture').classList.add('click-capture-event');
    } else {
      window.location = "/subscriptions";
    }
    
  }


  useEffect(() => {
    isUserLoggedIn();    
    hasSubscription();
  }, []);

  useEffect(() => {
    setUser({token: getItem("token"), firstName: getItem("firstName"), lastName: getItem("lastName"), userType: getItem("userType"), email: getItem("email")});
  }, [isUser])

  return (
    <BotanicProvider user={user} isExpired={tokenExpireCheck} isSubscription={isSubscription}>
    <Router>
        <div className="App">
            <Routes>
              <Route path='' element={<PageTemplate userCheck={isUser} openMakeRequestSideBar={openMakeRequestSideBar} />}>
                <Route path='/' element={<Home />}></Route>
                <Route path='/pages/about' element={<About />}></Route>
                <Route path='/pages/contact' element={<Contact />}></Route>
                <Route path='/pages/login' element={<LogIn />}></Route>
                <Route path='/pages/signup' element={<SignUp />}></Route>
                {isUser ? (<Route path='/pages/designs' element={<Designs />}></Route>) : null}
              </Route>
              <Route path='' element={<CollectionTemplate userCheck={isUser} openMakeRequestSideBar={openMakeRequestSideBar} />}>
                <Route path='/subscriptions' element={<SubscriptionPlans isUser={isUser} />}></Route>
                <Route path='/collection/plants' element={<PlantCollection isUser={isUser} />}></Route>
                <Route path='/collection/decorationitems' element={<DecorationItemCollection isUser={isUser} />}></Route>
              </Route>
            </Routes>
        </div>
      </Router>
      </BotanicProvider>
  );
}

export default App;
