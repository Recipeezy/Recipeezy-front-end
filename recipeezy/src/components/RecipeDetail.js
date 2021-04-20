import React from 'react'
import { Link } from 'react-router-dom'

export default function RecipeDetail({selectedRecipe, handleGoBack}) {
    console.log('selected recipe ', selectedRecipe)
    return (
        <div>
            <button
            onClick={handleGoBack}
            >Go back</button>
            <h1>{selectedRecipe.strMeal}</h1>
            <img alt="recipe-pic" src={selectedRecipe.strMealThumb} />
            <p>Origin: {selectedRecipe.strArea}</p>
            <p>Category: {selectedRecipe.strCategory}</p>
            <div>
                <ul className='ingredient-list'>
                    <li>{selectedRecipe.strIngredient1}</li>
                    <li>{selectedRecipe.strIngredient2}</li>
                    <li>{selectedRecipe.strIngredient3}</li>
                    <li>{selectedRecipe.strIngredient4}</li>
                    <li>{selectedRecipe.strIngredient5}</li>
                    <li>{selectedRecipe.strIngredient6}</li>
                    <li>{selectedRecipe.strIngredient7}</li>
                    <li>{selectedRecipe.strIngredient8}</li>
                    <li>{selectedRecipe.strIngredient9}</li>
                    <li>{selectedRecipe.strIngredient10}</li>
                    <li>{selectedRecipe.strIngredient11}</li>
                    <li>{selectedRecipe.strIngredient12}</li>
                    <li>{selectedRecipe.strIngredient13}</li>
                    <li>{selectedRecipe.strIngredient14}</li>
                    <li>{selectedRecipe.strIngredient15}</li>
                    <li>{selectedRecipe.strIngredient16}</li>
                    <li>{selectedRecipe.strIngredient17}</li>
                    <li>{selectedRecipe.strIngredient18}</li>
                    <li>{selectedRecipe.strIngredient19}</li>
                    <li>{selectedRecipe.strIngredient20}</li>
                </ul>
            </div>
            <p>Youtube tutorial: <a href={selectedRecipe.strYoutube}>{selectedRecipe.strYoutube}</a></p>
            <p> Instructions: {selectedRecipe.strInstructions}</p>
        </div>
    )
}
