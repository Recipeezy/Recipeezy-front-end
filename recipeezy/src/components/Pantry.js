import React, { useState, useEffect } from 'react'
import { pantryData } from '../api'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import { getPantryData } from '../api'


export default function Pantry() {
    // pantry component needs CRUD capabilities 
    // hardcode ingredients into checkable boxes
    // make checkboxes (ingredients) capped 2-3 (test w/ api to determine what works and what makes the api render null)
    // make a 'Start Plan' button that onClick takes values of checkboxes and sends those ingredients to API useEffect call in RecipeResults.js
    // we're going to need a function that handles the separation of ingredients in the API link (they're separated by commas)
    const [foodList, setFoodList] = useState([])
    // const [submitted, setSubmitted] = useState(false)
    const [name, setName] = useState('')
    


    
    useEffect(() => {
        axios
          .get('http://recipeezy-app.herokuapp.com/ingredients/', {
            headers: {

            },
          })
          .then((data) => {
            setFoodList(data.data)
            
          })
      }, [])
    
    console.log('foodList', foodList)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
          .post(
            'https://recipeezy-app.herokuapp.com/ingredients/',
            {
                name: name
            },
          )
          .then((data) => {
            // handleDone(data.data)
          })
      }

     return (
        <div className='pantry-wrapper'>
            <h1>Pantry</h1>
            <Link to='/' type='button'>home</Link>
            <form onSubmit={handleSubmit}>
                {foodList.map((food) => (
                    <li key={food.id}>
                        <input type='checkbox' id={food.item} value={food.item}></input>
                        <label htmlFor={food.name}>{food.name}</label>
                    </li>
                )
                )}
                <div>
                    <label htmlFor='ingredient-name'></label>
                    <input
                        id='ingredient-name'
                        type='text'
                        placeholder='Add Ingredient'
                        onChange={(event) => setName(event.target.value)}
                    ></input>

                </div>
                <div class='btn'>
                <button
                    className='submit-btn'
                    type="submit"
                >Add</button>
        </div>
                
            </form>
        </div>
    )
}
