
import React from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from './About';
import Contact from './Contact';
import LogIn from './LogIn';
import SignUp from './SignUp';


function Pages() {
    return (
        <>
        <Routes>
            <Route exact path='/pages' element={<PageHome />}></Route>
            <Route path='/pages/about' element={<About />}></Route>
            <Route path='/pages/contact' element={<Contact />}></Route>
            <Route path='/pages/login' element={<LogIn />}></Route>
            <Route path='/pages/signup' element={<SignUp />}></Route>
        </Routes>
        </>
    );
}

function PageHome () {
    return (
        <>
        Pages Home
        </>
    )
}

export default Pages;