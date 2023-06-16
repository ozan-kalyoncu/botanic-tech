
import "../assets/css/designs.css";
import React, { useContext, useEffect, useState } from "react";
import BotanicContext from "../context/BotanicContext";
import { useLocalStorage } from "../context/useLocalStorage";
import SeeRequestDetails from "../components/shared/SeeRequestDetails";
import SeeResponse from "../components/shared/SeeResponse";
import Icons from "../components/shared/Icons";
import MakeResponse from "../components/shared/MakeResponse";
import Moment from "moment";

function Designs() {

    const [paginateNumber, setPaginateNumber] = useState(1);

    const [designStatuses, setDesignStatuses] = useState([]);

    const [requests, setRequests] = useState([]);

    const [statusFilter, setstatusFilter] = useState(0);

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

        var filter = "?designStatusId=";

        if (statusFilter != 0) {
            filter += statusFilter;
        }

        let response = await fetch(baseUrl + "/api/design/request/list" + (statusFilter != 0 ? filter : ""), requestOptions);
        let data = await response.json();

        const tempArr = [];
        if (data.isSuccess) {
            data.data.forEach(element => {
                tempArr.push(element);
            });
            setRequests(tempArr);
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

        document.querySelector('.click-capture').classList.add('click-capture-event');
    }

    const tableUserButton = (id, status) => {
        if (user.userType == 3) {
            return(
                <div className="design-request-list-item table-button" onClick={() => openDetailsSideBar(id)}>
                    <button type="button"  className=""> <Icons icon="eye" /> </button>
                </div>
            );
        } else if(user.userType == 2) {
            return(
                <div className="design-card--item-buttons">
                     <div className="design-request-list-item table-button" onClick={() => openDetailsSideBar(id)}>
                        <button type="button"  className=""> <Icons icon="eye" /> </button>
                    </div>
                    <div className="design-request-list-item table-button" onClick={() => openMakeResponseSideBar(id)}>
                        <button type="button" className="">{ status === 2 ? <Icons icon="pen" /> : status === 3 ? <Icons icon="check" /> : "Cancelled"}</button>
                    </div>
                </div>
            );
        }

    }

    useEffect(() => {
        if (user.userType === 3) {
            hasSubscription();
        }
        Moment.locale("en");
        getDesignStatuses();
    }, []);

    useEffect(() => {
        userDesignRequestList();
    }, [statusFilter]);

    return (
        <div className="designs-container row">
            <div className="columns small-12">
                <div className="status-filter columns">
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
                <div className="designs-table">
                    {requests.map((request, index) => {
                            return(
                                <div className="columns">
                                    <div className="design-item--card" key={index}>
                                        <div className="design-item--card-wrapper">
                                            <div className="design-request-card-item">
                                                <p>{request.requestMessage.substring(0, 30) + (request.requestMessage.length <= 30 ? '' : '...')}</p>
                                                <div className="category-line">
                                                    <div className="line"></div>
                                                </div>
                                                <span className="category">Message</span>    
                                            </div>
                                            <div className="design-request-card-item">
                                                    <p>{request.designStatusName}</p>
                                                    <div className="category-line">
                                                        <div className="line"></div>
                                                    </div>
                                                    <span className="category">Status</span>
                                            </div>
                                            <div className="design-request-card-item">
                                                    <p>{request.designTypeName}</p>
                                                    <div className="category-line">
                                                        <div className="line"></div>
                                                    </div>
                                                    <span className="category">Type</span>
                                            </div>
                                            <div className="design-request-card-item">
                                                    <p>{Moment(request.dateCreated).format("d MMM, Y")}</p>
                                                    <div className="category-line">
                                                        <div className="line"></div>
                                                    </div>
                                                    <span className="category">Date</span>
                                            </div>
                                        </div>
                                        {tableUserButton(request.id, request.designStatusId)}
                                    </div>
                                </div>
                            );
                    })}
                </div>
                <div className="paginate-links">
                    <ul className="paginate-list">

                    </ul>
                </div>
            </div>
            {renderDetailsSideBar()}
            {renderResponseSideBar()}
            {renderMakeResponseSideBar()}
        </div>
    );
}


export default Designs;
