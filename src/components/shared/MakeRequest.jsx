import React, { useContext, useEffect, useState } from "react";
import Icons from "./Icons";
import BotanicContext from "../../context/BotanicContext";
import "../../assets/css/make-request.css";
import { useLocalStorage } from "../../context/useLocalStorage";

function MakeRequest(params) {

    const selectEvent = (e) => {
        e.target.setAttribute("value", e.target.value);
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

    const makeRequest = async (e) => {
        e.preventDefault();

        var headers = new Headers();
        
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + getItem("token"));

        var requestSideBar = document.querySelector(".request.sidebar-container"),
            designTypeId = Number(requestSideBar.querySelector("select#design-types-select").value),
            height = parseFloat(requestSideBar.querySelector("input#height").value),
            width = parseFloat(requestSideBar.querySelector("input#width").value),
            requestMessage = requestSideBar.querySelector("textarea").value

        var body = JSON.stringify({
            "designTypeId": designTypeId,
            "file": requestFile,
            "height": height,
            "width": width,
            "requestMessage": requestMessage
        });

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: body,
            redirect: "follow"
        }

        let response = await fetch( baseUrl + "/api/design/request", requestOptions );
        let data = await response.json();


        console.log(data);
        console.log(requestFile);

        if (data.isSuccess) {
            alert(data.Message);
            window.location = '/pages/designs';
        } else {
            requestSideBar.classList.add('request-failed');
            alert(data.Message);
        }
    }

    const setEventListeners = () => {

        var requestSideBar = document.querySelector(".request.sidebar-container");

        var sizeInputs = requestSideBar.querySelectorAll(".design-sizes input");

        sizeInputs.forEach(element => {
            element.addEventListener("input", (e) => {
                element.setAttribute("value", e.target.value);
            });
        });


        window.addEventListener("load", () => {
            function sendData() {
                const XHR = new XMLHttpRequest();
                const FD = new FormData(form);

                // Define what happens on successful data submission
                XHR.addEventListener("load", (event) => {
                    alert(event.target.responseText);
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

            const form = document.querySelector("form#requestForm");

            // Add 'submit' event handler
            form.addEventListener("submit", (event) => {
                event.preventDefault();

                sendData();
            });
        })
    }

    const setRequestMessage = (e) => {
        e.target.setAttribute("value", e.target.value);
    }

    const setRequestFile = (e) => {
        var fileInput = document.querySelector('#designFile');
        setrequestFile(fileInput.files[0]);
    }

    useEffect(() => {
        getDesignTypes();
        //document.querySelector("select#design-types-select").setAttribute("value", "1");
        setEventListeners();
    }, []);

    return (
        <div className="request sidebar-container">
            <div className="sidebar--info">
                <div className="sidebar--title">
                    <h2>Make Design Request</h2>
                </div>
                <div className="sidebar--body">
                    <form action="POST" id="requestForm" enctype="multipart/form-data">
                        <div className="design-type design-option">
                            <p className="design-option--title">Design Type:</p>
                            {/* <select onChange={(e) => selectEvent(e)} name="designTypeId" id="design-types-select">
                                {designTypes.map(type => {
                                    return(
                                        <option value={type.value}>
                                            {type.key}
                                        </option>
                                    )
                                })}
                            </select> */}
                            <input type="number" name="designTypeId" />
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
                            {/* <textarea name="requestMessage" onChange={(e) => setRequestMessage(e)} rows="10" cols="40" id="designMessage" placeholder="Your Design Request Message"></textarea> */}
                            <input type="text" name="requestMessage" />
                        </div>
                        <div className="sidebar-footer">
                            <button onClick={(e) => closeSideBarRequest(e)}>
                                {<Icons icon="chevronleft" link="" />}
                                <p>Return</p>
                            </button>
                            <button type="submit" name="requestSubmit" className="button request-submit">Make Request</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
}

export default MakeRequest;