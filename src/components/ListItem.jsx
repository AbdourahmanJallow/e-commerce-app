import { HiOutlineShoppingCart } from "react-icons/hi";
import { useContext } from "react";
import { CartState } from "../context/CartContext";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../context/cartSlice.js";
import { useState } from "react";

function ListItem({ data }) {
    // const cartItems = useSelector((state) => state.cart.cartItems);
    // const dispatch = useDispatch();
    // const { dispat } = useContext();
    const {
        state: { cartItems },
        dispatch
    } = CartState();

    const { name, imageUrls, price } = data;
    return (
        <li className="card min-w-fit bg-base-100 shadow-xl">
            {/* <div className="card shadow-md bg-base-100 p-3">
                <img
                    className="rounded-md self-center"
                    src={data.imageUrls[0]}
                    alt={data.name}
                    width="60%"
                />
                <div className="flex flex-col justify-evenly mt-3 min-w-fit">
                    <h3 className="text-xl font-mono font-bold">{data.name}</h3>
                    <p className="text-slate-500">
                        D
                        {data.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    </p>
                    <p
                        className="btn btn-sm mt-2 text-sm justify-center self-end"
                        onClick={
                            () => {
                                dispatch({
                                    type: 'ADD_TO_CART',
                                    payload: data
                                })
                                console.log('Added!');
                            }}
                    >
                        Add to cart
                        <HiOutlineShoppingCart
                            className="inline-block ml-1"
                            size={25}
                        />
                    </p>
                </div>
            </div> */}
            {/* <div > */}
            <figure className="px-10 pt-10">
                <img src={imageUrls[0]} alt={name} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>D{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                <div className="card-actions">
                    <button
                        onClick={() => {
                            dispatch({
                                type: "ADD_TO_CART",
                                payload: data
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
                </div>
            </div>
            {/* </div> */}
        </li>
    );
}
/* D
                        {data.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */
export default ListItem

/* 
<div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
 */