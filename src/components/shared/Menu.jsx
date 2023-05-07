import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import Icons from '../shared/Icons';
import { useContext } from "react";
import BotanicContext from "../../context/BotanicContext";
function FullMenu({mode, userCheck}) {

    const { user } = useContext(BotanicContext);

    const profileForm = () => {
        if (userCheck) {
            return (
                <div className="user-button">
                    <div className="user-info">
                        <span>{ user.firstName }</span>
                        <span>{ " " + user.lastName }</span>
                    </div>
                    <div className="ko-icon-holder">
                        <Icons icon="user" />
                        <Icons icon="angledown" />
                    </div>
                </div>
            );
        } else {
            <div className="ko-icon-holder">
                <Icons icon="user" link="/pages/login" />
            </div>
        }
    }

    return mode === 'desktop' ? (
        <>
            <div className={"ko-full-menu--" + mode + " ko-full-menu" + " columns small-9 large-7"}>
                <ul className="full-menu-list">
                    <li className="menu-item">
                        <Link className="menu-item-link" to="/">Home</Link>                            
                    </li>
                    <li className="menu-item">
                        <Link className="menu-item-link" to="/pages/about">About Us</Link>
                    </li>
                    <li className="menu-item">
                        <Link className="menu-item-link" to="/pages/contact">Contact</Link>
                    </li>
                    <li className="menu-item">
                        <Link className="menu-item-link" to="/subscriptions">Subscription Plans</Link>
                    </li>
                </ul>
            </div>
            <div className="ko-header-secondary-area large-2">
                {profileForm()}
            </div>
        </>
    ) : (
        <>
            <div className={"ko-full-menu--" + mode + " ko-full-menu"}>
                <ul className="full-menu-list">
                    <li className="menu-item">
                        <Link className="menu-item-link" to="/">Home</Link>                            
                    </li>
                    <li className="menu-item">
                        <Link className="menu-item-link" to="/pages/about">About Us</Link>
                    </li>
                    <li className="menu-item">
                        <Link className="menu-item-link" to="/pages/contact">Contact</Link>
                    </li>
                    <li className="menu-item">
                        <Link className="menu-item-link" to="/subscriptions">Subscription Plans</Link>
                    </li>
                </ul>
                <div className="mobile-icon-wrapper">
                    <div className="ko-icon-holder">
                        <span>Log in</span>
                        <Icons icon="user" link="/pages/login" />
                    </div>
                </div>
                
            </div>
        </>
    )
}


FullMenu.defaultProps = {
    mode: 'desktop'
}

FullMenu.propTypes = {
    mode: PropTypes.string
}

export default FullMenu;