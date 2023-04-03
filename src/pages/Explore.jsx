import React from "react";
import Spinner from "../components/Spinner";
import { useState, useEffect } from "react";
import { db } from "../firebase.config";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { toast } from "react-toastify";
import ListItem from "../components/ListItem";


function Explore() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const itemsRef = collection(db, "items");
                const q = query(
                    itemsRef,
                    orderBy("timestamp", "desc"),
                    limit(10)
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
                toast.error("Failed to fetch items");
            }
        };

        fetchItems();
        // eslint-disable-next-line
    }, []);

    console.log(items);

    return (
        <main className="flex flex-col justify-start p-6">
            {items.length > 0 && (
                <header>
                    <h3 className="text-3xl font-bold">Items</h3>
                </header>
            )}

            {loading ? (
                <Spinner />
            ) : items && items.length > 0 ? (
                <>
                    <main className="mt-3">
                        <ul className="grid grid-cols-1 xl:grid-cols-3 xl:gap-16 lg:grid-cols-2 md:gap-16 md:grid-cols-2 gap-8">
                            {items.map((item) => (
                                <ListItem
                                    key={item.id}
                                    data={item.data}
                                    // id={item.id}
                                />
                            ))}
                        </ul>
                    </main>
                </>
            ) : (
                <p className="text-3xl text-center font-semibold">
                    No Items for sale
                </p>
            )}
        </main>
    );
}

export default Explore;
