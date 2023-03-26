import React from "react";
import Spinner from "../components/Spinner";
import { useState, useEffect } from "react";
import { db } from "../firebase.config";
import { collection, getDocs , query, limit, orderBy} from "firebase/firestore";
import { toast } from "react-toastify";

function Explore() {
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const itemsRef = collection(db, "items");
                const q = query(
                    itemsRef,
                    orderBy("timestamp", "desc"),
                    limit(5)
                );
                const querySnap = await getDocs(q);

                const data = [];

                querySnap.forEach((doc) => {
                    return data.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                setItems(data);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchItems();
    }, [items]);

    // console.log(items);

    if (loading) {
        return <Spinner />
    }
    return (
        <div>Explore</div>
    );
}

export default Explore;
