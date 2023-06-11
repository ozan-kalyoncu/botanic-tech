
import React, { useContext, useEffect } from "react";
import Icons from "./Icons";
import { useState } from "react";
import BotanicContext from "../../context/BotanicContext";

function ProductDetail({products, productId}) {

    const [id, setId] = useState(productId);
    const [product, setProduct] = useState();
    const [productImageURL, setProuctImageUrl] = useState();
    const {baseUrl} = useContext(BotanicContext)

    const closeSideBarDetails = () => {
        document.querySelector(".product-detail.sidebar-container").classList.remove("active");
        document.querySelector('.click-capture').classList.remove('click-capture-event');
    }

    const getProductImageURL = async () => {

        let apiType = "";

        if ("decorationItemTypeId" in product) {
            apiType = "decorationitem"; 
        } else {
            apiType = "plant";
        }

        const response = await fetch(baseUrl + `/api/product/${apiType}/image/${id}`);
        const data = await response.blob();

        const objUrl = window.URL.createObjectURL(data);

        setProuctImageUrl(objUrl);
    }

    const getProduct = async() => {

        const response = await fetch(baseUrl + `/api/product/plant/${id}`);
        const data = await response.json();
        
        if (data.isSuccess) {
            setProduct(data.data);
        }
    }

    const setMutationObserver = () => {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === "attributes") {
                    setId(mutation.target.dataset.id);
                }
            });
        });    
        
        observer.observe(document.querySelector('.product-detail.sidebar-container'), {
            attributes: true //configure it to listen to attribute changes
        });
    }

    useEffect(() => {
        async function fetchImage() {
            await getProductImageURL();
        }
        fetchImage();
    }, [id]);

    useEffect(() => {
        setMutationObserver();
    });

    useEffect(() => {
        async function loadProduct() {
            await getProduct();
        }
        loadProduct();
    }, [id]);

    return (
        <div className="product-detail sidebar-container" data-id={id}>
            <div className="sidebar--info">
                <div className="sidebar--content">
                    <div className="sidebar--title">
                        <h2>Product Detail</h2>
                    </div>
                    {product ? (
                        <div className="sidebar--body">
                            <div className="content-wrapper">
                                <p className="form-title">Product</p>
                                <div className="designer-info">{ product.name }</div>
                            </div>
                            <div className="detail-bar-image">
                                <img src={productImageURL} alt="" />
                            </div>
                            <div className="sidebar--body-tab">
                                <div className="title-holder">
                                    <p className="form-title">Description</p>
                                </div>
                                <p>{product.description.substring(0, 30) + (product.description.length <= 30 ? '' : '...')}</p>
                            </div>
                        </div>
                    ): (
                        <div className="sidebar--body"></div>
                    )}
                </div>
                <div className="sidebar-footer">
                    <button onClick={() => closeSideBarDetails()} type="button" name="" className="button">
                        {<Icons icon="chevronleft" link="" />}
                        <p>Return to products</p>                    
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;