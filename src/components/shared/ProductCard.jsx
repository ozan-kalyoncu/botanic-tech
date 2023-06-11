import React, { useContext, useEffect, useState } from "react";
import BotanicContext from "../../context/BotanicContext";
import Icons from "./Icons";

function ProductCard({product}) {

    const {baseUrl, types} = useContext(BotanicContext);

    const [productImageURL, setProuctImageUrl] = useState();

    const getProductImageURL = async () => {

        let apiType = "";

        if ("decorationItemTypeId" in product) {
            apiType = "decorationitem"; 
        } else {
            apiType = "plant";
        }

        const response = await fetch(baseUrl + `/api/product/${apiType}/image/${product.id}`);
        const data = await response.blob();

        const objUrl = window.URL.createObjectURL(data);

        setProuctImageUrl(objUrl);
    }

    const openDetails = () => {
        let sidebar = document.querySelector(".product-detail.sidebar-container");
        document.querySelector('.click-capture').classList.add('click-capture-event');
        sidebar.setAttribute("data-id", product.id);
        sidebar.setAttribute("data-image-url", productImageURL);
        sidebar.classList.add("active");
    }

    useEffect(() => {
        async function fetchImage() {
            await getProductImageURL();
        }
        fetchImage();

    }, []);


    return (
        <div className="product-card">
            <div className="card-product-wrapper">
                <figure className="card-product--featured-image">
                    <div className="image-blur"></div>
                    <div className="product-quickview-button">
                        <button className="quickview-button" onClick={() => openDetails()}>
                            <Icons icon="quickview" />
                            <span className="quickview-text">View</span>
                        </button>
                    </div>
                    <img className="product-featured-image card-product-image" src={ productImageURL } alt="" />
                </figure>
                <div className="product-content">
                    <div className="product-type">
                        <span>{ product.typeName }</span>
                    </div>
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{ product.description }</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;


