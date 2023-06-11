import { InView } from 'react-intersection-observer';
import FullMenu from "../shared/Menu";
import { Link } from 'react-router-dom';

function Header({userCheck, openMakeRequestSideBar}) {

    const toggleMenu = (e) => {
        const mobileMenu = document.querySelector('.ko-full-menu--mobile');
        const capture = document.querySelector('.click-capture');
        
        mobileMenu.classList.toggle('active');
        capture.classList.toggle('click-capture-event');
    }    

    const onscroll = (view) => {
        const mainHeader = document.querySelector('header.header-main');
        
        if (!view) {
            if (!mainHeader.classList.contains('is-sticky')) {
                mainHeader.classList.add('is-sticky')
            }
        } else {
            if (!mainHeader.querySelector('.ko-full-menu--mobile.menu-active')) {
                mainHeader.classList.remove('is-sticky')
            }
            
        }
    }
    return (
        <>
        <InView className="sticky--header" as="div" onChange={(inView, entry) => onscroll(inView)}>
            
        </InView>
        <header className="header-main">
                <div className="row expended">
                    <div className="columns small-12">
                        <div className='header-row'>
                            <div className="logo-holder columns small-6 medium-6 large-2">
                                <h2 className="logo--text">
                                    <Link to="/">
                                    Botanic Tech
                                    </Link>
                                </h2>
                            </div>
                            <FullMenu mode="desktop" userCheck={userCheck} openMakeRequestSidebar={openMakeRequestSideBar} />
                            <div className="ko-mobile-menu columns small-6 medium-6 large-9">
                                <div className="toggle-wrapper">
                                    <div onClick={(e) => toggleMenu(e)} className="mobile-menu-toggle">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </header>
        </>
    )
}


export default Header;