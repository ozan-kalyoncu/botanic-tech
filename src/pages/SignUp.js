import React from "react";
import Forms from "../components/shared/Forms";
import '../assets/css/login.css';
import { useState, useEffect } from 'react';

function SignUp(params) {

    

    const setEventListeners = () => { 

        let inputs = document.querySelectorAll('.sign-up.login-container input:not(input[name="submit"])');
        
        inputs.forEach((input) => {
            input.addEventListener( "input" ,(e) => {

                if (e.target.value == null || /^\s*$/.test(e.target.value) ) {
                    input.setAttribute('value', '');
                } else {
                    input.setAttribute('value', e.target.value);
                }
                
            })
        });
    }

    const getData = (e) => {
        e.preventDefault();
        let inputs = document.querySelectorAll('.sign-up.login-container input:not(input[name="submit"])');

        var headers = new Headers();
    
        headers.append("Content-Type", "application/json");

        let body = {}

        inputs.forEach((input) => {
            body[input.name] = input.value;
        })

        body = JSON.stringify(body);

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: body,
            redirect: 'follow'
        };
          
        fetch("https://mis-botanic.herokuapp.com/api/user/register", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        setEventListeners();
    })

    return (
        <Forms mode="signup" getData={getData} />
    )
}

export default SignUp;