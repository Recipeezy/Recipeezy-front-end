import React from 'react'
import pantryData from '../api'


export default function Pantry() {
    
    
    // pantry component needs CRUD capabilities 
    // hardcode ingredients into checkable boxes
    // make checkboxes (ingredients) capped 2-3 (test w/ api to determine what works and what makes the api render null)
    // make a 'Start Plan' button that onClick takes values of checkboxes and sends those ingredients to API useEffect call in RecipeResults.js
    // we're going to need a function that handles the separation of ingredients in the API link (they're separated by commas)


    
    return (
        <div className='pantry-wrapper'>
            <form>
                {pantryData.map((food) => (
                    <li key={food.id}>
                        <input type='checkbox' id={food.item} value={food.item}></input>
                        <label for={food.item}>{food.item}</label>
                    </li>
                )
                )}
            </form>
        </div>
    )
}
