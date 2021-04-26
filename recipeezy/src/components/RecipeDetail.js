import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, IconButton, Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Paper } from '@material-ui/core';

export default function RecipeDetail({selectedRecipe, handleGoBack}) {
    console.log('selected recipe ', selectedRecipe)
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
            </Paper>
            <Typography
            variant='subtitle1'
            align="center"
            >Cuisine: {selectedRecipe.strArea}</Typography>
            <Typography align='center' variant='subtitle1'>Category: {selectedRecipe.strCategory}</Typography>
            <Typography gutterBottom align='center' variant='subtitle1'>Youtube tutorial: <a href={selectedRecipe.strYoutube}>{selectedRecipe.strYoutube}</a></Typography>
            <Paper elevation={3} align='center'>
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
            </Paper>
            <Paper elevation={3}>
                <Typography variant='body1'> Instructions: {selectedRecipe.strInstructions}</Typography>
            </Paper>
        </div>
    )
}
