import React, { useContext, useEffect, useState } from "react";
import Icons from "./Icons";
import BotanicContext from "../../context/BotanicContext";
import "../../assets/css/make-request.css";
import { useLocalStorage } from "../../context/useLocalStorage";

function MakeRequest(params) {

    const selectEvent = (e) => {
        var hiddenInput = document.querySelector(`#${e.target.id}+input[name='designTypeId']`);
        hiddenInput.setAttribute("value", e.target.value);
    }

    const {baseUrl, user} = useContext(BotanicContext);

    const { getItem } = useLocalStorage();

    const [designTypes, setDesignTypes] = useState([]);
    
    const [requestFile, setrequestFile] = useState("");

    const closeSideBarRequest = (e) => {
        e.preventDefault();
        document.querySelector(".request.sidebar-container").classList.remove("active");
        document.querySelector('.click-capture').classList.remove('click-capture-event');
    }

    const getDesignTypes = async () => {

        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        let response = await fetch(baseUrl + "/api/constant/enum/designtypes", requestOptions);
        let data = await response.json();

        data.data.map(data => {
            setDesignTypes(current => [...current, data]);
        });

    }

    const setEventListeners = () => {

        var requestSideBar = document.querySelector(".request.sidebar-container");

        var sizeInputs = requestSideBar.querySelectorAll(".design-sizes input");

        sizeInputs.forEach(element => {
            element.addEventListener("input", (e) => {
                element.setAttribute("value", e.target.value);
            });
        });


        var formSubmitButton = requestSideBar.querySelector(".button.request-submit");
        
        formSubmitButton.addEventListener("click", (e) => formSubmit(e));
    }

    const sendData = () => {

        const form = document.querySelector("form#requestForm");
        var requestSideBar = document.querySelector(".request.sidebar-container");

        const XHR = new XMLHttpRequest();
        const FD = new FormData(form);

        // Define what happens on successful data submission
        XHR.addEventListener("load", (event) => {
            alert(event.target.responseText.Message);
            console.log(requestSideBar);
            requestSideBar.classList.remove('active');
            document.querySelector(".click-capture").classList.remove("click-capture-event");
        });
    
        // Define what happens in case of error
        XHR.addEventListener("error", (event) => {
            alert('Oops! Something went wrong.');
        });
    
        // Set up our request
        XHR.open("POST", baseUrl + "/api/design/request", true);
        XHR.setRequestHeader("Authorization", "Bearer " + getItem("token"));

        // The data sent is what the user provided in the form
        XHR.send(FD);
    }

    const formSubmit = (e) => {
        e.preventDefault();

        sendData();
        
    }
    
    const setRequestMessage = (e) => {
        var hiddenInput = document.querySelector(`#${e.target.id}+input[name='requestMessage']`);
        hiddenInput.setAttribute("value", e.target.value);
    }

    const setRequestFile = (e) => {
        var fileInput = document.querySelector('#designFile');
        setrequestFile(fileInput.files[0]);
    }

    useEffect(() => {
        getDesignTypes();
        document.querySelector("select#design-types-select").setAttribute("value", "1");
        setEventListeners();
    }, []);

    return (
        <div className="request sidebar-container">
            <div className="sidebar--info">
                <div className="sidebar--title">
                    <h2>Make Design Request</h2>
                </div>
                <div className="sidebar--body">
                    <form action="POST" id="requestForm" encType="multipart/form-data">
                        <div className="sidebar--content">
                            <div className="design-type design-option">
                                <p className="design-option--title">Design Type:</p>
                                <select onChange={(e) => selectEvent(e)} name="designTypeId" id="design-types-select">
                                    {designTypes.map((type, index) => {
                                        return(
                                            <option value={type.value} key={index}>
                                                {type.key}
                                            </option>
                                        )
                                    })}
                                </select>
                                <input type="hidden" name="designTypeId" id="design-type-id" />
                            </div>
                            <div className="design-sizes design-option">
                                <p className="design-option--title">Size:</p>
                                <div className="size-inputs">
                                    <input type="number" placeholder="Height" name="height" id="height" />
                                    <input type="number" placeholder="Width" name="width" id="width" />
                                </div>
                            </div>
                            <div className="design-request-file design-option">
                                <p className="design-option--title">Your File:</p>
                                <input onChange={(e) => setRequestFile(e)} type="file" name="file" id="designFile" />
                            </div>
                            <div className="design-request-message design-option">
                                <p className="design-option--title">Design Request Message:</p>
                                <textarea name="requestMessage" onChange={(e) => setRequestMessage(e)} rows="10" cols="40" id="designMessage" placeholder="Your Design Request Message"></textarea>
                                <input type="hidden" name="requestMessage" id="request-message" />
                            </div>
                        </div>
                        <div className="sidebar-footer">
                            <button className="button" onClick={(e) => closeSideBarRequest(e)}>
                                {<Icons icon="chevronleft" link="" />}
                                <p>Return</p>
                            </button>
                            <button type="submit" name="requestSubmit" className="button request-submit">
                                <div className="loader-4"><span></span></div>
                                <span>Make Request</span>
                            </button>
                        </div>  
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MakeRequest;