import React, { useState } from 'react'
import axios from 'axios'

export default function FoodItem ({food, token, isLoggedIn}) {
    const [isDeleted, setIsDeleted] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(food.name)
    // const token = '9600235d3622575ff38d185b19a319d8c288a59b'

    const updateFoodItem = (event) => {
        
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
    const deleteIngredient = (event) => {
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
        <input type='checkbox' id={food.name} value={food.name}></input>
        {isEditing ? 
            <div>
                <input onChange={(event) => setName(event.target.value)} value={food.name}></input>
                <button onClick={(event) => updateFoodItem(event)}
                value={food.id}>Submit Edit</button>
            </div>
        : <label htmlFor={food.name}>{food.name}</label>}
            
            <button onClick={(event) => deleteIngredient(event)}>Delete Item</button>
            <button onClick= {() => setIsEditing(true)}>Edit Item</button>
        </li>
    )
}