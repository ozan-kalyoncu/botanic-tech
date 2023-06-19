import React from "react";
import { FaRegUser, FaAngleDown, FaSearch } from "react-icons/fa";
import {Link} from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import { BsPencilSquare, BsSearch } from "react-icons/bs";
import {TbRoadOff} from "react-icons/tb";

function Icons({icon, link}) {

    if (icon === 'user') {
        return link ? (
            <Link className="icon--link icon--login" to={link}>
                <FaRegUser />
            </Link>
        ) : (
            <div className="icon--text icon--login">
                <FaRegUser />
            </div>
        )
    } else if ( icon === 'chevronleft') {
        return (
            <div className="icon--inline icon">
                <FiChevronLeft />
            </div>
        )
    } else if ( icon === 'angledown' ) {
        return (
            <div className="icon--inline icon">
                <FaAngleDown />
            </div>
        )
    } else if ( icon === 'eye' ) {
        return (
            <div className="icon--inline icon">
                <AiOutlineEye />
            </div>
        );
    } else if ( icon === 'check' ) {
        return (
            <div className="icon--inline icon">
                <BsFillClipboard2CheckFill />
            </div>
        );
    } else if ( icon === 'pen' ) {
        return (
            <div className="icon--inline icon">
                <BsPencilSquare />
            </div>
        );
    } else if ( icon == "quickview") {
        return (
            <div className="icon icon--inline">
                <BsSearch />
            </div>
        );
    } else if (icon == "empty-designs") {
        return (
            <div className="icon">
                <TbRoadOff />
            </div>
        )
    }
    
}

export default Icons;