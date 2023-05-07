import React from "react";
import { FaRegUser, FaAngleDown } from "react-icons/fa";
import {Link} from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

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
            <div>
                <FaAngleDown />
            </div>
        )
    };
    
}

export default Icons;