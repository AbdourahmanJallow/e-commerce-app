import { HiOutlineShoppingCart } from "react-icons/hi";
import { useContext } from "react";
import CartContext from "../context/CartContext";

function ListItem({ data }) {
    const { addToCart, cartItems } = useContext(CartContext);

    return (
        <li>
            <div className="card shadow-md bg-base-100 p-3">
                <img
                    className="rounded-md self-center"
                    src={data.imageUrls[0]}
                    alt={data.name}
                    width="70%"
                    // height="600"
                />
                <div className="flex flex-col justify-evenly mt-3">
                    <h3 className="card-title">{data.name}</h3>
                    <p className="text-slate-500">
                        D
                        {data.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    </p>
                    <p
                        className="btn btn-sm mt-2 text-sm justify-center self-end"
                        onClick={() => {
                            console.log('Clicked')
                            addToCart(data);
                            // console.log('done')
                            // console.log(cartItems);
                        }}
                    >
                        Add to cart
                        <HiOutlineShoppingCart
                            className="inline-block ml-1"
                            size={25}
                        />
                    </p>
                </div>
            </div>
        </li>
    );
}
/* D
                        {data.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */
export default ListItem