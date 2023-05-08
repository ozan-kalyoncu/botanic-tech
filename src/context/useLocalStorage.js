

import { useState } from "react";

function useLocalStorage() {

    const [value, setValue] = useState(null);

    const setItem = (key, value) => {
        localStorage.setItem(key, value);
        setValue(value);
    };

    const getItem = (key) => {
        const value = localStorage.getItem(key);
        setValue(value);
        return value;
    };

    const removeItem = (key) => {
        localStorage.removeItem(key);
        setValue(null);
    };

    const removeAll = () => {
        localStorage.clear();
        setValue(null);
    }

    return { value, setItem, getItem, removeItem, removeAll };
}


export { useLocalStorage };