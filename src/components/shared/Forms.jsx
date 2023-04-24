import { Link } from 'react-router-dom';
import React from "react";

function Forms({mode}) {
    return mode === 'login' ? (
        <div className="login-container row">
            <div className="login-form-wrapper columns small-12">
                <form className="login-form columns">
                    <h2 className="login-title">Giriş Yap</h2>
                    <p className="login-description">Bizimle bir hesabınız mı var? Hemen Giriş Yapın</p>
                    <div className="login-form--inputs">
                        <input type="text" name="login-email" id="email-input" placeholder="Email Address" />
                        <input type="password" name="login-password" id="password-input" placeholder="Password" />
                        <div className='submit-button'>
                            <input type='submit' name='submit' value="Giriş Yap" />
                        </div>
                    </div>
                </form>
                <div className="signup-link">
                    <span>Hesabınız mı yok?&nbsp;</span>
                    <Link to='/signup' className="create-account-link">
                        Hemen hesap oluşturun
                    </Link>
                </div>
            </div>
        </div>
    ) : (
        <div className="login-container sign-up row">
            <div className="login-form-wrapper columns small-12">
                <form className="login-form columns">
                    <h2 className="login-title">Kayıt Ol</h2>
                    <p className="login-description">Bizimle bir hesabınız mı yok mu? Hemen Kayıt Olun</p>
                    <div className="login-form--inputs">
                        <div className="signup-extra-inputs">
                            <input type="text" name="signup-name" value="" placeholder='First Name'/>
                            <input type="text" name="signup-lastname" value="" placeholder='Last Name' />
                        </div>
                        <input type="text" name="login-email" id="email-input" placeholder="Email Address" />
                        <input type="password" name="login-password" id="password-input" placeholder="Password" />
                        <div className='submit-button'>
                            <input type='submit' name='submit' value="Kayıt Ol" />
                        </div>
                    </div>
                </form>
                <div className="signup-link">
                    <span>Hesabınız var mı?&nbsp;</span>
                    <Link to='/login' className="create-account-link">
                        Hemen hesapınıza giriş yapın
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Forms;