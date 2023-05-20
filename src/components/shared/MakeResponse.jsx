
import React, { useContext, useEffect, useState } from "react";
import Icons from "./Icons";
import BotanicContext from "../../context/BotanicContext";
import { useLocalStorage } from "../../context/useLocalStorage";
import SeeRequestDetails from "./SeeRequestDetails";


function MakeResponse({requestId}) {

    const [id, setId] = useState(requestId);

    const [request, setRequest] = useState("");

    const [responseFile, setresponseFile] = useState("");

    const { baseUrl, user } = useContext(BotanicContext);

    const { getItem } = useLocalStorage();

    const sendData = () => {

        const form = document.querySelector("form#responseForm");
        var responeSideBar = document.querySelector(".make-response.sidebar-container");
        var detailsSideBar = document.querySelector(".request-detail.sidebar-container");

        const XHR = new XMLHttpRequest();
        const FD = new FormData(form);

        // Define what happens on successful data submission
        XHR.addEventListener("load", (event) => {
            alert(JSON.stringify(event));
            console.log(responeSideBar);
            responeSideBar.classList.remove('active');
            detailsSideBar.classList.remove('active');
            document.querySelector(".click-capture").classList.remove("click-capture-event");
        });
    
        // Define what happens in case of error
        XHR.addEventListener("error", (event) => {
            alert('Oops! Something went wrong.');
        });
    
        // Set up our request
        XHR.open("POST", baseUrl + "/api/design/response", true);
        XHR.setRequestHeader("Authorization", "Bearer " + getItem("token"));

        // The data sent is what the user provided in the form
        XHR.send(FD);
    }

    const formSubmit = (e) => {
        e.preventDefault();

        sendData();
        
    }

    const getRequest = async () => {

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + getItem("token"));

        var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
        };

        let response = await fetch(baseUrl + "/api/design/request/" + id, requestOptions);
        let data = await response.json();
        console.log(data);
        if (data.isSuccess) {
            setRequest(data.data);
        }
    }

    const setResponseMessage = (e) => {
        var hiddenInput = document.querySelector(`#${e.target.id}+input[name='responseMessage']`);
        hiddenInput.setAttribute("value", e.target.value);
    }

    const closeSideBarResponse = (e) => {
        e.preventDefault();
        document.querySelector(".make-response.sidebar-container").classList.remove("active");

        document.querySelector('.request-detail.sidebar-container').classList.remove('active');
        document.querySelector('.request-detail.sidebar-container').classList.remove('reversed');
        

        document.querySelector('.click-capture').classList.remove('click-capture-event');
    }

    const setMutationObserver = () => {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === "attributes") {
                    setId(mutation.target.dataset.responseId);
                }
            });
        });    
        
        observer.observe(document.querySelector('.make-response.sidebar-container'), {
            attributes: true //configure it to listen to attribute changes
        });
    }

    const setResponseFile = (e) => {
        var fileInput = document.querySelector('#designFile');
        setresponseFile(fileInput.files[0]);
    }


    const isForm = (status) => {
        if (status === 2) {
            return (
                <form action="POST" id="responseForm" encType="multipart/form-data">
                    <div className="sidebar--content">
                        <input type="hidden" name="designRequestId" id="design-type-id" value={request.id} />
                        <div className="response-message design-option">
                            <p className="design-option--title">Design Request Message:</p>
                            <textarea onChange={(e) => setResponseMessage(e)} rows="10" cols="40" id="responseMessage" placeholder="Response Message"></textarea>
                            <input type="hidden" name="responseMessage" id="response-message" />
                        </div>
                        <div className="response-file design-option">
                            <p className="design-option--title">Response File:</p>
                            <input onChange={(e) => setResponseFile(e)} type="file" name="file" id="responseFile" />
                        </div>
                    </div>
                    <div className="sidebar-footer">
                        <button className="button" onClick={(e) => closeSideBarResponse(e)}>
                            {<Icons icon="chevronleft" link="" />}
                            <p>Return</p>
                        </button>
                        <button type="submit" name="responseSubmit" className="button response-submit" onClick={(e) => formSubmit(e)}>
                            <div className="loader-4"><span></span></div>
                            <span>Send Response</span>
                        </button>
                    </div>
                </form>
            );
        } else if (status === 3) {
            return(
                <div className="replied-request-container">
                    This reuqest has been replied.
                </div>
            );
        } 
    }

    useEffect(() => {
        setMutationObserver();
    
    }, []);

    useEffect(() => {
        getRequest();
    }, [id]);


    return(
        <>
        <div className="make-response sidebar-container" data-response-id={id}>
            <div className="sidebar--info">
                <div className="sidebar--title">
                    <h2>Make A Response</h2>
                </div>
                <div className="sidebar--body">
                    {isForm(request.designStatusId)}
                </div>
            </div>
        </div>
        </>        
    );

}


export default MakeResponse;