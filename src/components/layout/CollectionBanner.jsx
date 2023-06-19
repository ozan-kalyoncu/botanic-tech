

import React from "react";

function CollectionBanner({bannerSrc, description}) {
    return (
        <div className='ko-collection-banner'>
            <div className="collection-banner">
                <div className="collection-banner--image">
                    <div className="image-overlay"></div>
                    <img width="" height="" src={bannerSrc} alt=""/>
                </div>
                <div className="collection-banner--content small-12 columns" >
                    <h2 className="collection-banner--title">All Products and Reference Plants</h2>
                        <div className="collection-banner--description">
                            <p>{description}</p>
                        </div>
                </div>
            </div>
        </div>
    );
}


export default CollectionBanner;