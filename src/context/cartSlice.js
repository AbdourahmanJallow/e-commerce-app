import { createSlice } from "@reduxjs/toolkit";


// const initialState = {
//     count: 0
// }


// export const counterSlice = createSlice({
//     name: 'counter',
//     initialState,
//     reducers: {
//         increment: (state) => {
//             state.count += 1;
//         },
//         decrement: (state) => {
//             state.count -= 1;
//         },
//         reset: (state) => {
//             state.count = 0
//         },
//         incrementByAmount: (state, action) => {
//             state.count += action.payload
//         }
//     }
// })


const initialState = {
    cartItems: [],
    // count: 0,
    // cartTotalQuantity: 0,
    // cartTotalAmount: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addToCart(state, action) {
        //     state.cartItems.push(action.payload)
        // },
        increment: (state, action) => {
            // state.count += 1;
            state.cartItems = [...state.cartItems, action.payload]
        }
    }
})

export const { increment } = cartSlice.actions;
export default cartSlice.reducer;