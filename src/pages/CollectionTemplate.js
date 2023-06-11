

import { Outlet } from "react-router-dom";
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function CollectionTemplate({isUser, openMakeRequestSideBar}) {
    return (
        <>
        <Header transparent={true}  userCheck={isUser} openMakeRequestSideBar={openMakeRequestSideBar} />
        <Outlet />
        <Footer userCheck={isUser} openMakeRequestSideBar={openMakeRequestSideBar} />
        </>
    );
}

export default CollectionTemplate;