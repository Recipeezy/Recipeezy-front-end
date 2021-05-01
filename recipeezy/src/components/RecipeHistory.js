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
    }
    })


export default function RecipeHistory({token}) {
    const [selectedRecipes, setSelectedRecipes] = useState([])
    const [selectedHistoryDetail, setSelectedHistoryDetail] = useState(false)
    const classes = useStyles()


    const getRecipeHistoryList = () => {
        axios.get('https://recipeezy-app.herokuapp.com/recipe_history/', {
            headers: { 'Authorization': `Token ${token}` },
        })
            .then((data) => {
                console.log(data.data[0].recipe_history)
                setSelectedRecipes(data.data[0].recipe_history)
                
            })
    }
    useEffect(() => {
        getRecipeHistoryList()
    }, [])



    return (
        <>
            
            <Typography align='center' variant='h3' color='secondary' gutterBottom>
                Recipe History
            </Typography>
            {selectedHistoryDetail ? ( 
                <SelectedHistoryDetail recipe={selectedHistoryDetail} 
                handleGoBack={() => setSelectedHistoryDetail(null)} 
                token={token}
                getRecipeHistoryList={getRecipeHistoryList}
                />
            ) : (
                <Grid container justify='center' spacing={2} className='recipe-list'>
                {selectedRecipes.map((recipe) => (
                    <Grid item wrap='wrap' className={classes.cardStyle} key={recipe.id} elevation={3} padding={5}>
                        <Card variant='outlined' key={recipe.id}>
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
                            onClick={() => setSelectedHistoryDetail(recipe)}>See More</Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            )}
        </>
    )
}
