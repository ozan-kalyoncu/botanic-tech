
import "../assets/css/designs.css";
import React, { useContext, useEffect, useState } from "react";
import BotanicContext from "../context/BotanicContext";
import { useLocalStorage } from "../context/useLocalStorage";

function Designs() {

    const [requests, setRequests] = useState([]);

    const { baseUrl, user } = useContext(BotanicContext);

    const { getItem } = useLocalStorage();

    const hasSubscription = async () => {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + getItem("token"));

        let body = ""

        var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
        };

        let response = await fetch(baseUrl + "/api/subscription/hassubscription", requestOptions);
        let data = await response.json()

        if (!data.data) {
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
        let data = await response.json()

        data.data.forEach(element => {
            setRequests(current => [...current, element])
        });
        console.log(data.data);

    }

    const tableUserButton = () => {
        console.log(user);
        if (user.userType == 3) {
            return(
                <td className="design-request-list-item table-button">
                    <button type="button" className="">See request details</button>
                </td>
            );
        } else if(user.userType == 2) {
            return(
                <td className="design-request-list-item table-button">
                    <button type="button" className="">Make a response</button>
                </td>
            );
        }
        
    }

    useEffect(() => {
        hasSubscription();
        userDesignRequestList();
    }, []);


    return (
        <div className="designs-container row">
            <div className="columns small-12">
                <table className="designs-table">
                    <thead className="designs-table-header">
                        <tr className="table-navigation-list">
                            <th className="table-navigation-item">Content</th>
                            <th className="table-navigation-item">Status</th>
                            <th className="table-navigation-item">Design Type</th>
                            <th className="table-navigation-item">Request Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => {
                            return(
                                <tr className="table-navigation-list">
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
                                    {tableUserButton()}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}


export default Designs;