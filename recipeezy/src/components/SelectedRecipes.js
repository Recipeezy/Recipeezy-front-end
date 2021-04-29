import React, { useState, useEffect } from 'react'
import axios from 'axios';
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
    const [chosenRecipe, setSelectedRecipe] = useState(false)
    const classes = useStyles()
    
        // map over each recipe for preview
        // then do a show more like we have for search results
        // use amy's covid data for reference


    const getSelectedRecipesList = () => {
        axios.get('https://recipeezy-app.herokuapp.com/recipes/', {
            headers: { 'Authorization': `Token ${token}` },
        })
            .then((data) => {
                console.log(data.data)
                setSelectedRecipes(data.data)
                
            })
    }
    useEffect(() => {
        getSelectedRecipesList()
    }, [])
    
    return (        
        <>
            <Typography variant='h4' align='center' gutterBottom>
                Selected Recipes
            </Typography>
            <Grid container justify='center' spacing={2}>
                {selectedRecipes.map((recipe) => (
                <Grid item wrap='wrap' className={classes.cardStyle}>
                    <Card variant='outlined' key={recipe.id}>
                        <div key={recipe.id}>
                            <img alt='recipe-pic' src={recipe.img_id}></img>
                            <Typography
                            variant='h6'
                            gutterBottom
                            align='center'
                            >{recipe.title}</Typography>
                            <Typography
                            variant='subtitle1'
                            gutterBottom
                            align='center'
                            >{recipe.origin}</Typography>
                        </div>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </>
    )
}
