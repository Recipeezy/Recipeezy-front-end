import React, { useState } from 'react'
import axios from 'axios'

export default function ShopListItem ({food, token}) {
    const [isDeleted, setIsDeleted] = useState(false)

    const deleteShopListItem = (event) => {
        event.preventDefault();
        axios.delete(`http://recipeezy-app.herokuapp.com/ingredients/${food.id}`,
            {
                headers: { Authorization: `Token ${token}` },
            }
        )
            .then((response) => {
                console.log('deleted', response)
                setIsDeleted(true)

            },
            )
    }
    
    if (isDeleted) return false;

    return (
        <li>
            <input
                type='checkbox'
                id={food.id}
                className='checkboxes'
                value={food.name}
                
                >
            </input>
            <label 
                htmlFor={food.name}>{food.name}
            </label>
            <button 
                onClick={(event) => deleteShopListItem(event)}>Delete Item
            </button>
        </li>
    )
}