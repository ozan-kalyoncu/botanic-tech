import './assets/css/App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Designs from './pages/Designs';
import SubscriptionPlans from './pages/Subscriptions';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { useState, useEffect } from 'react';
import { BotanicProvider } from './context/BotanicContext';
import { useLocalStorage } from './context/useLocalStorage';
import MakeRequest from './components/shared/MakeRequest';

function App() {

  const { getItem, removeAll } = useLocalStorage();


  const [baseUrl, setBaseUrl] = useState("https://mis-botanic.herokuapp.com");

  const [isSubscription, setIsSubscription] = useState(false);
  
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
    <BotanicProvider user={user} baseUrl={baseUrl} isExpired={tokenExpireCheck} isSubscription={isSubscription}>
    <Router>
        <div className="App">
          <Header  userCheck={isUser} openMakeRequestSideBar={openMakeRequestSideBar} />

          <main>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/pages/about' element={<About />}></Route>
              <Route path='/pages/contact' element={<Contact />}></Route>
              <Route path='/pages/login' element={<LogIn />}></Route>
              <Route path='/pages/signup' element={<SignUp />}></Route>
              <Route path='/subscriptions' element={<SubscriptionPlans isUser={isUser} />}></Route>
              {isUser ? (<Route path='/pages/designs' element={<Designs />}></Route>) : null}
            </Routes>
            <MakeRequest />
          </main>

          <Footer userCheck={isUser} openMakeRequestSideBar={openMakeRequestSideBar} />
        </div>
      </Router>
      </BotanicProvider>
  );
}

export default App;
