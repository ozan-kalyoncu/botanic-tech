import React from "react";
import { FaRegUser } from "react-icons/fa";
import {Link} from "react-router-dom";

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
    } else return;
    
}

export default Icons;