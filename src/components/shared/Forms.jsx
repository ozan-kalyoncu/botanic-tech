import { Link } from 'react-router-dom';
import React from "react";

function Forms({mode, getData}) {

    const signupBlock = (mode) => {
        if (mode === 'signup') {
            return (
            <div className="signup-link">
                <span>Don't you have an account?&nbsp;</span>
                <Link to='/pages/signup' className="create-account-link">
                    You can create one from here
                 </Link>
            </div> 
            )
        } else if (mode === 'login') {
            return (
                <div className="signup-link">
                    <span>Do you have an account?&nbsp;</span>
                    <Link to='/pages/login' className="create-account-link">
                        You can login from here
                    </Link>
                </div>
            )
            
        } else {
            return (
                <div>
                    Invalid Mode
                </div>
            )
        }
        
    }

    return mode === 'login' ? (
        <div className="login-container row">
            <div className="login-form-wrapper columns small-12">
                <form className="login-form columns">
                    <h2 className="login-title">Log in</h2>
                    <p className="login-description">Do you have an account with us? Pleae log in </p>
                    <div className="login-form--inputs">
                        <input type="text" name="email" id="email-input" placeholder="Email Address" />
                        <input type="password" name="password" id="password-input" placeholder="Password" />
                        <div className='submit-button'>
                            <input onClick={getData ? getData : null} type='submit' name='submit' value="Log in" />
                        </div>
                    </div>
                    {signupBlock('signup')}
                </form>
                
            </div>
        </div>
    ) : (
        <div className="login-container sign-up row">
            <div className="login-form-wrapper columns small-12">
                <form className="login-form columns">
                    <h2 className="login-title">Register Now</h2>
                    <p className="login-description">If you don't have an account with us, please sign up</p>
                    <div className="login-form--inputs">
                        <div className="signup-extra-inputs">
                            <input type="text" name="firstName"  placeholder='First Name'/>
                            <input type="text" name="lastName" placeholder='Last Name' />
                        </div>
                        <input type="text" name="email" id="email-input" placeholder="Email Address" />
                        <input type="password" name="password" id="password-input" placeholder="Password" />
                        <div className='submit-button'>
                            <input onClick={getData} type='submit' name='submit' value="Register" />
                        </div>
                    </div>
                    {signupBlock('login')}
                </form>
                
            </div>
        </div>
    );
}

export default Forms;