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
import { toast } from 'react-toastify'
import { db } from '../firebase.config.js'

function SellItem() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        price: 0,
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
        setLoading(true)

        if (images.length > 3) {
            setLoading(false)
            toast.error('You can only enter a max of 3 images')
            return
        }

        /* Store Images */
        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

                const storageRef = ref(storage, 'images/' + fileName);
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
        delete formDataCopy.images
        // formData.imageUrls = imageUrls;
        
        await addDoc(collection(db, 'items'),formDataCopy);
        // console.log(docRef)
        setLoading(false);
        toast.success('Item saved successfully')
        // navigate('/')
    }

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
            }))
        }
    }

    if (loading) {
        return <Spinner />
    }
    return (
        <div className="py-12">
            <h2 className="text-2xl font-bold">Sell Your Item</h2>
            <div className="mt-8 max-w-md">
                <form onSubmit={onSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                        <label className="block">
                            <span className="text-amber-400">Name of Item</span>
                            <input
                                type="text"
                                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                id="name"
                                value={name}
                                onChange={onChange}
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="text-amber-400">Your address</span>
                            <input
                                type="text"
                                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                id="address"
                                value={address}
                                onChange={onChange}
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="text-amber-400">
                                Your Price (D)
                            </span>
                            <input
                                type="number"
                                className="form-input mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                id="price"
                                value={price}
                                onChange={onChange}
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="text-amber-400">
                                Images of the item (max-3)
                            </span>
                            <input
                                type="file"
                                className="mt-4 block px-0.5 border-0 border-b-2 file-input file-input-bordered file-input-info w-full max-w-xs"
                                id="images"
                                max="3"
                                onChange={onChange}
                                accept=".jpg,.png,.jpeg"
                                multiple
                                required
                            />
                        </label>

                        <div className="block">
                            <button
                                type="submit"
                                className="btn btn-xs sm:btn-sm md:btn-md bg-amber-400 hover:bg-amber-300 border-none"
                            >
                                Sell item
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SellItem;
