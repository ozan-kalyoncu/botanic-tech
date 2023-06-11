

import { Outlet } from "react-router-dom";
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function PageTemplate({isUser, openMakeRequestSideBar}) {
    return (
        <>
        <Header transparent={false}  userCheck={isUser} openMakeRequestSideBar={openMakeRequestSideBar} />
        <Outlet />
        <Footer userCheck={isUser} openMakeRequestSideBar={openMakeRequestSideBar} />
        </>
    );
}

export default PageTemplate;