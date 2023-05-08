import '../assets/css/login.css';
import React, { useContext } from "react";
import Forms from '../components/shared/Forms';

import { useState, useEffect } from 'react';
import { useLocalStorage } from '../context/useLocalStorage';
import BotanicContext from '../context/BotanicContext';


function LogIn() {

    const [inputs, setInputs] = useState(Array.from(document.querySelectorAll('.login-container input:not(input[name="submit"])')));

    const { setItem } = useLocalStorage();

    const { baseUrl } = useContext(BotanicContext);

    const setEventListeners = () => {

        let i = Array.from(document.querySelectorAll('.login-container input:not(input[name="submit"])'));

        setInputs(i);

        i.map(input => {
            
            input.addEventListener( "input" ,(e) => {

                if (e.target.value == null || /^\s*$/.test(e.target.value) ) {
                    input.setAttribute('value', '');
                } else {
                    input.setAttribute('value', e.target.value);
                }
                
            })
        });        

    }

    const userLogin = async (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let body = {}

        inputs.map(input => {
            body[input.name] = input.value;
        })

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: 'follow'
        };

        let response = await fetch( baseUrl + "/api/user/login", requestOptions);
        let data = await response.json()

        if (await data.isSuccess) {
            setItem("token", data.data.token);
            setItem("userType", data.data.userTypeId);
            setItem("firstName", data.data.firstName);
            setItem("lastName", data.data.lastName);
            setItem("email", data.data.email);

            window.location.href = '/';
        }

    }

    useEffect(() => {
        setEventListeners();
    }, []);

    useEffect(() => {
        console.log(inputs);
    }, [inputs])
    
    return (
        <>
        <Forms mode="login" userLogin={userLogin} />
        </>
    )
}


export default LogIn;