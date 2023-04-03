import {useState, useEffect} from 'react'
import ListItem from '../components/ListItem';
import { useContext } from "react";
import { CartState } from '../context/CartContext'
import CartContext from '../context/CartContext';

function ShoppingCart() {
    const {
        state: { cartItems },
        dispatch
    } = CartState();

    return (
        <div className='mt-10'>
            <h1 className="text-3xl font-semibold text-slate-800">
                Shopping Cart
            </h1>
            <ul>
                {cartItems.map((item, i) => (
                    <li key={i}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default ShoppingCart;