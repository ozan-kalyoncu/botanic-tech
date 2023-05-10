
import React, { useEffect, useState, useContext } from "react";
import "../assets/css/subscriptions.css";
import "../assets/css/payment.css";
import Payment from "./Payment";
import pic from "../assets/img/background-2.png";
import BotanicContext from "../context/BotanicContext";


function SubscriptionPlans(params) {

    const [plans, setPlans] = useState([]);

    const { baseUrl, user } = useContext(BotanicContext);

    const getSubscriptionPlans = async () => {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");


        var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
        };

        let response = await fetch( baseUrl + "/api/subscription/plans", requestOptions)
        let data = await response.json();

        let subscriptions = await data.data;


        Object.values(subscriptions).forEach((value, index) => {
            setPlans(current => [...current, value]);
        });
                
    }

    const openSidePayments = (e) => {
        e.preventDefault();
        let sideBarPayment = document.querySelector('.payments.sidebar-container');
        sideBarPayment.classList.add('active');
        sideBarPayment.setAttribute("data-subscription-id", e.target.dataset.subscriptionId);

        document.querySelector('.click-capture').classList.add('click-capture-event');
    }

    useEffect(() => {
        getSubscriptionPlans();
    }, []);



    return (
    <>
      <div className="subscription-models row">
        <div className="subscription--title">
            <h2>Subscription Now And Make <br/>A Design Request! </h2>
        </div>
        <div className="models columns small-12">
            {plans.map(plan => {
                return (
                    <div className={"model--item columns small-12 medium-12 large-6  " + plan.subscriptionTypeName.toLowerCase()} key={plan.id}>
                        <div className="model--item-wrapper">
                            <div className="model--title">
                                <p>{plan.subscriptionTypeName}</p>
                                <span>Find design that is special for you</span>
                            </div>
                            <div className="model--price">
                                <span className="price">{plan.amount}£</span>
                                <span className="model-name-sub">/ {plan.subscriptionTypeName}</span>
                            </div>
                            <div className="model--button">
                                <button onClick={(e) => openSidePayments(e)} type="button" name="subscribe" data-subscription-id={plan.subscriptionTypeId} className="button">Subscripe Now</button>
                            </div>
                            <div className="tax-included">Taxes are included.</div>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className="background-img overlay">
            <img src={pic} alt="" />
        </div>
      </div>
      <Payment />  
    </> 
    );
}


export default SubscriptionPlans;