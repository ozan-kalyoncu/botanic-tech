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

function App() {

  const { getItem } = useLocalStorage();

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

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  useEffect(() => {
    setUser({token: getItem("token"), firstName: getItem("firstName"), lastName: getItem("lastName"), userType: getItem("userType"), email: getItem("email")});
  }, [isUser])

  return (
    <BotanicProvider user={user} baseUrl="https://mis-botanic.herokuapp.com">
    <Router>
        <div className="App">
          <Header  userCheck={isUser} />

          <main>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/pages/about' element={<About />}></Route>
              <Route path='/pages/contact' element={<Contact />}></Route>
              <Route path='/pages/login' element={<LogIn />}></Route>
              <Route path='/pages/signup' element={<SignUp />}></Route>
              <Route path='/subscriptions' element={<SubscriptionPlans />}></Route>
              {isUser ? (<Route path='/pages/designs' element={<Designs />}></Route>) : null}
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
      </BotanicProvider>
  );
}

export default App;
