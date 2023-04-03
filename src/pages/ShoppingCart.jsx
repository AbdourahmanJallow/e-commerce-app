import { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import { useContext } from "react";
import { CartState } from "../context/CartContext";
import CartContext from "../context/CartContext";
import CartItem from "../components/CartItem";

function ShoppingCart() {
    const {
        state: { cartItems },
        dispatch
    } = CartState();

    if (cartItems.length < 1) {
        return <div>No items on your cart</div>;
    }
    return (
        <div className="overflow-x-auto w-full flex my-8">
            {/* <h1 className="text-3xl font-bold my-5">Your Cart</h1> */}
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Nearest location</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <CartItem cart={item} />
                    ))}
                </tbody>
            </table>
            <div className="bg-slate-800 text-white flex flex-col items-start justify-start mx-5 p-3 min-w-fit">
                <div className="font-semibold text-2xl text-center mb-3">
                    Sub Total ({cartItems.length})
                </div>
                <div className="text-primary-content">Total: D{}</div>
                <button className="btn btn-primary mt-4 self-center">
                    Check out
                </button>
            </div>
        </div>
    );
}

export default ShoppingCart;
