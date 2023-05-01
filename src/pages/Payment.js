import '../assets/css/payment.css';
import React, { useState } from "react";
import Icons from '../components/shared/Icons';
import { Link } from 'react-router-dom';

function Payment(params) {

    const months = ["January", "Feburary", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"];

    const currentDate = new Date()

    const [penaltyDate, setpenaltyDate] = useState({
        'year': currentDate.getFullYear(),
        'month': currentDate.getMonth()
    });
    
    const createExpireYears = () => {
        

        let expireYearGap = 20;

        let years = [];

        for (let i = 0; i <= 10; i++) {
            years.push(penaltyDate.year + i)
        }

        return years;
    }


    return (
        <div className="payment-page-container row">
            <div className="payments-container--info columns small-7">
                <div className="payment-site--title">
                    <h2>Botanic Tech</h2>
                </div>
                <div className="payment-navigation">
                    <ul className="navigation-list">
                        <li className="payment-navigation--item initial--item">
                            <span>Cart</span>
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
                                        <span>string123@string.com</span>
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
                                            <input id="ccn" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="16" placeholder="xxxx xxxx xxxx xxxx" />
                                        </div>
                                        <div className='form-tab'>
                                            <div className="title-holder">
                                                <p className='form-title'>Expire Date:</p>
                                            </div>
                                            <div className='form--select'>
                                                <select name='expireMM' id='expireMM'>
                                                    <option value=''>Month</option>
                                                    {months.map((m, i) => {
                                                        return (
                                                        <option value={i+1}>{m}</option>
                                                        );  
                                                    })}
                                                </select> 
                                                <select name='expireYY' id='expireYY'>
                                                    <option value=''>Year</option>
                                                    {createExpireYears().map((year, i) => {
                                                        return (
                                                            <option value={year}>{year}</option>
                                                        );
                                                    })}
                                                </select>
                                            </div> 
                                            <input class="inputCard" type="hidden" name="expiry" id="expiry" maxlength="4"/>
                                        </div>
                                        <div className='form-tab'>
                                            <div className="title-holder">
                                                <p className='form-title'>CVC:</p>
                                            </div>
                                            <input class="cc-cvc" maxlength="3" name="credit-cvc" pattern="\d*" placeholder="CVC" type="tel" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="payment-body--buttons">
                            <button type="button" name="return-to-cart" className="return-to-cart">
                                {<Icons icon="chevronleft" link="" />}
                                <Link to='/'>Return to cart</Link>
                            </button>
                            <button type="button" name="pay" className="button">Pay Now</button>
                        </div>
                    </div>             
                </div>
            </div>
        </div>
    );
}

export default Payment;