import React from 'react'

function ListItem({ data, id }) {

    return (
        <li className="card shadow-md bg-base-100 p-4 flex flex-col">
            <div
                className="bg-cover bg-center"
                style={{
                    backgroundImage: `url(${data.imageUrls[0]})`,
                    backgroundRepeat: "no-repeat",
                    height: "300px"
                }}
            ></div>
            <div className="mt-3 p-3 flex justify-between">
                <div className="flex flex-col">
                    <h4 className="card-title">{data.name}</h4>
                    <p className="">Location: {data.address}</p>
                </div>
                <div className="flex justify-end text-2xl font-bold">
                    D
                    {data.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
            </div>
        </li>
    );
}

export default ListItem