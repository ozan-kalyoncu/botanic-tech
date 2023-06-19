import React, { useContext, useEffect, useState } from 'react';
import BotanicContext from '../context/BotanicContext';
import bannerSrc from "../assets/img/botanic-photo-7.png";
import ProductCard from '../components/shared/ProductCard';
import CollectionBanner from '../components/layout/CollectionBanner';
import ProductDetail from '../components/shared/ProductDetail';
import Icons from '../components/shared/Icons';
import "../assets/css/collection-banner.css";
import "../assets/css/collection-grid.css";
import "../assets/css/product-card.css";

function PlantCollection(props) {

    const {plants, baseUrl, types, setPlants, loadPlants, plantCollectionDesc} = useContext(BotanicContext);
    const [regions, setregions] = useState([]); 
    const [plantTypes, setplantTypes] = useState([]);   
    const [plantFilters, setplantFilters] = useState([
        {
            "key": "",
            "name":"region"
        },
        {
            "key":"",
            "name": "type"
        }
    ]); 

    const loadRegions = async() => {
        const response = await fetch(baseUrl + "/api/constant/enum/plantregions");
        const data = await response.json();

        if (data.isSuccess) {
            setregions(data.data);
        } else {
            throw new Error("Regions couldn't load!");
        }
    }

    const filter = async (e) => {
        e.stopPropagation();

        let nextFilters = plantFilters.map(filter => {
            if (filter.name == e.target.name) {
                return {
                    ...filter,
                    key: e.target.value == 0 ? "" : e.target.value
                }
            } else {
                return {
                    ...filter
                }
            }
        });

        setplantFilters(nextFilters);
    }

    const loadPlantTypes = async() => {
        const response = await fetch(baseUrl + "/api/constant/enum/planttypes");
        const data = await response.json();

        if (data.isSuccess) {
            setplantTypes(data.data);
        } else {
            throw new Error("Plant types couldn't load");
        }
    }

    useEffect(() => {
        async function loadAttributes() {
            await loadRegions(); 
            await loadPlantTypes();
        }
        loadAttributes();
    }, []);

    useEffect(() => {
        loadPlants(plantFilters[0].key, plantFilters[1].key);
    }, [plantFilters]);

    return (
        <>
        <CollectionBanner bannerSrc={bannerSrc} description={plantCollectionDesc} />
        <div className="collection-container">
            <div className="row expanded">
                <div className="columns small-12">
                    <div className="collection-wrapper">
                        <div className="status-filter collection-filter">
                            <div className="filter--title">
                                Filter
                            </div>
                            <div className='regionPicker collection-filter-picker'>
                                <p>
                                    <span>Region:</span>
                                </p>
                                <select name="region" className='regionlist filter-list' onChange={async(e) => await filter(e)}>
                                    <option className='regionlist--item collection-filter--item' value="0">
                                        <span>All</span>
                                    </option>
                                    {regions.map(region => {
                                        return(
                                            <option className='regionlist--item collection-filter--item' value={region.value}>
                                                <span>{ region.key }</span>
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className='typePicker collection-filter-picker'>
                                <p>
                                    <span>Type:</span>
                                </p>
                                <select name="type" className='typelist filter-list' onChange={async(e) => await filter(e)}>
                                    <option className='typelist--item collection-filter--item' value="0">                                                
                                        <span>All</span>
                                    </option>
                                    {plantTypes.map(plantType => {
                                        return(
                                            <option className='typelist--item collection-filter--item' value={plantType.value}>                                                
                                                <span>{ plantType.key }</span>
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
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
        <ProductDetail productType="plant" productId="0" />
        </>
    );
}

export default PlantCollection;