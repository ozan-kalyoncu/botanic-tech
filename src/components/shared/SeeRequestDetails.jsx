

import React, { useEffect, useState, useContext } from "react";
import Icons from "./Icons";
import { useLocalStorage } from "../../context/useLocalStorage";
import BotanicContext from "../../context/BotanicContext";
import '../../assets/css/see-request-details.css';

function SeeRequestDetails({requestId}) {

    const [id, setId] = useState(requestId);

    const [requestInfo, setRequestInfo] = useState("");

    const [fileUrlObj, setFileUrlObj] = useState("");

    const closeSideBarDetails = () => {
        document.querySelector(".request-detail.sidebar-container").classList.remove("active");
        document.querySelector('.click-capture').classList.remove('click-capture-event');
    }

    const { baseUrl, user } = useContext(BotanicContext)

    const { getItem } = useLocalStorage();

    const setDownload = async () => {

        var headers = new Headers();
        
        headers.append("Authorization", "Bearer " + getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        const response = await fetch(baseUrl + "/api/design/response/file/" + requestInfo.id, requestOptions);

        const data = await response.blob();

        const objUrl = window.URL.createObjectURL(data);

        setFileUrlObj(objUrl);
    }

    const getRequestInfo = async () => {

        var headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        let response = await fetch(baseUrl + `/api/design/request/${id}`, requestOptions);
        let data = await response.json();

        if (data.isSuccess) {
            setRequestInfo(data.data);
        }
    }

    const openResponse = () => {
        
        var responseSidebar = document.querySelector(".request-response.sidebar-container");

        document.querySelectorAll(".sidebar-container.active").forEach(element => {
            element.classList.remove('active');
        });

        responseSidebar.setAttribute("data-request-id", id);

        responseSidebar.classList.add("active");
    }

    const setMutationObserver = () => {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === "attributes") {
                    setId(mutation.target.dataset.requestId);
                }
            });
        });    
        
        observer.observe(document.querySelector('.request-detail.sidebar-container'), {
            attributes: true //configure it to listen to attribute changes
        });
    }

    useEffect(() => {
        setMutationObserver();
    }, []);

    useEffect(() => {
        getRequestInfo();
        setDownload();
    }, [id]);

    useEffect(() => {
        console.log(requestInfo);
    }, [requestInfo]);

    return(
        <div className="request-detail sidebar-container" data-request-id={id}>
            <div className="sidebar--info">
                <div className="sidebar--content">
                    <div className="sidebar--title">
                        <h2>Details</h2>
                    </div>
                    <div className="sidebar--body">
                        <div className="request-status sidebar--body-tab">
                            <div className="title-holder">
                                <p className="form-title">
                                    Status:
                                </p>
                            </div>
                            <p>{requestInfo.designStatusName}</p>
                        </div>
                        <div className="request-content sidebar--body-tab">
                            <div className="title-holder">
                                <p className="form-title">
                                    Content:
                                </p>
                            </div>
                            <p>
                                {requestInfo.requestMessage}
                            </p>
                        </div>
                        <div className="request-design-type sidebar--body-tab">
                            <div className="title-holder">
                                <p className="form-title">
                                    Design Type:
                                </p>
                            </div>
                            <p>{requestInfo.designTypeName}</p>
                        </div>
                        <div className="request-date sidebar--body-tab">
                            <div className="title-holder">
                                <p className="form-title">
                                    Requested Date:
                                </p>
                            </div>
                            <p>{requestInfo.fileName}</p>
                        </div>
                        <div className="request-file sidebar--body-tab">
                            <div className="title-holder">
                                <p className="form-title">
                                    File:
                                </p>
                            </div>
                            <div className="request-file content-wrapper"> 
                                <a href={fileUrlObj} download>Download File</a>
                                { requestInfo.fileName ? (
                                    <p>{ requestInfo.fileName.substring(0, 30) + "..." }</p>
                                ) : "" }
                            </div>
                        </div>
                        <div className="request-sizes sidebar--body-tab">
                            <div className="title-holder">
                                <p className="form-title">
                                    Sizes:
                                </p>
                            </div>
                            <div className="size-holder">
                                <div className="size">
                                    <p className="size-title">Width:</p>
                                    <p>{requestInfo.width}</p>
                                </div>
                                <div className="size">
                                    <p className="size-title">Heigth:</p>
                                    <p>{requestInfo.height}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sidebar-footer">
                    <button onClick={() => closeSideBarDetails()} type="button" name="" className="button">
                        {<Icons icon="chevronleft" link="" />}
                        <p>Return to requests</p>
                    </button>
                    <button onClick={() => openResponse()} type="button" name="see-response" className={ "button " + (requestInfo.designStatusId != 3 ? "unactive" : " ")  }>
                        <p>See response</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SeeRequestDetails;