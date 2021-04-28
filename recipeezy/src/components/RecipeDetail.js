import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, IconButton, Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Paper, Card } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import axios from 'axios';

export default function RecipeDetail({ selectedRecipe, handleGoBack, token }) {
    console.log('selected recipe ', selectedRecipe)
    console.log(selectedRecipe.strYoutube.replace('watch?', 'embed/'))

    const [ingredients, setIngredients] = useState([])


    // gets all ingredients and puts in list
    // deletes empty strings to avoid 400 error
    const listIngredients = () => {
        let ingredientsList = []
        for (let i = 1; i < 21; i++) {
            eval('ingredientsList.push(selectedRecipe.strIngredient' + i + ')')
        }
        ingredientsList = ingredientsList.filter(function (ingredient) {
            return ingredient.length > 0
        })
        setIngredients(ingredientsList)

        console.log(ingredientsList)

    }

    // Turns list into a list of objects
    const listToObjects = (list) => {
        let listObjects = list.map(x => {
            let properties = {
                "name": x
            }
            return properties
        })
        console.log("LIST", listObjects)
        return listObjects

    }
    // listToObjects(["Minced Beef", "Olive Oil", "Sesame Seed Burger Buns", "Onion", "Iceberg Lettuce", "Cheese", "Dill Pickles", "Mayonnaise", "White Wine Vinegar", "Pepper", "Mustard", "Onion Salt", "Garlic Powder", "Paprika"])



    //sends request to shoppinglist to add all ingredients
    const addAllIngredients = () => {
        listIngredients()
        if (ingredients) {
            let ingList = listToObjects(ingredients)
            axios.post(
                'https://recipeezy-app.herokuapp.com/shopping_list/add/', {
                ingredients: ingList
            },
                {
                    headers: { Authorization: `Token ${token}` },
                },
            ).then(() => {
                console.log('done')
            })
        }
    }



    return (
        <div>
            <IconButton>
                <ArrowBackIcon
                    gutterBottom
                    onClick={handleGoBack}
                >Go back</ArrowBackIcon>
            </IconButton>
            <Typography gutterBottom variant='h4' align='center'>
                {selectedRecipe.strMeal}
            </Typography>
            <Paper align='center' maxWidth={300}>
                <img align='center' alt="recipe-pic" src={selectedRecipe.strMealThumb} />
                <Typography
                    variant='subtitle1'
                    align="center"
                >Cuisine: {selectedRecipe.strArea}</Typography>
            </Paper>

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
                <div className="add-all-ingredients">
                    <button onClick={addAllIngredients}>Add all Ingredients to Shopping List</button>
                </div>
            </div>
            <div>
                <Typography variant='body1'> Instructions: {selectedRecipe.strInstructions}</Typography>
            </div>
            <Card>
                <CardMedia
                    src={selectedRecipe.strYoutube.replace('watch?v=', 'embed/')}
                    component='iframe'
                    height='400'
                />
            </Card>
        </div>
    )
}

