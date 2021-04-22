import React, { useState, useEffect } from 'react'
import { pantryData } from '../api'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
// import { getPantryData } from '../api'


export default function Pantry() {
    // 1. pantry component needs CRUD capabilities 
    // 2. hardcode ingredients into checkable boxes
    // 3. make checkboxes (ingredients) capped 2-3 (test w/ api to determine what works and what makes the api render null)
    // 4. make a 'Start Plan' button that onClick takes values of checkboxes and sends those ingredients to API useEffect call in RecipeResults.js
    // 5. we're going to need a function that handles the separation of ingredients in the API link (they're separated by commas)


    const [foodList, setFoodList] = useState([])
    const [name, setName] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [selectedID, setSelectedID] = useState(null)
    const token='9600235d3622575ff38d185b19a319d8c288a59b'
    


    // get request to set foodList 
    useEffect(() => {
        axios
        .get('http://recipeezy-app.herokuapp.com/ingredients/', {
            headers: {

            },
        })
        .then((data) => {
            setFoodList(data.data)
            console.log('foodList', foodList)
        })
    }, [isEditing])
    
        



    // post request to add an ingredient to the Pantry
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .post(
            'http://recipeezy-app.herokuapp.com/ingredients/',
            {
                name: name
            },
            {
                headers: { Authorization: `Token ${token}` },
            },
        )
        .then((data) => {
            // handleDone(data.data)
        })
    }

    // delete request to delete ingredient from Pantry
    const deleteIngredient = (id, event) => {
        axios
            .delete(`http://recipeezy-app.herokuapp.com/ingredients/${id}`,
            {
                headers: { Authorization: `Token ${token}` },
            }
            )
            .then((response) => {
                console.log('deleted', response)
                if(response.data != null) {
                    event.target.parentElement.remove()
                    // setDeleted(true)
            }
        },
    )}
    
    const editIngredient = (id, event) => {
        event.preventDefault()
        axios
        .put(
            `http://recipeezy-app.herokuapp.com/ingredients/${id}`,
            {
                name: name
            },
            {
                headers: { Authorization: `Token ${token}` },
            },
            )
        }



    return (
        <div className='pantry-wrapper'>
            <h1>Pantry</h1>
            <Link to='/' type='button'>home</Link>
            <form onSubmit={handleSubmit}>
                {/* post request happening every time form is submitted because of above */}
                {foodList.map((food) => (
                    <li key={food.id}>
                        <input type='checkbox' id={food.item} value={food.item}></input>
                        {isEditing && selectedID ===food.id ? <button onClick={(event) => setIsEditing(false)} 
                        value={food.id}>Submit Edit</button> : <label htmlFor={food.name}>{food.name}</label>}
                        <button onClick={(event) => deleteIngredient(food.id, event)}>Delete Item</button>
                        <button onClick={(event) =>{setSelectedID(event.target.value); setIsEditing(true)}} value={food.id}>Edit Item</button>
                    </li>
                )
                )}
                <div>
                    {/* add form wrap */}
                    <label htmlFor='ingredient-name'></label>
                    <input
                        id='ingredient-name'
                        type='text'
                        placeholder='Add Ingredient'
                        onChange={(event) => setName(event.target.value)}
                    ></input>

                </div>
                <div className='btn'>
                <button
                    className='submit-btn'
                    type="submit"
                >Add</button>
        </div>
                
            </form>
        </div>
    )
}

