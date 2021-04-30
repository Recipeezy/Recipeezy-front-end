import React, { useState, useEffect } from 'react'
import axios from 'axios';

import SelectedRecipeDetail from './SelectedRecipeDetail.js'

import RecipeDetail from './RecipeDetail';
import { Card, Grid, makeStyles } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    cardStyle: {
        maxWidth: '300px'
    }
})



export default function SelectedRecipes({ token }) {
    const [selectedRecipes, setSelectedRecipes] = useState([])
    const [selectedRecipeDetail, setSelectedRecipeDetail] = useState(false)

    const classes = useStyles()

    const getSelectedRecipesList = () => {
        axios.get('https://recipeezy-app.herokuapp.com/selected_recipes/', {
            headers: { 'Authorization': `Token ${token}` },
        })
            .then((data) => {
                console.log('SR data', data.data[0])
                setSelectedRecipes(data.data[0].selected_recipes)
                
            })
    }
    useEffect(() => {
        getSelectedRecipesList()
    }, [])

    
    // if (!selectedRecipes.length) return "nothing";

    return (        


        <>
            <Typography variant='h4' align='center' gutterBottom>
                Selected Recipes
            </Typography>
            <Grid container justify='center' spacing={2}>
            {(selectedRecipes && selectedRecipes.length > 0)  ? (  
                selectedRecipeDetail ? ( 
                    <SelectedRecipeDetail 
                        recipe={selectedRecipeDetail} 
                        handleGoBack={() => setSelectedRecipeDetail(null)} 
                        token={token}
                    />
                ) : (
                    selectedRecipes.map((recipe) => (
                <Grid item wrap='wrap' className={classes.cardStyle}>
                    <Card variant='outlined' key={recipe.id}>
                        <div key={recipe.id}>
                            <img alt='recipe-pic' src={recipe.img_id}></img>
                                <Typography variant='h6'gutterBottom align='center'>
                                    {recipe.title}
                                </Typography>
                                <Typography variant='subtitle1' gutterBottom align='center'>
                                    {recipe.origin}
                                </Typography>
                            <button onClick={() => setSelectedRecipeDetail(recipe)}>See More</button>
                        </div>
                    </Card>
                </Grid>
                    ))
                )
                ) : (
                    <p>Loading...</p>
                )}
            </Grid>
        </>

    )
}
