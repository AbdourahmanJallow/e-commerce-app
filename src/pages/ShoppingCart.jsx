import {useState, useEffect} from 'react'
import ListItem from '../components/ListItem';
import { useContext } from "react";
import CartContext from '../context/CartContext';

function ShoppingCart() {
    const { cartItems } = useContext(CartContext);

    return (
        <div>
            <h1 className='text-3xl font-semibold text-rose-500'>Shopping Cart</h1>
            <ul>
                {/* {cartItems.map((i, item) => (
                    <li key={i}>{item.name}</li>
                ))} */}
            </ul>
        </div>
    );
}

export default ShoppingCart;