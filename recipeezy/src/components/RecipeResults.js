import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function RecipeResults() {
    const [recipes, setRecipes] = useState([])

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
          {recipes.meals ? (
              <ul>
                {recipes.meals.map((recipe) => (
                  <li>
                    <p>{recipe.strMeal}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading...</p>
            )}
          </div>
      </div>
    )
}
