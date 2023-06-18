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
        <div className="ko-main-footer">
            <div className="footer-content">
                <p>Botanic Tech @2023,  All rights are reserved. </p>
                <span>Designed By KAL Tech</span>
            </div>
        </div>
        <FullMenu mode="mobile" userCheck={userCheck} openMakeRequestSidebar={openMakeRequestSideBar}/>
        <div className="click-capture" onClick={(e) => clickCaptureEvent(e)}></div>
        </>
    )
}

export default Footer;