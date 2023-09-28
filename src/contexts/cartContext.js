import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducers/cartReducer'

const CartContext = createContext();


const getLocalCartData = () => {
    let localCartData = localStorage.getItem("AgrawalCart");
    const parsedData = JSON.parse(localCartData);
    if (!Array.isArray(parsedData)) return [];
    return parsedData;
};




const InitialState = {
    //cart : [],
    cart: getLocalCartData(),
    total_item: "",
    total_price: "",
    shipping_fee: 50000,
};


const CartContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, InitialState);

    const addToCart = (id, color, amount, product) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
    };


    // to remove the individual item from cart
    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };



//---------------------------- Local Storage -------------------------------------------------


    // Add CartItemData to Local Storage so that on reloading page our cart value not removed 
    // getItem and setItem method used to get data or set data in Local Storage
    //  LocalStorage takes values of data in string format
    //  AgrawalCart is the key or name of local Storage where our data stored

    useEffect(() => {

        dispatch({type : "CART_ITEM_PRICE_TOTAL"});

        localStorage.setItem("AgrawalCart", JSON.stringify(state.cart))
    }, [state.cart])


    // to clear the cart
    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    // increment and decrement the product

    const setDecrease = (id) => {
        dispatch({ type: "SET_DECREMENT", payload: id });
    };

    const setIncrement = (id) => {
        dispatch({ type: "SET_INCREMENT", payload: id });
    };


    return (
        <CartContext.Provider
            value={{
                ...state,
                addToCart,
                removeItem,
                clearCart,
                setDecrease,
                setIncrement,
            }}>
            {children}
        </CartContext.Provider>
    )
}



export const useCartContext = () => {
    return useContext(CartContext);
}

export { CartContextProvider }