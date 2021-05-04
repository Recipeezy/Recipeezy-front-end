import React, { useState, useEffect } from 'react'
import { Typography, IconButton, Button, makeStyles, Divider } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Paper, Card } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { List } from '@material-ui/core';
import axios from 'axios';
import Confetti from 'react-confetti'
import lodash from 'lodash';

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
    },
    gridListContainer: {
        overflow: 'auto',
    },
    gridList: {
        width: '300px',
        height: '150px',
        margin: '0 auto'
    },
    cookedButton: {
        marginBottom: '20px'
    },
    backButton: {
        marginBottom: '30px'

    }
});


export default function SelectedRecipeDetail({ recipe, handleGoBack, getSelectedRecipesList, token }) {
    console.log('recipe is stupid', recipe)

    const classes = useStyles()
    const [cooked, setCooked] = useState(null)
    const [sent, setSent] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        console.log('component mounted')

        return () => {
            console.log('component unmounted');
            getSelectedRecipesList();
        };
    }, [])

    const swapToRecipeHistory = () => {
        axios.put(`https://recipeezy-app.herokuapp.com/recipe_history/${recipe.id}/`,
            {
            },
            {
                headers: { Authorization: `Token ${token}` },
            },
        )
    }

    // const replaceLinebreak = (recipe) => {
    //     lodash.replace(recipe, 'the', 'shit' )

    // }

    return (
        <Container>
            <Grid className={classes.backButton} align='center'>
                <Button
                    color='secondary'
                    variant='contained'
                    onClick={handleGoBack}
                >Go back</Button>
            </Grid>
            <Grid
                className={classes.root}
                spacing={0}
                direction="row"
                alignItems="center"
                justify="center"
                container>
                <div className={classes.cardDetails}>
                    <Grid item>
                        <img alt='recipe-pic' src={recipe.img_id}></img>
                    </Grid>
                    <Grid item component={Paper}>
                        <Typography
                            variant='subtitle1'
                            align="center"
                        >
                            {recipe.title}
                        </Typography>
                        <Typography gutterBottom align='center' variant='subtitle1'>
                            Cuisine: {recipe.origin}
                        </Typography>
                    </Grid>
                </div>
            </Grid>
            <Grid container className={classes.gridListContainer} align='center'>
                <List className={classes.gridList}>
                    {console.log('stupid shit', recipe.recipe_ingredients)}
                    {recipe.recipe_ingredients.map((item) => (
                        <>
                            <li>{item.measurement} {item.ingredient}</li><Divider style={item.ingredient ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                        </>
                    ))}


                </List>
            </Grid>
            <div>
                <Typography className={classes.subHeader} variant='h5'>
                    Instructions:
            </Typography>
                <Typography
                    variant='body1'
                    dangerouslySetInnerHTML={{ __html: recipe.instructions.replaceAll('.', '. <br/>') }}
                />
            </div>
            <Card className={classes.videoCard}>
                <CardMedia
                    src={recipe.video_id.replace('watch?v=', 'embed/')}
                    component='iframe'
                    height='400'
                />
            </Card>
            <Button
                className={classes.cookedButton}
                fullWidth
                variant='contained'
                color="primary"
                size="small"
                onClick={() => { swapToRecipeHistory(recipe.id); setCooked(true); setSent(true) }}>
                {!sent ? ('Cooked! (send to Recipe History)'
                ) : (
                    'Sent!'
                )}
            </Button>
            {sent ? (
                <Button
                    fullWidth
                    variant='contained'
                    color="primary"
                    size="small"
                    onClick={handleGoBack}>Back to Selected Recipes</Button>
            ) : (
                <p></p>
            )}

            {cooked ? (
                <Confetti />
            ) : (
                <p></p>
            )}
        </Container>
    )
}