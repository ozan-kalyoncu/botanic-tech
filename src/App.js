import './assets/css/App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Payment from './pages/Payment';
import SubscriptionPlans from './pages/Subscriptions';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/pages/about' element={<About />}></Route>
            <Route path='/pages/contact' element={<Contact />}></Route>
            <Route path='/pages/login' element={<LogIn />}></Route>
            <Route path='/pages/signup' element={<SignUp />}></Route>
            <Route path='/payment' element={<Payment />}></Route>
            <Route path='/subscriptions' element={<SubscriptionPlans />}></Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
