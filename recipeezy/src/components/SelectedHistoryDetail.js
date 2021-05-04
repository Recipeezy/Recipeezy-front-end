import { React, useEffect, useState } from 'react'
import { Typography, IconButton, Button, makeStyles, Divider, Card, CardMedia, Grid, List, Paper } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
    },
    gridListContainer: {
        overflow: 'auto',
    },
    gridList: {
        width: '300px',
        height: '150px',
        margin: '0 auto'
    }
});

export default function SelectedRecipeDetail({ recipe, handleGoBack, token, getRecipeHistoryList }) {
    const [sent, setSent] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const swapToSelectedRecipes = () => {
        axios.put(`https://recipeezy-app.herokuapp.com/selected_recipes/${recipe.id}/`,
            {
            },
            {
                headers: { Authorization: `Token ${token}` },
            },
        )
    }

    useEffect(() => {
        console.log('component mounted')

        return () => {
            console.log('component unmounted');
            getRecipeHistoryList();
        };
    }, [])

    return (
        <>
            <Grid style={{marginBottom:'30px'}} align='center'>
                <Button
                    style={{color:'#187B8B'}}
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
                <div>
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
                {recipe.recipe_ingredients ? (
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
                ) : (
                    <></>
                )}
                <div>
                    <Typography className={classes.subHeader} variant='h5'>
                        Instructions:
                    </Typography>

            <Typography 
                variant='body1'
                dangerouslySetInnerHTML={{__html: recipe.instructions.replaceAll('.','. <br/>')}}> 
            </Typography>
        </div>
        <Card className={classes.videoCard}>
            <CardMedia
                src={recipe.video_id.replace('watch?v=', 'embed/')}
                component='iframe'
                height='400'
            />
        </Card>
        
        
        
        <Button fullWidth
        color='primary' variant='contained'
        onClick={() => {swapToSelectedRecipes(recipe.id); setSent(true)}}>
        
        {!sent ? ('Cook it again! (send back to Selected Meals)'
                            ) : (
                                'Sent!'
                            )}</Button>
                            {sent ? (
                                <Button fullWidth
                                color='primary' variant='contained' onClick={handleGoBack}>Back to Recipe History</Button>
                            ) : (
                                <p></p>
                            )}
    </Grid>
    </>
    
        )
    }

