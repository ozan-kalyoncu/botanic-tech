
import "../assets/css/designs.css";
import React, { useContext, useEffect, useState } from "react";
import BotanicContext from "../context/BotanicContext";
import { useLocalStorage } from "../context/useLocalStorage";
import SeeRequestDetails from "../components/shared/SeeRequestDetails";
import SeeResponse from "../components/shared/SeeResponse";
import Icons from "../components/shared/Icons";
import MakeResponse from "../components/shared/MakeResponse";

function Designs() {

    const [paginateNumber, setPaginateNumber] = useState(1);

    const [designStatuses, setDesignStatuses] = useState([]);

    const [statusFilter, setstatusFilter] = useState("0");

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

        var filter = "&designStatusId=";

        if (statusFilter != 0) {
            filter += statusFilter; 
        }
        
        console.log(filter);

        let response = await fetch(baseUrl + "/api/design/request/list?page=" + paginateNumber + (statusFilter != 0 ? filter : ""), requestOptions);
        let data = await response.json();

        if (data.isSuccess) {
            data.data.forEach(element => {
                setRequests(current => [...current, element])
            });
            setInitialId(data.data[0].id);
        }
    }

    const getDesignStatuses = async () => {
        
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + getItem("token"));

        var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
        };

        let response = await fetch(baseUrl + "/api/constant/enum/designstatuses" , requestOptions);
        let data = await response.json();

        if (data.isSuccess) {
            setDesignStatuses(data.data);
        }
        
    }

    const setStatusFilter = (e) => {
        setstatusFilter(e.target.value);
    }

    const renderDetailsSideBar = () => {
        return(
            <SeeRequestDetails requestId={initialId} />
        );
    }

    const renderMakeResponseSideBar = () => {
        return(
            <MakeResponse requestId={initialId} />
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

    const openMakeResponseSideBar = (id) => {
        document.querySelector('.make-response.sidebar-container').classList.add('active');
        document.querySelector('.make-response.sidebar-container').setAttribute('data-response-id', id);

        document.querySelector('.request-detail.sidebar-container').style.opacity = "0";
        document.querySelector('.request-detail.sidebar-container').classList.add('reversed');
        setTimeout(() => {
            document.querySelector('.request-detail.sidebar-container').style.opacity = "1";
            document.querySelector('.request-detail.sidebar-container').classList.add('active');
        }, 500);
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
                <td className="design-request-list-item table-button" onClick={() => openMakeResponseSideBar(id)}>
                    <button type="button" className="">{ status === 2 ? <Icons icon="pen" /> : status === 3 ? <Icons icon="check" /> : "Cancelled"}</button>
                </td>
            );
        }
        
    }

    const renderTableBody = () => {
        return(
            <tbody>
                {requests.map((request, index) => {
                    return(
                        <tr className="table-navigation-list" key={index}>
                            <td className="design-request-list-item">
                                {index + 1}
                            </td>
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
                            {tableUserButton(request.id, request.designStatusId)}
                        </tr>
                    );
                })}
            </tbody>
        );
    }

    const parseTableBody = () => {
        
        var tableBody = renderTableBody();

        var table =  document.querySelector("table.designs-table"),
            body = table.querySelector("tbody");
        
        table.removeChild(body);
        table.appendChild(tableBody);
    }

    useEffect(() => {
        if (user.userType === 3) {
            hasSubscription();
        }
        userDesignRequestList();
        getDesignStatuses();
    }, []);

    useEffect(() => {
        userDesignRequestList();
    }, [statusFilter]);

    useEffect(() => {
        parseTableBody();
    }, [requests]);

    return (
        <>
        <div className="designs-container row">
            <div className="columns small-12">
                <div className="status-filter">
                    <div className="filter--title">
                        Filter:
                    </div>
                    <select name="statusPicker" onChange={(e) => setStatusFilter(e)}>
                        <option value="0" key="0">All</option>
                        {designStatuses.map((status, index) => {
                            return(
                                <option value={status.value} key={index + 1}>{status.key}</option>
                            );
                        })}
                    </select>
                </div>
                <table className="designs-table">
                    <thead className="designs-table-header">
                        <tr className="table-navigation-list">
                            <th className="table-navigation-item"></th>
                            <th className="table-navigation-item">Content</th>
                            <th className="table-navigation-item">Status</th>
                            <th className="table-navigation-item">Design Type</th>
                            <th className="table-navigation-item">Request Date</th>
                            <th className="table-navigation-item">Details</th>
                        </tr>
                    </thead>
                    {renderTableBody()}
                </table>
                <div className="paginate-links">
                    <ul className="paginate-list">
                        
                    </ul>
                </div>
            </div>
            {renderDetailsSideBar()}
            {renderResponseSideBar()}
            {renderMakeResponseSideBar()}
        </div>
        </>
    );
}


export default Designs;