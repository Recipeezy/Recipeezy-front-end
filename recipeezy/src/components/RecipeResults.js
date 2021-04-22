import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RecipeDetail from './RecipeDetail'
import { Link } from 'react-router-dom'


export default function RecipeResults() {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(false)

  // function handleGoBack={() => setSelectedRecipe(null)}



  useEffect(() => {
    axios
      .get('https://www.themealdb.com/api/json/v2/9973533/randomselection.php?key=value')
      .then((response) => {

        setRecipes(response.data)
      })
  }, [])

  console.log('recipes is ', recipes)

  return (
    <div>
      <h1>Recipeezy</h1>
      <Link to='/' type='button'>home</Link>
      <div className='recipe-list'>
        <>
          {recipes.meals ? (
            <div>
              {selectedRecipe ? (
                <RecipeDetail
                  selectedRecipe={selectedRecipe}
                  handleGoBack={() => setSelectedRecipe(null)}
                />
              ) : (
                <ul>
                  {recipes.meals.map((recipe) => (
                    <li key={recipe.idMeal}>
                      <div className="recipe-card">
                        <img alt="recipe-pic" src={recipe.strMealThumb} />
                        <h4>{recipe.strMeal}</h4>
                        <p>Category: {recipe.strCategory}</p>
                        <p>Origin: {recipe.strArea}</p>
                        <button
                          onClick={() => setSelectedRecipe(recipe)}
                        >
                          See more
                          </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </>
      </div>
    </div>
  )
}
