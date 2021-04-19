import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function RecipeResults() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
      axios
        .get('www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata')
        .then((response) => {
        console.log('rendering:',response.data)
          setRecipes(response.data)
        })
    }, [])

    console.log(recipes)

    return (
      <div>
        <h1>Recipeezy</h1>
          <div className='recipe-list'>
              <ul>
                {recipes.map((recipe) => (
                  <li>
                    <p>{recipe.meals.strMeal}</p>
                  </li>
                ))}
              </ul>
          </div>
      </div>
    )
}
