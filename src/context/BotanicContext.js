
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

    const loadPlants = async(region="", type="") => {
        const response = await fetch(baseUrl + `/api/product/plant/list?regionId=${region}&plantTypeId=${type}`);
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

    const loadItems = async(type="") => {
        const response = await fetch(baseUrl + `/api/product/decorationitem/list?decorationItemTypeId=${type}`);
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
               setPlants: setPlants,
               loadPlants: loadPlants,
               decorationItems: items,
               loadItems: loadItems,
               types: productTypes,
               plantCollectionDesc: "Thanks to our data on many different plants, you will be able to learn which plant in 7 regions of Turkey would be more efficient and suitable for you to grow. You will be able to cope with your works such as growing plants and landscaping much more easily than before.",
               itemCollectionDesc: "In the Decoration section, we present some of the most preferred models of items such as garden lighting, fences, garden seating groups and benches in order to give an idea to our customers."
            }}
        >
            {children}
        </BotanicContext.Provider>
    )
}

export default BotanicContext;

