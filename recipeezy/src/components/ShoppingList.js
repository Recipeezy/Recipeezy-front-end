import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ShopListItem from './ShopListItem.js'

function ShoppingList({token}) {
    const [shopList, setShopList] = useState([])


    useEffect(() => {
        axios.get('https://recipeezy-app.herokuapp.com/shopping_list/', { 
            headers: { 'Authorization': `Token ${token}` }, 
        })
            .then((data) => {
                setShopList(data.data[0].shopping_list)
                console.log(data.data[0].shopping_list)
                
                
                

            })
    }, [])



    return (
        <div>
            <Link to='/' type='button'>Home</Link>

            <h1>SHOPPING LIST</h1>
            <div className="shopping-list-main-container">
                
                {shopList ? (
                    <div>
                    {shopList.map((food) => (
                        <ShopListItem 
                            food={food}
                            key={food.id}
                            token={token}
                        />
                    
                    ))
                    }

                    </div>
                    ) : (
                        <p>Loading...</p>
                    )}
            </div>

        </div>
    

    )
}

export default ShoppingList


// useEffect(() => {
//     axios.get('https://recipeezy-app.herokuapp.com/shopping_list/', { 
//         headers: { 'Authorization': `Token ${token}` }, 
//     })
//         .then((response) => {
//             console.log(typeof (response.data[0].shopping_list))
//             console.log(response.data[0])
//             setShopList(response.data[0].shopping_list.map((obj) => obj.name))

//         })
// }, [])

