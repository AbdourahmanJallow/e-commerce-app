const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
            
        default:
            return state;
    }
}

export default cartReducer;

/* 
return {
                ...state,
                cartItems: [...state.cartItems,action.payload],
                loading: false
            };
 */