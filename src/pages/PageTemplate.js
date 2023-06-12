

import { Outlet } from "react-router-dom";
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MakeRequest from "../components/shared/MakeRequest";

function PageTemplate({userCheck, openMakeRequestSideBar}) {
    return (
        <>
        <Header transparent={false}  userCheck={userCheck} openMakeRequestSideBar={openMakeRequestSideBar} />
        <div id="wrapper">
            <Outlet />
            {userCheck && (<MakeRequest />)}
        </div>
        <Footer userCheck={userCheck} openMakeRequestSideBar={openMakeRequestSideBar} />
        </>
    );
}

export default PageTemplate;