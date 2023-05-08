

import React, { useContext, useEffect, useState } from "react";
import BotanicContext from "../context/BotanicContext";
import { useLocalStorage } from "../context/useLocalStorage";

function Designs() {

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

        let body = ""

        var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
        };

        let response = await fetch(baseUrl + "/api/design/request/list", requestOptions);
        let data = await response.json()

        console.log(data)
    }

    useEffect(() => {
        hasSubscription();
        userDesignRequestList();
    }, []);

    return (
        <div className="designs-container">
            
        </div>
    );
}


export default Designs;