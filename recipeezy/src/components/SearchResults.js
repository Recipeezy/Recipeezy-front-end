import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

import RecipeDetail from './RecipeDetail'


function SearchResults() {
    const [recipes, setRecipes] = useState([])
    const [mealIds, setMealIds] = useState([])
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    let location = useLocation()
    let n = []


    useEffect(() => {
        console.log("LOCATION STATE", location.state.search)
        setMealIds(location.state.search)

        const fetchData = (idList) => {
            location.state.search.map((id) => {
                axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                    .then((res) => {
                        if (n.includes(res.data)) {
                            n.splice(n.indexOf(res.data), 1)
                        } else {
                            n.push(res.data)
                        }

                        if (n.length === location.state.search.length) {
                            setRecipes(n)
                        }
                    })
            })
        }

        fetchData(location.state.search)
        // n.length = location.state.search.length
        // setRecipes(n)

    }, [])


    return (
        <div>
            <Link to='/pantry' type='button'>Back to Pantry</Link>
            

            <h1>Search Results for {location.state.item}</h1>
            <h2>RECIPES: {recipes.length}</h2>
            <div>
                {(recipes && recipes.length > 0) ? (
                    <div>
                        {selectedRecipe ? (
                            <RecipeDetail selectedRecipe={selectedRecipe} handleGoBack={() => setSelectedRecipe(null)} />
                        ) : (
                            <div>
                                <ul>
                                    {
                                        recipes.map((recipe) => (
                                            <li key={recipe.meals[0].idMeal}>
                                                <div key={recipe.meals[0].idMeal} id={recipe.meals[0].idMeal}>
                                                    
                                                    <img src={recipe.meals[0].strMealThumb}></img>
                                                    <h4>{recipe.meals[0].strMeal}</h4>
                                                    <h1>{recipe.meals[0].idMeal}</h1>
                                                    <p>Category: {recipe.meals[0].strCategory}</p>
                                                    <p>Origin: {recipe.meals[0].strArea}</p>
                                                    <button onClick={() => setSelectedRecipe(recipe.meals[0])}>See More</button>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <h1>no results</h1>
                )}
            </div>

        </div>
    )
}

export default SearchResults
