const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cartItems: action.data,
                loading: false
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