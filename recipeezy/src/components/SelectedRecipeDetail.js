import React, { useState } from 'react'
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
import { Redirect } from 'react-router-dom'


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
    const [cooked, setCooked] = useState(null)
    const [sent, setSent] = useState(false)


    // if (sent) {
    //     return <Redirect to='/selectedrecipes' />
    // }

    const swapToRecipeHistory = () => {
        axios.put(`https://recipeezy-app.herokuapp.com/recipe_history/${recipe.id}/`,
        {
        },
        {
            headers: { Authorization: `Token ${token}` },
        },
    ).then((data) => {
        if(data.data != null) {
            console.log('Swap was successful')
        }
    })
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
        <button onClick={() => { swapToRecipeHistory(recipe.id); setCooked(true); setSent(true)}}>

                            {!sent ? ('Cooked! (send to Recipe History?)'
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