import React from 'react'
import { Link } from 'react-router-dom'
import {Typography, Paper, makeStyles, Button, Container} from '@material-ui/core/'
import { Grid } from '@material-ui/core';
import Pantry from './Pantry.js'

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
        }
    })



export default function Home({ isLoggedIn, logOut }) {
    const classes=useStyles();

    return (
    <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.container}>

        <Typography className={classes.header} variant='h5'>
            Home Page
        </Typography>

        <Paper style={{maxHeight: 350, overflow: 'auto' }} className={classes.pantryPaper}>
            <Typography>
                Pantry
            </Typography>
        </Paper>

            <Button
            variant='contained'
            > Search Recipes</Button>
            <Typography variant='h6'>
                Selected Recipes
            </Typography>
            <Typography variant='h6'>
                Past Meals
            </Typography>
        </Grid>
    )
}

