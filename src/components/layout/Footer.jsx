import React from "react";
import FullMenu from "../shared/Menu";

function Footer({userCheck, openMakeRequestSideBar}) {

    const clickCaptureEvent = (e) => {
        e.preventDefault();

        e.target.classList.remove("click-capture-event");

        document.querySelectorAll(".sidebar-container.active").forEach(sidebar => {
            sidebar.classList.remove("active");
        });
    }

    return (
        <>
        <FullMenu mode="mobile" userCheck={userCheck} openMakeRequestSidebar={openMakeRequestSideBar}/>
        <div className="click-capture" onClick={(e) => clickCaptureEvent(e)}></div>
        </>
    )
}

export default Footer;