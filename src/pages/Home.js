import React, { useContext } from 'react'
import ColumnImg1 from "../assets/img/column-img-1.png";
import ColumnImg2 from "../assets/img/column-img-2.png";
import "../assets/css/home.css";
import {Link} from "react-router-dom";
import BotanicContext from '../context/BotanicContext';

function Home() {

    const {plantCollectionDesc, itemCollectionDesc} = useContext(BotanicContext);

    return (
        <>
        <div className='row double-column-section'>
            <div className='columns small-12'>
                <div className='section-header columns'>
                    <h1>Explore Our Unique Collections</h1>
                </div>
                <div className='double-column--container'>
                    <div className='column-side columns small-12 medium-6'>
                        <div className='background-image'>
                            <div className='image-overlay'></div>
                            <img src={ColumnImg1} alt="" />
                        </div>
                        <div className='column-content'>
                            <h2 className="content-title">Decoration Items</h2>
                            <p className="content-short-description">{itemCollectionDesc.substring(0, 100) + "..."}</p>
                            <Link className='button content-button' to="/collection/decorationitems">Explore</Link>				
                        </div>
                    </div>
                    <div className='column-side columns small-12 medium-6'>
                        <div className='background-image'>
                            <div className='image-overlay'></div>
                            <img src={ColumnImg2} alt="" />
                        </div>
                        <div className='column-content'>
                            <h2 className="content-title">Plants and Trees</h2>
                            <p className="content-short-description">{plantCollectionDesc.substring(0, 100) + "..."}</p>
                            <Link className='button content-button' to="/collection/plants">Explore</Link>				
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='background-video-section'>
            <div className='background-video--inner'>
                <iframe id="bg-video" src="https://www.youtube.com/embed/AGcTCvn-a6g?autoplay=1&mute=1&showinfo=0&controls=0&loop=1&modestbranding=1&iv_load_policy=3&playsinline=1&disablekb=1&playlist=AGcTCvn-a6g&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </div>
        <div className='contact-section row'>
            <div className='columns small-12'>
                <div className='section-header columns'>
                    <h1>Contact Us</h1>
                    <p className='description'>
                    For your questions and comments, you can contact us on our whatsapp line or send an e-mail.
                    </p>
                </div>
                <div className='double-column--container'>
                    <div className='column-side columns small-12 medium-6'>
                        <div className='column-content'>
                            <h2>Furkan Bozkurt</h2>
                            <p className='description'>
                                <span>Whatsapp: wa.me/+905319521312</span>
                                <span>Email: furkan.bzkurt2@gmail.com</span>
                            </p>
                        </div>
                    </div>
                    <div className='column-side columns small-12 medium-6'>
                        <div className='column-content'>
                            <h2>Egemen Cikler</h2>
                            <p className='description'>
                                <span>Whatsapp: wa.me/+905319521312</span>
                                <span>Email: egemen.cikler@hotmail.com</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='column-bottom'>
                    <p>Botanic Support: botanictech@hotmail.com</p>
                    <p>Botanic Whatsapp: wa.me/+905319521312</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;
