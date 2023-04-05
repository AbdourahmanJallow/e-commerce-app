import { IoIosRemoveCircle } from 'react-icons/io';
import { CartState } from "../context/CartContext";

function CartItem({ cart }) {
    const {
        state: { cartItems },
        dispatch
    } = CartState();

    
    const { data } = cart 
    const { name, price, address, imageUrls } = data;

    return (
        <tr className="border-b-2">
            <td className="dark:bg-slate-800 rounded-l-lg">
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-24 rounded">
                            <img src={imageUrls[0]} alt={name} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold dark:text-white">{name}</div>
                    </div>
                </div>
            </td>
            <td className="dark:bg-slate-800 dark:text-slate-400">{address}</td>
            <td className="dark:bg-slate-800 dark:text-slate-400">
                D{price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </td>
            <th className="dark:bg-slate-800 rounded-r-lg">
                <button type="submit" onClick={console.log(cart)}>
                    <IoIosRemoveCircle
                        size={30}
                        fill="red"
                        className="inline"
                        onClick={() =>
                            dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: cart
                            })
                        }
                    />
                </button>
            </th>
        </tr>
    );
}

export default CartItem