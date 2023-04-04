import { HiOutlineShoppingCart } from "react-icons/hi";
import { AiOutlineCrown } from 'react-icons/ai'
import { MdDelete } from "react-icons/md";
import { CartState } from "../context/CartContext";
import { motion } from "framer-motion";
import useAuthStatus from "../hooks/useAuthStatus.js";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { getAuth } from "firebase/auth";
function ListItem({ item }) {

    const { data } = item;
    const {
        state: { cartItems },
        dispatch
    } = CartState();

    const { name, imageUrls, price } = data;
    const { loggedIn } = useAuthStatus();
    const navigate = useNavigate()
    const auth = getAuth();
    
    return (
        <motion.div
            initial={{ y: -500 }}
            whileHover={{
                scale: 0.9,
                transition: { duration: 1 }
            }}
            animate={{ y: 0 }}
            transition={{ ease: "easeOut", duration: 2 }}
            className="card min-w-fit bg-base-100 shadow-xl hover:shadow-indigo-700"
        >
            <figure className="px-10 pt-10">
                <img src={imageUrls[0]} alt={name} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>D{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                <div className="card-actions">
                    {auth.currentUser?.uid === data.userRef ? 
                        <p className="p-2 bg-amber-500 rounded-lg text-white">Your item <AiOutlineCrown size={27} className="inline" /> </p> :
                            <>
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
                                                if (loggedIn) {
                                                    dispatch({
                                                        type: "ADD_TO_CART",
                                                        payload: item
                                                    });
                                                    console.log("Added!");
                                                }
                                                else {
                                                    toast.error('Please login first')
                                                    navigate('/login')
                                                }
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
                            </>
                    }
                </div>
            </div>
        </motion.div>
    );
}


export default ListItem
