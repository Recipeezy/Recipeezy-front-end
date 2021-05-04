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
            marginTop: '60px',
            overflowY: 'scroll',
            overflowX: 'hidden',
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
            <Paper className={classes.pantryPaper}>
                <Pantry isLoggedIn={isLoggedIn} token={token}/>
            </Paper>
            <Grid>
                <Typography variant='h6'>
                    <SelectedRecipes isLoggedIn={isLoggedIn} token={token} />  
                </Typography>
            </Grid>
            <Grid style={{marginBottom:'50px'}} className={classes.horizontalBox}  >
                <Typography variant='h6'>
                    <RecipeHistory isLoggedIn={isLoggedIn} token={token} />
                </Typography>
            </Grid>
        </Grid>
    )
}

