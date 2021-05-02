import React from 'react'
import {Typography, Paper, makeStyles, Button, GridList, GridListTile } from '@material-ui/core/'
import { Grid } from '@material-ui/core';
import Pantry from './Pantry';
import SelectedRecipes from './SelectedRecipes';
import RecipeHistory from './RecipeHistory';

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
        horizontalBox: {
            marginTop: '50px',
            overflow: 'scroll',
            flexDirection: 'row',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            width: 'auto',
            height: '500px',
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
            > Search Recipes </Button>
            <Typography variant='h6'></Typography>

        <div >

            <SelectedRecipes isLoggedIn={isLoggedIn} token={token} />  

        </div>

        <Grid className={classes.horizontalBox} >
            <Typography variant='h6'>
                <RecipeHistory isLoggedIn={isLoggedIn} token={token} />
            </Typography>
        </Grid>


        </Grid>
    )
}

