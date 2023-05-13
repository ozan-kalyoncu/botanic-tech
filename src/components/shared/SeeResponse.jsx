
import React, { useEffect, useState, useContext } from "react";
import { useLocalStorage } from "../../context/useLocalStorage";
import BotanicContext from "../../context/BotanicContext";
import Icons from "./Icons";

function SeeResponse({requestId}) {

    const [id, setId] = useState(requestId);

    const [responseInfo, setResponseInfo] = useState("");

    const [fileUrlObj, setFileUrlObj] = useState("");

    const { baseUrl, user } = useContext(BotanicContext)

    const { getItem } = useLocalStorage();

    const getResponseInfo = async () => {

        var headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        let response = await fetch(baseUrl + `/api/design/response/request/${id}`, requestOptions);
        let data = await response.json();

        if (data.isSuccess) {
            setResponseInfo(data.data);
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
        
        observer.observe(document.querySelector('.request-response.sidebar-container'), {
            attributes: true //configure it to listen to attribute changes
        });
    }

    const closeSideBarDetails = () => {
        document.querySelector(".request-response.sidebar-container").classList.remove("active");
        document.querySelector('.click-capture').classList.remove('click-capture-event');
    }

    const setDownload = async () => {

        var headers = new Headers();
        
        headers.append("Authorization", "Bearer " + getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        const response = await fetch(baseUrl + "/api/design/response/file/" + responseInfo.id, requestOptions);

        const data = await response.blob();

        const objUrl = window.URL.createObjectURL(data);

        setFileUrlObj(objUrl);
    }

    useEffect(() => {
        setMutationObserver();
        setDownload();
    }, []);

    useEffect(() => {
        getResponseInfo();
    }, [id]);

    useEffect(() => {
        console.log(responseInfo);
    }, [responseInfo]);

    return(
        <div className="request-response sidebar-container reversed" data-request-id={id}>
            <div className="sidebar--info">
                <div className="sidebar--content">
                    <div className="sidebar--title">
                        <h2>Response Detail</h2>
                    </div>
                    <div className="sidebar--body">
                        <div className="content-wrapper">
                            <p className="form-title">Designer</p>
                            <div className="designer-info">{ responseInfo.designerUserFullName }</div>
                        </div>
                        <div className="sidebar--body-tab">
                            <div className="title-holder">
                                <p className="form-title">Response Message:</p>
                            </div>
                            <p>{ responseInfo.responseMessage }</p>
                        </div>
                        <div className="sidebar--body-tab">
                            <div className="title-holder">
                                <p className="form-title">Response File:</p>
                            </div>
                            <div className="response-file content-wrapper"> 
                                <a href={fileUrlObj} download>Download File</a>
                                { responseInfo.fileName ? (
                                    <p>{ responseInfo.fileName.substring(0, 30) + "..." }</p>
                                ) : (
                                    ""
                                ) }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sidebar-footer">
                    <button onClick={() => closeSideBarDetails()} type="button" name="" className="button">
                        <p>Return to requests</p>
                        {<Icons icon="chevronleft" link="" />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SeeResponse;