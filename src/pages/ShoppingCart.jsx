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

    const [total, setTotal] = useState();
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTotal(
            cartItems.reduce((acc, curr) => acc + Number(curr.data.price), 0)
        );
    }, [cartItems]);
    console.log(total);

    if (cartItems.length < 1) {
        return <div>No items on your cart</div>;
    }
    return (
        <div className="overflow-x-auto w-full flex my-8">
            <table className="table w-full">
                <thead>
                    <tr>
                        {/* <th>Name</th>
                        <th>Nearest location</th>
                        <th>Price</th> */}
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <CartItem cart={item} />
                    ))}
                </tbody>
            </table>
            <div className="bg-slate-800 text-white flex flex-col items-start justify-between mx-5 px-3 py-4 min-w-fit rounded-lg shadow-2xl">
                <div className="font-semibold text-2xl text-center mb-3">
                    Sub Total ({cartItems.length})
                </div>
                <div className="text-blue-600 text-xl from-neutral-focus">
                    <span className="font-semibold">Total: D</span>
                    {total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                <button className="btn btn-primary mt-4 self-center">
                    Check out
                </button>
                <div className="flex flex-col justify-center items-center self-center mt-4 text-sm text-primary-focus">
                    <p>No Functionality</p>
                    <p>for checkout</p>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;
