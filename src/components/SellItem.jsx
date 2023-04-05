import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import Spinner from "./Spinner";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase.config.js";
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
function SellItem() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        price: null,
        images: {}
    });

    const { name, address, price, images } = formData;

    const isMounted = useRef(true);
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({
                        ...formData,
                        userRef: user.uid
                    });
                } else {
                    navigate("/login");
                }
            });
        }
    }, [isMounted]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (images.length > 3) {
            setLoading(false);
            toast.error("You can only enter a max of 3 images");
            return;
        }

        /* Store Images */
        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const fileName = `${auth.currentUser.uid}-${
                    image.name
                }-${uuidv4()}`;

                const storageRef = ref(storage, "images/" + fileName);
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        console.log("Upload is " + progress + "% done");
                        switch (snapshot.state) {
                            case "paused":
                                console.log("Upload is paused");
                                break;
                            case "running":
                                console.log("Upload is running");
                                break;
                            default:
                                break;
                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        reject(error);
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                resolve(downloadURL);
                            }
                        );
                    }
                );
            });
        };

        const imageUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
        ).catch(() => {
            setLoading(false);
            toast.error("Image(s) could not be uploaded");
            return;
        });

        console.log(imageUrls);
        console.log(formData);

        const formDataCopy = {
            ...formData,
            imageUrls,
            timestamp: serverTimestamp()
        };

        console.log(formDataCopy);
        delete formDataCopy.images;
        // formData.imageUrls = imageUrls;

        await addDoc(collection(db, "items"), formDataCopy);
        // console.log(docRef)
        setLoading(false);
        toast.success("Item saved successfully");
        navigate('/profile')
    };

    const onChange = (e) => {
        /* Check for files */
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }));
        }

        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value
            }));
        }
    };

    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="py-12">
            <h2 className="text-2xl font-bold dark:text-white">
                Sell Your Item
            </h2>
            <div className="mt-8 max-w-md">
                <form onSubmit={onSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                        <label className="block">
                            <span className="dark:text-slate-400">
                                Name of Item
                            </span>
                            <input
                                type="text"
                                className="dark:bg-gray-200 px-2 dark:rounded-2xl mt-0 block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                id="name"
                                value={name}
                                onChange={onChange}
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="dark:text-slate-400">
                                Your address
                            </span>
                            <input
                                type="text"
                                className="dark:bg-gray-200 px-2 dark:rounded-2xl mt-0 block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                id="address"
                                value={address}
                                onChange={onChange}
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="dark:text-slate-400">
                                Your Price (D)
                            </span>
                            <input
                                type="number"
                                className="dark:bg-gray-200 px-2 dark:rounded-2xl form-input mt-0 block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                id="price"
                                value={price}
                                onChange={onChange}
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="dark:text-slate-400">
                                Choose atleast 3 photos
                            </span>
                            <input
                                type="file"
                                className="mt-4 block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100"
                                id="images"
                                max="3"
                                onChange={onChange}
                                accept=".jpg,.png,.jpeg"
                                multiple
                                required
                            />
                        </label>

                        <div className="block mt-2">
                            <button
                                type="submit"
                                className="py-1 px-4 rounded-full text-white bg-indigo-700"
                            >
                                Sell item{" "}
                                <RiMoneyDollarCircleLine
                                    className="inline"
                                    size={25}
                                />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SellItem;

