import React, { useState, useEffect } from 'react'
import axios from 'axios';
import RecipeDetail from './RecipeDetail';


export default function SelectedRecipes({ token }) {
    const [selectedRecipes, setSelectedRecipes] = useState([])
    const [chosenRecipe, setSelectedRecipe] = useState(false)
    
        // map over each recipe for preview
        // then do a show more like we have for search results
        // use amy's covid data for reference


    const getSelectedRecipesList = () => {
        axios.get('https://recipeezy-app.herokuapp.com/recipes/', {
            headers: { 'Authorization': `Token ${token}` },
        })
            .then((data) => {
                console.log(data.data)
                setSelectedRecipes(data.data)
                
            })
    }
    useEffect(() => {
        getSelectedRecipesList()
    }, [])
    
    return (        
        <div>
            <h3>Selected recipes</h3>

            {selectedRecipes.map((recipe) => (
                <li key={recipe.id}>
                    <div key={recipe.id}>
                        <img src={recipe.img_id}></img>
                        <h4>{recipe.title}</h4>
                        <p>{recipe.origin}</p>
                    </div>
                </li>
            ))}
        </div>
    )
}
