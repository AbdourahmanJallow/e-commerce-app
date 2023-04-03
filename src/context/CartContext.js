import { createContext, useReducer } from "react";
import cartReducer from "./CartReducer";
import { useContext } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const initialState = {
        cartItems: [],
        // loading: false
    };
    const [state, dispatch] = useReducer(cartReducer, initialState);
    
    // const setLoading = () => {
    //     dispatch({
    //         type: 'SET_LOADING',
    //     })
    // }

    console.log(state)
    return (
        <CartContext.Provider
            value={{
                state, dispatch
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
export const CartState = () => {
    return useContext(CartContext);
};

export default CartContext;