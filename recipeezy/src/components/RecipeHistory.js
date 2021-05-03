import React, { useState, useEffect } from 'react'
import axios from 'axios';
import SelectedHistoryDetail from './SelectedHistoryDetail'

import { Button, Grid, makeStyles, Card, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    buttonRoot: {
        marginTop: '30px',
        color: '#333',
    },
    cardStyle: {
        maxWidth:'300px'
    },
    recipeHistoryHeader: {
        marginTop: '30px',
        marginBottom: '30px',
        position: 'sticky',
        margin: '0 auto',
        right: 20,
        bottom: 20,
        left: 'auto',
    }
    })



export default function RecipeHistory({token}) {
    const [selectedRecipes, setSelectedRecipes] = useState([])
    const [selectedHistoryDetail, setSelectedHistoryDetail] = useState(false)

    const [loading, setLoading] = useState(false)

    const classes = useStyles()



    const getRecipeHistoryList = () => {
        setLoading(true);
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
                handleGoBack={() => setSelectedHistoryDetail(null)} 
                token={token}
                getRecipeHistoryList={getRecipeHistoryList}
                />

            )
        } else if (loading) {
            return "Loading..."
        } else if (selectedRecipes.length === 0) {
            return "Oops! Looks like there's nothing here yet. Get to Cookin'!"
        } else if (selectedRecipes.length > 0) {
            return (
                selectedRecipes.map((recipe) => (
                
                    <Grid item wrap='wrap' className={classes.cardStyle} key={recipe.id}>
                        <Card variant='outlined' elevation={3} padding={5} key={recipe.id}>
                            <img alt='recipe-pic' src={recipe.img_id}></img>
                            <Typography gutterBottom variant='h6' align='center'>
                            {recipe.title}
                            </Typography>
                            <Typography gutterBottom variant='subtitle1' align='center'>
                                Cuisine: {recipe.origin}
                            </Typography>
                            <Button
                            fullWidth
                            variant='contained'
                            color="primary"
                            size="small"
                            onClick={() => setSelectedHistoryDetail(recipe)}
                            >
                            See more
                            </Button>
                        </Card>
                    </Grid>
                
                ))
            )
        }
    }

    return (
        <>
            <Typography variant='h4' align='center' className={classes.recipeHistoryHeader}>
                Recipe History
            </Typography>
            <Grid container justify='center' spacing={2}>
                {renderContent()}
            </Grid>
        </>
    )
}
