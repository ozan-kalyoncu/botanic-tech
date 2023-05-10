

import React, { useEffect, useState, useContext } from "react";
import Icons from "./Icons";
import { useLocalStorage } from "../../context/useLocalStorage";
import BotanicContext from "../../context/BotanicContext";
import '../../assets/css/see-request-details.css';

function SeeRequestDetails({requestId}) {

    const [id, setId] = useState(requestId);

    const [requestInfo, setRequestInfo] = useState("");

    const closeSideBarDetails = () => {
        document.querySelector(".request-detail.sidebar-container").classList.remove("active");
        document.querySelector('.click-capture').classList.remove('click-capture-event');
    }

    const { baseUrl, user } = useContext(BotanicContext)

    const { getItem } = useLocalStorage();

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
                        <div className="request-content sidebar--body-tab">
                            <div className="title-holder">
                                <p className="form-title">
                                    Content
                                </p>
                            </div>
                            <p>
                                {requestInfo.requestMessage}
                            </p>
                        </div>
                        <div className="request-design-type sidebar--body-tab">
                            <div className="title-holder">
                                <p className="form-title">
                                    Design Type
                                </p>
                            </div>
                            <p>{requestInfo.designTypeName}</p>
                        </div>
                        <div className="request-date sidebar--body-tab">
                            <div className="title-holder">
                                <p className="form-title">
                                    Requested Date
                                </p>
                            </div>
                            <p>{requestInfo.fileName}</p>
                        </div>
                        <div className="request-status sidebar--body-tab">
                            <div className="title-holder">
                                <p className="form-title">
                                    Status
                                </p>
                            </div>
                            <p>{requestInfo.designStatusName}</p>
                        </div>
                    </div>
                </div>
                <div className="sidebar--footer">
                    <button onClick={() => closeSideBarDetails()} type="button" name="" className="button">
                        {<Icons icon="chevronleft" link="" />}
                        <p>Return to requests</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SeeRequestDetails;