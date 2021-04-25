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
        for (let id of location.state.search) {
            console.log("ID", id)
            axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                .then((res) => {
                    if (n.includes(res.data)) {
                        n.splice(n.indexOf(res.data), 1)
                    } else {
                        n.push(res.data)
                    }
                    setRecipes(n)
                    console.log("DATA", res.data)
                })
        }
        // n.length = location.state.search.length
        // setRecipes(n)
        console.log("RECIPES!", recipes)

    }, [])


    return (
        <div>
            <Link to='/pantry' type='button'>Back to Pantry</Link>
            <button onClick={() => window.location.reload(false)}>Click to Reload</button>

            <h1>Search Results for {location.state.item}</h1>
            <div>
                {(recipes && recipes.length > 0) ? (
                    <div>
                        {selectedRecipe ? (
                            <RecipeDetail selectedRecipe={selectedRecipe} handleGoBack={() => setSelectedRecipe(null)} />
                        ) : (
                            <div>
                                {
                                    recipes.map((recipe) => (
                                        <div id={recipe.meals[0].idMeal}>
                                            {console.log(recipe.meals[0].strYoutube)}
                                            <img src={recipe.meals[0].strMealThumb}></img>
                                            <h4>{recipe.meals[0].strMeal}</h4>
                                            <h1>{recipe.meals[0].idMeal}</h1>
                                            <p>Category: {recipe.meals[0].strCategory}</p>
                                            <p>Origin: {recipe.meals[0].strArea}</p>
                                            <button onClick={() => setSelectedRecipe(recipe.meals[0])}>See More</button>
                                        </div>
                                    ))
                                }
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
