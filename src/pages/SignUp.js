import React from "react";
import Forms from "../components/shared/Forms";
import '../assets/css/login.css';
import { useState, useEffect } from 'react';

function SignUp(params) {

    const [receiveEmail, setReceiveEmail] = useState(false);

    const setEventListeners = () => { 

        let inputs = document.querySelectorAll('.sign-up.login-container input:not(input[name="submit"])');
        
        inputs.forEach((input) => {
            input.addEventListener( "input" ,(e) => {
                if (e.target.name != "receiveEmailNotifications") {
                    if (e.target.value == null || /^\s*$/.test(e.target.value) ) {
                        input.setAttribute('value', '');
                    } else {
                        input.setAttribute('value', e.target.value);
                    }
                } else {
                    setReceiveEmail(e.target.checked);
                }
            })
        });
    }

    const userRegister = async (e) => {
        e.preventDefault();
        let inputs = document.querySelectorAll('.sign-up.login-container input:not(input[name="submit"])');

        var headers = new Headers();
    
        headers.append("Content-Type", "application/json");

        let body = {}

        inputs.forEach((input) => {
            body[input.name] = input.value;
        })

        body["receiveEmailNotifications"] = receiveEmail;

        body = JSON.stringify(body);

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: body,
            redirect: 'follow'
        };
          
        const response = await fetch("https://mis-botanic.herokuapp.com/api/user/register", requestOptions)
        const data = await response.json()

        if (await data.isSuccess) {
            window.location = '/pages/login';
        } else {
            console.log(data);
        }
        
    }

    useEffect(() => {
        setEventListeners();
    })

    return (
        <Forms mode="signup" userRegister={userRegister} />
    )
}

export default SignUp;