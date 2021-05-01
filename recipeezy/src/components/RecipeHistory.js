import React, { useState, useEffect } from 'react'
import axios from 'axios';
import SelectedHistoryDetail from './SelectedHistoryDetail'
import { Typography } from '@material-ui/core';
import { Card, Grid, makeStyles } from '@material-ui/core';




export default function RecipeHistory({token}) {
    const [selectedRecipes, setSelectedRecipes] = useState([])
    const [selectedHistoryDetail, setSelectedHistoryDetail] = useState(false)
    const [loading, setLoading] = useState(false)


    const getRecipeHistoryList = () => {
        axios.get('https://recipeezy-app.herokuapp.com/recipe_history/', {
            headers: { 'Authorization': `Token ${token}` },
        })
            .then((data) => {
                console.log(data.data[0].recipe_history)
                setSelectedRecipes(data.data[0].recipe_history)
                setLoading(false)
                
            })
    }
    useEffect(() => {
        getRecipeHistoryList()
    }, [])
    
    const renderContent = () => {
        if (selectedHistoryDetail) {
            return (
                <SelectedHistoryDetail recipe={selectedHistoryDetail} 
                handleGoBack={() => setSelectedHistoryDetail(null)} token={token}
                />
            )
        } else if (loading) {
            return "Loading..."
        } else if (selectedRecipes.length === 0) {
            return "Oops! Looks like there's nothing here yet. Get to Cookin'!"
        } else if (selectedRecipes.length > 0) {
            return (
                selectedRecipes.map((recipe) => (
                
                    <li key={recipe.id}>
                        <div key={recipe.id}>
                            <img alt='recipe-pic' src={recipe.img_id}></img>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.origin}</p>
                            <button onClick={() => setSelectedHistoryDetail(recipe)}>See More</button>
                        </div>
                    </li>
                
                ))
            )
        }
    }

    return (
        <>
            
            <h1>Recipe History</h1>
            <Typography variant='h4' align='center' gutterBottom>
                Recipe History
            </Typography>
            <Grid container justify='center' spacing={2}>
                {renderContent()}
            </Grid>
            
            
        </>

    )
}
