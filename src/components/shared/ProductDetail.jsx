
import React, { useContext, useEffect } from "react";
import Icons from "./Icons";
import { useState } from "react";
import BotanicContext from "../../context/BotanicContext";

function ProductDetail({productType, productId}) {

    const [id, setId] = useState(productId);
    const [product, setProduct] = useState();
    const [productImageURL, setProductImageUrl] = useState();
    const {baseUrl, types} = useContext(BotanicContext)

    const closeSideBarDetails = () => {
        document.querySelector(".product-detail.sidebar-container").classList.remove("active");
        document.querySelector('.click-capture').classList.remove('click-capture-event');
    }

    const setProductType = (product ,id) => {
        Object.keys(types).map(key => {
            if (types[key].value == id) {
                if (id != 1) {
                    product.typeName = types[key].key;
                } else {
                    product.typeName = product.decorationItemTypeName;
                }
            }
        });
    }

    const getProduct = async() => {

        const response = await fetch(baseUrl + `/api/product/${productType}/${id}`);
        const data = await response.json();
        
        if (data.isSuccess) {
            setProductType(data.data, data.data.productTypeId);
            setProduct(data.data);
        }
    }

    const setMutationObserver = () => {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === "attributes") {
                    setId(mutation.target.dataset.id);
                    setProductImageUrl(mutation.target.dataset.imageUrl);
                }
            });
        });    
        
        observer.observe(document.querySelector('.product-detail.sidebar-container'), {
            attributes: true //configure it to listen to attribute changes
        });
    }

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
                                <p className="form-title">Title</p>
                                <div className="designer-info">{ product.name }</div>
                            </div>
                            <div className="detail-bar-image">
                                <img src={productImageURL} alt="" />
                            </div>
                            {product.description && (
                                <div className="sidebar--body-tab">
                                    <div className="tab-title">
                                        <p className="form-title">Description</p>
                                    </div>
                                    <p>{product.description}</p>
                                </div>
                            )}
                            <div className="sidebar--body-tab">
                                <div className="tab-title">
                                    <p className="form-title">Product Type:</p>
                                    <p>{product.typeName}</p>
                                </div>
                            </div>
                            {product.regions && (
                                <div className="sidebar--body-tab">
                                    <div className="tab-title">
                                        <p className="form-title">Regions:</p>
                                    </div>
                                    <ul className="region-list">
                                    {product.regions.map(region => {
                                        return(
                                            <li className="region-item">{region.name}</li>
                                        );
                                    })}
                                    </ul>
                                </div>
                            )}
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