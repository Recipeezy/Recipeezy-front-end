import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ShoppingList() {
    const [shopList, setShopList] = useState([])


    // Hardcoded token for now
    const token = '9600235d3622575ff38d185b19a319d8c288a59b'

    useEffect(() => {
        axios.get('https://recipeezy-app.herokuapp.com/shopping_list/', { headers: { 'Authorization': `Token ${token}` }, })
            .then((response) => {
                console.log(typeof (response.data[0].shopping_list))
                console.log(response.data[0])
                setShopList(response.data[0].shopping_list.map((obj) => obj.name))
            })
    }, [])




    return (
        <div>
            <Link to='/' type='button'>Home</Link>

            <h1>SHOPPING LIST</h1>
            <div className="shopping-list-main-container">

                {shopList && (
                    shopList.map((e) => (
                        <h1>{e}</h1>
                    ))
                )}

            </div>

        </div>
    )
}

export default ShoppingList
