import React from 'react'
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

export default function SelectedRecipeDetail ({ recipe }) {
    const classes = useStyles()

    return (
            <Container>
                <IconButton>
                    {/* <ArrowBackIcon
                        gutterBottom
                        onClick={handleGoBack}
                    >Go back</ArrowBackIcon> */}
                </IconButton>
                <Typography className={classes.mealTitle} variant='h4' align='center'>
                    test title
                </Typography>
    
                <Grid
                    className={classes.root}
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justify="center"
                    container>
                    <div className={classes.cardDetails}>
                        <Grid item >
                            {/* <img align='center' alt="recipe-pic" src={selectedRecipe.strMealThumb} /> */}
                        </Grid>
                        <Grid item component={Paper} className={classes.textContainer}>
                            <Typography
                                variant='subtitle1'
                                align="center"
                            >Cuisine: seelected recipe</Typography>
                            <Typography align='center' variant='subtitle1'>Category: category </Typography>
                        </Grid>
                    </div>
                </Grid>
    
                <div>
                    <ul className='ingredient-list'>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                        <li>in gred</li>
                    </ul>
    
                        
                    
    
                </div>
                <div>
                    <Typography className={classes.subHeader} variant='h5'>
                        Instructions:
                    </Typography>
                    <Typography variant='body1'>Instructions</Typography>
                </div>
                {/* <Card className={classes.videoCard}> */}
                    {/* <CardMedia
                        // width="100%"
                        src={selectedRecipe.strYoutube.replace('watch?v=', 'embed/')}
                        component='iframe'
                        height='400'
                    />
                </Card> */}
            </Container >
    
        )
    }