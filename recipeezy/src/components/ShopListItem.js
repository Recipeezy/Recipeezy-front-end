import React, { useState } from 'react'
import axios from 'axios'

export default function ShopListItem ({food, token, shopList, setShopList}) {
    const [isDeleted, setIsDeleted] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(food.name)

    const updateShopListItem = (event) => {

        event.preventDefault()
        axios.put(
            `http://recipeezy-app.herokuapp.com/ingredients/${food.id}/`,
            {
                name: name
            },
            {
                headers: { Authorization: `Token ${token}` },
            },
        )
            .then(setIsEditing(false))


    }

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


    const swapItemToPantry = (event) => {
        console.log('token is ', token)
        event.preventDefault();
        axios.put(`https://recipeezy-app.herokuapp.com/ingredients/${food.id}/swap/`,
            {
            },
            {
                headers: { Authorization: `Token ${token}` },
            },
        )
            .then((response) => {
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
            {isEditing ?
                <div>
                    <input onChange={(event) => setName(event.target.value)} value={name}></input>
                    <button onClick={(event) => updateShopListItem(event)}
                        value={food.id}>Submit Edit</button>
                </div>
                : <label htmlFor={name}>{name}</label>}
            
            <button
                onClick={(event) => swapItemToPantry(event)}>Add to Pantry
            </button>
            <button 
                onClick={(event) => deleteShopListItem(event)}>Delete Item
            </button>
            <button onClick={() => setIsEditing(true)}>Edit Item</button>
        </li>
    )
}