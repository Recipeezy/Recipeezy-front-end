import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RecipeDetail from './RecipeDetail'


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
                        <p>{recipe.strMeal}</p>
                        <button
                        onClick={() => setSelectedRecipe(recipe)}
                        >
                          {recipe.strMeal}
                        </button>
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
