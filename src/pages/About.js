import React from 'react'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../assets/css/about.css";

function About() {
    return (
        <div className='about-page--container row'>
            <div className='about-content columns small-12'>
            <p>Botanictech is a website that provides online landscape services designed by Furkan Bozkurt and Egemen Çikler as a school project. Egemen Çikler and Furkan Bozkurt, 4th grade students of Management Information Systems at Bilgi University, started this adventure with the MIS 497 course they took in the fall semester of 2022, and implemented the "Botanictech" project they designed with the MIS 498 course in the spring semester of 2023. The main purpose of the site is to provide people with an accelerated, useful online experience in the landscape. With this site, our customers will be able to subscribe to our site with monthly and annual subscription options, and benefit from our services such as online landscape drawing and climate-appropriate plant suggestions. </p>

            <strong>What is Landscape Online Drawing? </strong>
            <p>-Online landscape drawing is a service where our subscribers can design these areas in 2D and 3D by adding the plants and decoration products they want to the landscape architects within our organization, provided that they enter the photograph and measurement units of the landscape areas they want to be designed. </p>

            <strong>What Is the Climate Appropriate Plant Recommendations?</strong>
            <p>-Climate-appropriate plant suggestions are a service where our subscribers can observe the harmony of the regions they live or are curious about with plants. With this service, our subscribers will be able to access information about which of the 7 regions of Turkey is more suitable for which plants, and in this way, they will be able to get suitable plants or plants for their gardens.</p>
            </div>
        </div>
    )
}

export default About;
