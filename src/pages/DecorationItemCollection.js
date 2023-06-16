import React, { useContext, useEffect, useState } from 'react';
import BotanicContext from '../context/BotanicContext';
import bannerSrc from "../assets/img/botanic-photo-7.png";
import ProductCard from '../components/shared/ProductCard';
import ProductDetail from '../components/shared/ProductDetail';
import CollectionBanner from '../components/layout/CollectionBanner';
import "../assets/css/collection-banner.css";
import "../assets/css/collection-grid.css";
import "../assets/css/product-card.css";

function DecorationItemCollection(props) {

    const {decorationItems, baseUrl, types, loadItems} = useContext(BotanicContext);
    const [itemTypes, setitemTypes] = useState([]);


    const loadItemTypes = async() => {
        const response = await fetch(baseUrl + "/api/constant/enum/decorationitemtypes");
        const data = await response.json();

        if (data.isSuccess) {
            setitemTypes(data.data);
        } else {
            throw new Error("Item Types couldn't load!");
        }
    }
    
    const filter = async (e) => {
        e.stopPropagation();
        if (e.target.value == 0) {
            loadItems();
        } else {
            loadItems(e.target.value);
        }
    }


    useEffect(() => {
        loadItemTypes();
    }, []);

    return (
        <>
        <CollectionBanner bannerSrc={bannerSrc} />
        <div className="collection-container">
            <div className="row expanded">
                <div className="columns small-12">
                    <div className="collection-wrapper">
                    <div className="status-filter collection-filter">
                            <div className="filter--title">
                                Filter:
                            </div>
                            <div className='typePicker collection-filter-picker'>
                                <p>
                                    <span>Type:</span>
                                </p>
                                <select name="type" className='typelist filter-list' onChange={async(e) => await filter(e)}>
                                    <option className='typelist--item collection-filter--item' value="0">                                                
                                        <span>All</span>
                                    </option>
                                    {itemTypes.map(itemType => {
                                        return(
                                            <option className='typelist--item collection-filter--item' value={itemType.value}>                                                
                                                <span>{ itemType.key }</span>
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div id="ProductGridContainer">
                            <ul className="product-grid">
                                {decorationItems.map((product, ind) => {
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
        <ProductDetail productType="decorationitem" productId="0" />
        </>
    );
}

export default DecorationItemCollection;