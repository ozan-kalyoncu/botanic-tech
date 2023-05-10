import '../assets/css/payment.css';
import React, { useContext, useEffect, useState } from "react";
import Icons from '../components/shared/Icons';
import BotanicContext from '../context/BotanicContext';
import { useLocalStorage } from '../context/useLocalStorage';

function Payment(params) {

    const months = ["January", "Feburary", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"];

    const currentDate = new Date()

    const { baseUrl, user } = useContext(BotanicContext)

    const { getItem } = useLocalStorage();

    const [penaltyDate, setpenaltyDate] = useState({
        'year': currentDate.getFullYear(),
        'month': currentDate.getMonth()
    });

    const closeSideBarPayments = () => {
        document.querySelector(".payments.sidebar-container").classList.remove("active");
        document.querySelector('.click-capture').classList.remove('click-capture-event');
    }
    
    const createExpireYears = () => {
        
        let expireYearGap = 10;

        let expireYear = penaltyDate.year + expireYearGap;

        let years = [];

        for (let i = penaltyDate.year; i <= expireYear; i++) {
            years.push(i)
        }

        return years;
    }

    const setEventListeners = () => {
        var sideBarPayment = document.querySelector(".payments.sidebar-container"),
            cardNumberInput = sideBarPayment.querySelector("input#ccn"),
            cardCvvInput = sideBarPayment.querySelector("input#cardccv2");

        cardNumberInput.addEventListener("input", (e) => {
            cardNumberInput.setAttribute("value", e.target.value); 
        });
        
        cardCvvInput.addEventListener("input", (e) => {
            cardCvvInput.setAttribute("value", e.target.value);
        });
    }

    const selectEvent = (e) => {
        e.target.setAttribute("value", e.target.value);
    }

    const userPay = async () => {

        var headers = new Headers();

        var sideBarPayment = document.querySelector(".payments.sidebar-container"),
            cardNumber = sideBarPayment.querySelector("input#ccn").value,
            cardExpireDate = sideBarPayment.querySelector(".form--select select#expireMM").value + sideBarPayment.querySelector(".form--select select#expireYY").value,
            cardccv2 = sideBarPayment.querySelector("input#cardccv2").value
        
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + getItem("token"));

        let body = JSON.stringify({
            "cardNumber": cardNumber,
            "cardExpireDate": cardExpireDate,
            "cardCvv2": cardccv2,
            "subscriptionPlanId": Number(sideBarPayment.getAttribute("data-subscription-id"))
        });

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: body,
            redirect: 'follow'
        };

        let response = await fetch( baseUrl + "/api/subscription/pay", requestOptions);
        let data = await response.json();

        console.log(data);
        if (data.isSuccess) {
            alert(data.Message);
            window.location = '/pages/designs';
        } else {
            sideBarPayment.classList.add('payment-failed');
            alert(data.Message);
        }
    }

    useEffect(() => {
        setEventListeners();
    }, []);


    return (
        <div className="payments sidebar-container">
            <div className="sidebar--info">
                <div className="sidebar--title">
                    <h2>Botanic Tech</h2>
                </div>
                <div className='sidebar--body'>
                    <div className="payment-navigation">
                        <ul className="navigation-list">
                            <li className="payment-navigation--item initial--item">
                                <span>Subscription Plans</span>
                            </li>
                            <li className="nav-separator">
                                <span> &gt; </span>
                            </li>
                            <li className="payment-navigation--item">
                                <span>Payment</span>
                            </li>
                        </ul>
                    </div>
                    <div className="payment-body">
                        <div className="payment-information--body">
                            <div className="payment-body--content">
                                <div className="content-wrapper">
                                    <div className="contact">
                                        <p className="form-title">Contact</p>
                                        <div className="user-info--container">
                                            <span>{ user.email }</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="credit-cart-services">
                                    <p className="payment-title">Payment</p>
                                    <span className='transaction-secure--text'>All transactions are secure and encrypted.</span>
                                    <div className="content-wrapper">
                                        <div className="credit-cart-form">
                                            <div className='form-tab'>
                                                <div className="title-holder">
                                                    <p className='form-title'>Credit Cart Number:</p>
                                                </div>
                                                <input id="ccn" type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}" autoComplete="cc-number" maxLength="16" placeholder="xxxx xxxx xxxx xxxx" />
                                            </div>
                                            <div className='form-tab'>
                                                <div className="title-holder">
                                                    <p className='form-title'>Expire Date:</p>
                                                </div>
                                                <div className='form--select'>
                                                    <select onChange={(e) => selectEvent(e)} name='cardExpireDate' id='expireMM'>
                                                        <option value=''>Month</option>
                                                        {months.map((m, i) => {
                                                            let current = i+1;
                                                            let value = ""
                                                            if (current < 10) {
                                                                value = '0' + current;
                                                            } else {
                                                                value = current;
                                                            }
                                                            return (
                                                            <option value={value}>{m}</option>
                                                            ); 
                                                        })}
                                                    </select> 
                                                    <select onChange={(e) => selectEvent(e)} name='cardExpireDate' id='expireYY'>
                                                        <option value=''>Year</option>
                                                        {createExpireYears().map((year, i) => {
                                                            return (
                                                                <option value={year % 1000}>{year}</option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>    
                                            </div>
                                            <div className='form-tab'>
                                                <div className="title-holder">
                                                    <p className='form-title'>CVC:</p>
                                                </div>
                                                <input id="cardccv2" className="cc-cvc" maxLength="3" name="cardccv2" pattern="\d*" placeholder="CVC" type="tel" />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>             
                    </div>
                </div>
                <div className="sidebar-footer">
                    <button onClick={() => closeSideBarPayments()} type="button" name="return-to-cart" className="return-to-cart">
                        {<Icons icon="chevronleft" link="" />}
                        <p>Return to subscriptions</p>
                    </button>
                    <button onClick={() => userPay()} type="button" name="pay" className="button">
                        <span>Pay Now</span>
                        <div class="loader-4"><span></span></div>
                    </button>
                </div>                
            </div>
        </div>
    );
}

export default Payment;