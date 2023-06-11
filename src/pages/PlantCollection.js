import React, { useContext, useEffect, useState } from 'react';
import BotanicContext from '../context/BotanicContext';
import bannerSrc from "../assets/img/botanic-photo-7.png";
import ProductCard from '../components/shared/ProductCard';
import CollectionBanner from '../components/layout/CollectionBanner';
import ProductDetail from '../components/shared/ProductDetail';
import "../assets/css/collection-banner.css";
import "../assets/css/collection-grid.css";
import "../assets/css/product-card.css";

function PlantCollection(props) {

    const {plants, baseUrl} = useContext(BotanicContext);
    const [regions, setregions] = useState([]);    

    const loadRegions = async() => {
        const response = await fetch(baseUrl + "/api/constant/enum/plantregions");
        const data = await response.json();

        if (data.isSuccess) {
            setregions(data.data);
        } else {
            throw new Error("Regions couldn't load!");
        }
    }

    useEffect(() => {
        loadRegions();   
    }, []);

    return (
        <>
        <CollectionBanner bannerSrc={bannerSrc} />
        <div className="collection-container">
            <div className="row expanded">
                <div className="columns small-12">
                    <div className="collection-wrapper">
                    <div id="ProductGridContainer">
                        <ul className="product-grid">
                            {plants.map((product, ind) => {
                                return(
                                    <>
                                    <li className="collection-product__item grid__item" key={ product.id } product-id= { product.id } >
                                        <ProductCard product={product} />
                                    </li>
                                    </>
                                );
                            })}
                        </ul>                        
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <ProductDetail products={plants} productId="0" />
        </>
    );
}

export default PlantCollection;