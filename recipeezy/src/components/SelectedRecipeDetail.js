import React, { useState, useEffect } from 'react'
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
import Confetti from 'react-confetti'

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

export default function SelectedRecipeDetail ({ recipe, handleGoBack, getSelectedRecipesList, token }) {
    console.log('recipe is stupid', recipe)
    const classes = useStyles()    
    const [cooked, setCooked] = useState(null)
    const [sent, setSent] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
        }, []);

    useEffect(() => {
        console.log('component mounted')
    
        return () => {
            console.log('component unmounted');
            getSelectedRecipesList();
        };
    }, [])

    const swapToRecipeHistory = () => {
        axios.put(`https://recipeezy-app.herokuapp.com/recipe_history/${recipe.id}/`,
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
                {console.log('stupid shit', recipe.recipe_ingredients)}
                {recipe.recipe_ingredients.map((item) => (
                    <li>{item.ingredient}</li>
                ))}
                
                
            </ul>
            <p>{recipe.instructions}</p>
            <p>{recipe.video_id}</p>
        </div>
        <button onClick={() => { swapToRecipeHistory(recipe.id); setCooked(true); setSent(true)}}>

                            {!sent ? ('Cooked! (send to Recipe History)'
                            ) : (
                                'Sent!'
                            )}
                            </button>
                            {sent ? (
                                <button onClick={handleGoBack}>Back to Selected Recipes</button>
                            ) : (
                                <p></p>
                            )}

        {cooked ? (
            <Confetti />
            ) : (
                <p></p>
            )}
    </>
    
        )
    }