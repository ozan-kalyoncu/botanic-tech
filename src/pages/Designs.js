
import "../assets/css/designs.css";
import React, { useContext, useEffect, useState } from "react";
import BotanicContext from "../context/BotanicContext";
import { useLocalStorage } from "../context/useLocalStorage";
import SeeRequestDetails from "../components/shared/SeeRequestDetails";
import SeeResponse from "../components/shared/SeeResponse";
import Icons from "../components/shared/Icons";

function Designs() {

    const [requests, setRequests] = useState([]);

    const [initialId, setInitialId] = useState("");

    const { baseUrl, user } = useContext(BotanicContext);

    const { getItem } = useLocalStorage();

    const hasSubscription = async () => {
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + getItem("token"));

        var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
        };

        let response = await fetch(baseUrl + "/api/subscription/hassubscription", requestOptions);
        let data = await response.json();

        if (!data.data) {
            alert('You need to subscribe first :))');
            window.location = '/subscriptions';
        } else {
            return true
        }
    }

    const userDesignRequestList = async () => {

        let headers = new Headers();
        headers.append("Authorization", "Bearer " + getItem("token"));

        var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
        };

        let response = await fetch(baseUrl + "/api/design/request/list", requestOptions);
        let data = await response.json();

        if (data.isSuccess) {
            data.data.forEach(element => {
                setRequests(current => [...current, element])
            });
            setInitialId(data.data[0].id);
        }
        

    }

    const renderDetailsSideBar = () => {
        return(
            <SeeRequestDetails requestId={initialId} />
        );
    }

    const renderResponseSideBar = () => {
        return(
            <SeeResponse requestId={initialId} />
        );
    }

    const openDetailsSideBar = (id) => {
        document.querySelector('.request-detail.sidebar-container').classList.add('active');
        document.querySelector('.request-detail.sidebar-container').setAttribute('data-request-id', id);
        document.querySelector('.click-capture').classList.add('click-capture-event');
    }

    const tableUserButton = (id, status) => {
        if (user.userType == 3) {
            return(
                <td className="design-request-list-item table-button" onClick={() => openDetailsSideBar(id)}>
                    <button type="button"  className=""> <Icons icon="eye" /> </button>
                </td>
            );
        } else if(user.userType == 2) {
            return(
                <td className="design-request-list-item table-button">
                    <button type="button" className="">{ status === 2 ? <Icons icon="pen" /> : status === 3 ? <Icons icon="check" /> : "Cancelled"}</button>
                </td>
            );
        }
        
    }

    useEffect(() => {
        if (user.userType === 3) {
            hasSubscription();
        }
        userDesignRequestList();
    }, []);

    return (
        <>
        <div className="designs-container row">
            <div className="columns small-12">
                <table className="designs-table">
                    <thead className="designs-table-header">
                        <tr className="table-navigation-list">
                            <th className="table-navigation-item">Content</th>
                            <th className="table-navigation-item">Status</th>
                            <th className="table-navigation-item">Design Type</th>
                            <th className="table-navigation-item">Request Date</th>
                            <th className="table-navigation-item">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, index) => {
                            return(
                                <tr className="table-navigation-list" key={index}>
                                    <td className="design-request-list-item">
                                        {request.requestMessage.substring(0, 30) + (request.requestMessage.length <= 30 ? '' : '...')}
                                    </td>
                                    <td className="design-request-list-item">
                                        {request.designStatusName}
                                    </td>
                                    <td className="design-request-list-item">
                                        {request.designTypeName}
                                    </td>
                                    <td className="design-request-list-item">
                                        {request.fileName}
                                    </td>
                                    <td className="design-request-list-item">
                                        {index + 1}
                                    </td>
                                    {tableUserButton(request.id, request.designStatusId)}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {renderDetailsSideBar()}
            {renderResponseSideBar()}
        </div>
        </>
    );
}


export default Designs;