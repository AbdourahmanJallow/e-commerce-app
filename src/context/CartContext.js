import { createContext, useReducer } from "react";
import cartReducer from "./CartReducer";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const initialState = {
        cartItems: [],
        loading: false
    };
    const [state, dispatch] = useReducer(cartReducer, initialState);
    
    const addToCart = (item) => {
        setLoading()
        const updatedCart = [...state, item];
        dispatch({
            type: "ADD_TO_CART",
            payload: updatedCart
        });
    }
    
    const setLoading = () => {
        dispatch({
            type: 'SET_LOADING',
        })
    }

    return (
        <CartContext.Provider
            value={{
                cartItems: state.cartItems,loading: state.loading,
                addToCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;