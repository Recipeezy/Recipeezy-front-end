import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, IconButton, Button, makeStyles } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Paper, Card } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles({
    videoCard: {
        minWidth: '150px'
    },
    mealTitle: {
        marginBottom: '50px'
    },
    cardDetails: {
        width: '300px',
        alignItems: 'center'
    },
    textContainer: {
        justifyContent: 'center',
        margin: '0 auto'
    },
    img: {
        width: '50%'
    },
    list: {
        alignItems: 'center'
    },
    subHeader: {
        paddingLeft: '15px',
        marginTop: '30px'
    }
});

export default function SelectedRecipeDetail ({ recipe, handleGoBack, token }) {
    console.log('recipe is stupid', recipe)
    const classes = useStyles()


    const swapToSelectedRecipes = () => {
        axios.put(`https://recipeezy-app.herokuapp.com/selected_recipes/${recipe.id}/`,
        {
        },
        {
            headers: { Authorization: `Token ${token}` },
        },
    )
}



    return (
    <>
    <IconButton>
                <ArrowBackIcon
                    gutterBottom
                    onClick={handleGoBack}
                >Go back</ArrowBackIcon>
            </IconButton>
        <div>
            <img src={recipe.img_id}></img>
            <h1>{recipe.title}</h1>
            <p>Cuisine: {recipe.origin}</p>

        </div>
        <div>
            <ul>
                <li>{recipe.recipe_ingredients}</li>
                
            </ul>
            <p>{recipe.instructions}</p>
            <p>{recipe.video_id}</p>
        </div>
        <button onClick={() => swapToSelectedRecipes(recipe.id)}>Cook it again! (sends back to Selected Recipes) </button>
    </>
    
        )
    }