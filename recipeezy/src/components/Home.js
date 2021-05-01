import React from 'react'
import {Typography, Paper, makeStyles, Button } from '@material-ui/core/'
import { Grid } from '@material-ui/core';
import Pantry from './Pantry';
import SelectedRecipes from './SelectedRecipes';

const useStyles = makeStyles({
        pantryPaper: {
            width: '100%',
            height: '350px'
        },
        container: {
            justifyItems: 'center'
        },
        header: {
            margin: '0 auto'
        },
    })



export default function Home({ isLoggedIn, logOut, token }) {
    const classes=useStyles();

    return (
    <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.container}>

        <Paper style={{maxHeight: 350, overflow: 'auto' }} className={classes.pantryPaper}>
            <Pantry isLoggedIn={isLoggedIn} token={token}/>
        </Paper>

            <Button
            variant='contained'
            > Start Meal Plan</Button>
            <Typography variant='h6'></Typography>
            <SelectedRecipes isLoggedIn={isLoggedIn} token={token} />   
            <Typography variant='h6'>
                Past Meals
            </Typography>
        </Grid>
    )
}

