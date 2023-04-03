import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { CartState } from "../context/CartContext";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../context/cartSlice.js";
import { useState } from "react";

function ListItem({ item }) {
    // const cartItems = useSelector((state) => state.cart.cartItems);
    // const dispatch = useDispatch();
    // const { dispat } = useContext();
    const { data } = item;
    const {
        state: { cartItems },
        dispatch
    } = CartState();

    const { name, imageUrls, price } = data;
    return (
        <li className="card min-w-fit bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={imageUrls[0]} alt={name} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>D{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                <div className="card-actions">
                    {cartItems.some((cart) => cart.id === item.id) ? (
                        <button
                            onClick={() => {
                                dispatch({
                                    type: "REMOVE_FROM_CART",
                                    payload: item
                                });
                                console.log("Added!");
                            }}
                            className="btn btn-error text-white"
                        >
                            Remove from cart{" "}
                            <MdDelete className="inline-block ml-1" size={25} />
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                dispatch({
                                    type: "ADD_TO_CART",
                                    payload: item
                                });
                                console.log("Added!");
                            }}
                            className="btn btn-primary"
                        >
                            Add to cart{" "}
                            <HiOutlineShoppingCart
                                className="inline-block ml-1"
                                size={25}
                            />
                        </button>
                    )}
                </div>
            </div>
        </li>
    );
}


export default ListItem
