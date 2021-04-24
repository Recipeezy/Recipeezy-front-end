import React, { useState } from 'react'
import axios from 'axios'

export default function FoodItem({ food, setSelectedIngredients, selectedIngredients }) {
    const [isDeleted, setIsDeleted] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(food.name)
    const token = '9600235d3622575ff38d185b19a319d8c288a59b'

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

    const checkBoxClick = (e) => {
        let checkedTotal = 0
        let checkboxes = document.querySelectorAll('.checkboxes')
        for (let c of checkboxes) {
            if (c.checked === true) {
                checkedTotal++
            }
        }
        if (checkedTotal > 4) {
            alert('only 4 at a time')
            e.target.checked = false
        }

        if (!selectedIngredients.includes(e.target.value)) {
            setSelectedIngredients([...selectedIngredients, e.target.value])
        } else {
            let n = [...selectedIngredients]
            n.splice(n.indexOf(e.target.value), 1)
            setSelectedIngredients(n)
        }
    }


    if (isDeleted) return false;

    return (
        <li>
            <input onChange={checkBoxClick} type='checkbox' id={food.item} className="checkboxes" value={food.name}></input>
            {isEditing ?
                <div>
                    <input onChange={(event) => setName(event.target.value)} value={name}></input>
                    <button onClick={(event) => updateFoodItem(event)}
                        value={food.id}>Submit Edit</button>
                </div>
                : <label htmlFor={name}>{name}</label>}

            <button onClick={(event) => deleteIngredient(event)}>Delete Item</button>
            <button onClick={() => setIsEditing(true)}>Edit Item</button>
        </li>
    )
}