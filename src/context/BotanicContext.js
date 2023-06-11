
import { createContext, useEffect, useState } from "react";

const BotanicContext  = createContext()

export const BotanicProvider = ({children, user, isExpired, hasSubscription}) => {

    const [baseUrl, setBaseUrl] = useState("https://mis-botanic.herokuapp.com");

    const [plants, setPlants] = useState([]);
    const [items, setItems] = useState([]);

    const loadPlants = async() => {
        const response = await fetch(baseUrl + "/api/product/plant/list");
        const data = await response.json();
        if (data.isSuccess) {
            setPlants(data.data);
        } else {
            throw new Error("Plants couldn't find!");
        }
    }

    const loadItems = async() => {
        const response = await fetch(baseUrl + "/api/product/decorationitem/list");
        const data = await response.json();

        if (data.isSuccess) {
            Object.keys(data.data).map(key => {
                setItems( (current) => [...current ,data.data[key]]);
            });
        } else {
            throw new Error("Items couldn't find!");
        }
    }

    useEffect(() => {
        async function loadProductList(){
            await loadPlants();
            await loadItems();

        }
        loadProductList();
    }, []);

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
               decorationItems: items
            }}
        >
            {children}
        </BotanicContext.Provider>
    )
}

export default BotanicContext;

