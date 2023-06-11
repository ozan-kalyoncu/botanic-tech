import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import Icons from '../shared/Icons';
import { useContext } from "react";
import BotanicContext from "../../context/BotanicContext";
import { useLocalStorage } from "../../context/useLocalStorage";

function FullMenu({mode, userCheck, openMakeRequestSidebar}) {

    const { user } = useContext(BotanicContext);
    const { removeAll } = useLocalStorage();

    const closeMenu = () => {
        const mobileMenu = document.querySelector('.ko-full-menu--mobile');
        const capture = document.querySelector('.click-capture');
        mobileMenu.classList.remove('active');
        capture.classList.remove('click-capture-event');
    } 
    
    const logout = (e) => {
        e.preventDefault();
        removeAll();
        
        window.location.href = '/';
    }

    const setEventListeners = () => {
        var navigationItems = document.querySelectorAll(".user-navigation-list .user-navigation--item");
        var menuItems = document.querySelectorAll(".ko-full-menu--mobile .menu-item");
        if (navigationItems) {
            navigationItems.forEach(element => {
                element.addEventListener("click", () => {
                    closeMenu();
                })
            });
        }

        menuItems.forEach(el => {
            el.addEventListener("click", () => {
                closeMenu();
            })
        });
    }

    const loadMainMenu = () => {
        return(
            <ul className="full-menu-list">
                <li className="menu-item">
                    <Link className="menu-item-link" to="/">Home</Link>                            
                </li>
                <li className="menu-item">
                    <Link className="menu-item-link" to="/pages/about">About Us</Link>
                </li>
                <li className="menu-item">
                    <Link className="menu-item-link" to="/collection/plants">Plants</Link>
                </li>
                <li className="menu-item">
                    <Link className="menu-item-link" to="/collection/decorationitems">Decoration</Link>
                </li>
                <li className="menu-item">
                    <Link className="menu-item-link" to="/subscriptions">Subscription Plans</Link>
                </li>
            </ul>
        );
    }

    useEffect(() => {
        setEventListeners();
    }, []);

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
                    <div className="user-navigation">
                        <ul className="user-navigation-list">
                            {user.userType == 3 ? (
                                <li className="user-navigation--item menu-item">
                                    <button onClick={openMakeRequestSidebar}>Make design request</button>
                                </li>
                            ): (
                                ""
                            )}
                            <li className="user-navigation--item menu-item">
                                <Link to='/pages/designs'>
                                {
                                    user.userType == 3 ? (
                                       "My Requests"
                                    ) : (
                                       "See Requests"
                                    )
                                }
                                </Link>
                            </li>
                            <li className="user-navigation--item">
                                <button onClick={logout} className="logout-button">Log out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="ko-icon-holder not-user">
                    <Icons icon="user" link="/pages/login" />
                </div>
            );
        }
    }

    const mobileUserForm = () => {
        if (userCheck) {
            return(
                <div className="mobile-user-button">
                    <div className="user-info">
                        <span>{ user.firstName }</span>
                        <span>{ " " + user.lastName }</span>
                        <div className="ko-icon-holder">
                            <Icons icon="user" />
                        </div>
                    </div>
                    <div className="user-navigation">
                        <ul className="user-navigation-list full-menu-list">
                            {user.userType == 3 ? (
                                <li className="user-navigation--item menu-item">
                                    <button onClick={openMakeRequestSidebar}>Make design request</button>
                                </li>
                            ): (
                                ""
                            )}
                            <li className="user-navigation--item menu-item">
                                <Link to='/pages/designs'>
                                {
                                    user.userType == 3 ? (
                                        'My Requests'
                                    ) : (
                                        'See Requests'
                                    )
                                }
                                </Link>
                            </li>
                            <li className="user-navigation--item menu-item">
                                <button onClick={logout} className="logout-button">Log out</button>
                            </li>
                        </ul>
                    </div>
                </div> 
            );
        } else {
            return(
                <div className="mobile-icon-wrapper menu-item">
                    <div className="ko-icon-holder">
                        <Link to="/pages/login">
                            <span>Log in</span>
                            <Icons icon="user" link="/pages/login" />
                        </Link>
                    </div>
                </div>
            );
        }
          
    }

    return mode === 'desktop' ? (
        <>
            <div className={"ko-full-menu--" + mode + " ko-full-menu" + " columns small-9 large-8"}>
                {loadMainMenu()}
            </div>
            <div className="ko-header-secondary-area large-2">
                {profileForm()}
            </div>
        </>
    ) : (
        <>
            <div className={"ko-full-menu--" + mode + " ko-full-menu" + " sidebar-container"}>
                <div className="ko-mobile-menu--header">
                    <div className="mobile-menu-toggle">
                        <div className="toggle-wrapper">
                            <div onClick={() => closeMenu()} className="mobile-menu-toggle cross">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
                {loadMainMenu()}
                {mobileUserForm()}
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