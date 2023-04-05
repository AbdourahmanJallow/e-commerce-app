import { useState, useEffect } from "react";
import { CartState } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { toast } from "react-toastify";

function ShoppingCart() {
    const {
        state: { cartItems },
        // eslint-disable-next-line
        dispatch
    } = CartState();

    const [total, setTotal] = useState();

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
        <>
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
            </div>
            <div className="my-10 bg-slate-800 text-white flex items-center justify-between px-3 py-2 rounded-lg shadow-2xl w-80">
                <div className="mr-10 flex-none">
                    <h3 className="font-semibold text-2xl mb-3">
                        Sub Total ({cartItems.length})
                    </h3>
                    <p className="text-xl text-gray-300">
                        <span className="">Total: </span>D
                        {total
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center mt-4 text-sm text-primary-focus h-full">
                    <button
                        onClick={() => {
                            toast.info('no functionality for check out button')
                        }}
                        className="btn btn-sm btn-primary mt-4"
                    >
                        Check out
                    </button>
                </div>
            </div>
        </>
    );
}

export default ShoppingCart;
