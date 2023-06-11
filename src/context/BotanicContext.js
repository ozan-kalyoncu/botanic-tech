
import { createContext, useEffect, useState } from "react";

const BotanicContext  = createContext()

export const BotanicProvider = ({children, user, isExpired, hasSubscription}) => {

    const [baseUrl, setBaseUrl] = useState("https://mis-botanic.herokuapp.com");

    const [plants, setPlants] = useState([]);
    const [items, setItems] = useState([]);
    const [productTypes, setProductTypes] = useState([]);

    const setProductType = (product ,id) => {
        Object.keys(productTypes).map(key => {
            if (productTypes[key].value == id) {
                if (id != 1) {
                    product.typeName = productTypes[key].key;
                } else {
                    product.typeName = product.decorationItemTypeName;
                }
            }
        });
     }

    const loadPlants = async() => {
        const response = await fetch(baseUrl + "/api/product/plant/list");
        const data = await response.json();

        const products = await data.data; 

        if (data.isSuccess) {
            Object.keys(products).map(key => {
                setProductType( products[key] ,products[key].productTypeId);          
            });
            setPlants(products);
        } else {
            throw new Error("Plants couldn't find!");
        }
    }

    const loadItems = async() => {
        const response = await fetch(baseUrl + "/api/product/decorationitem/list");
        const data = await response.json();

        const products = await data.data;

        if (data.isSuccess) {
            Object.keys(products).map(key => {
                setProductType( products[key] ,products[key].productTypeId);          
            });
            setItems(products);
        } else {
            throw new Error("Items couldn't find!");
        }
    }

    const getProductTypes = async () => {

        const response = await fetch(baseUrl + `/api/constant/enum/producttypes`);
        const data = await response.json();
        if (data.isSuccess) {
            setProductTypes(data.data);
        }
    }

    useEffect(() => {
        async function loadProductTypes(){
            await getProductTypes();
        }
        loadProductTypes();
    }, []);

    useEffect(() => {
        async function loadProductList(){
            await loadPlants();
            await loadItems();
        }
        loadProductList();
    }, [productTypes]);

    const shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    return (
        <BotanicContext.Provider
            value={{
               user: user,
               baseUrl: baseUrl,
               isExpired: isExpired,
               hasSubscription: hasSubscription,
               plants: plants,
               decorationItems: items,
               types: productTypes
            }}
        >
            {children}
        </BotanicContext.Provider>
    )
}

export default BotanicContext;

