import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typography, IconButton, Button, makeStyles, Divider } from '@material-ui/core'
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
    },
    gridListContainer: {
        // display:'flex',
        // flexWrap:'wrap',
        overflow: 'auto',
        // justifyContent:'center'
    },
    gridList: {
        width:'300px',
        height: '200px',
        margin: '0 auto'
    }
});


export default function RecipeDetail({ selectedRecipe, handleGoBack, token }) {
    console.log('selected recipe ', selectedRecipe)
    console.log(selectedRecipe.strYoutube.replace('watch?', 'embed/'))
    const classes = useStyles()

    const [ingredients, setIngredients] = useState([])

    const recipeTitle = selectedRecipe.strMeal 
    const recipeImg = selectedRecipe.strMealThumb
    const recipeCuisine = selectedRecipe.strArea
    const recipeInstruc = selectedRecipe.strInstructions
    const recipeVideo = selectedRecipe.strYoutube


    // gets all ingredients and puts in list
    // deletes empty strings to avoid 400 error
    const listIngredients = () => {
        let ingredientsList = []
        for (let i = 1; i < 21; i++) {
            eval('ingredientsList.push(selectedRecipe.strIngredient' + i + ')')
        }
        if (ingredientsList.length > 0) {
            let newingredientsList = ingredientsList.filter(function (ingredient) {
                return (ingredient && ingredient.length > 0)
            })
            setIngredients(newingredientsList)

        }

        console.log(ingredientsList)

    }

    // Turns list into a list of objects
    const listToObjects = (list) => {
        let listObjects = list.map(x => {
            let properties = {
                "name": x
            }
            return properties
        })
        console.log("LIST", listObjects)
        return listObjects

    }



    const addSelectedRecipe = () => {
        listIngredients()
        if(ingredients.length > 0) {
            let ingList = listToObjects(ingredients)
            axios.post(
                'https://recipeezy-app.herokuapp.com/recipes/',
                {
                    title: recipeTitle,
                    origin: recipeCuisine,
                    instructions: recipeInstruc,
                    img_id: recipeImg,
                    video_id: recipeVideo,
                    ingredients: ingList
                },
                    {
                        headers: { Authorization: `Token ${token}` },
                    },
                ).then(() => {
                    console.log('done')
                })
        }        
    }


    //sends request to shoppinglist to add all ingredients
    const addAllIngredients = () => {
        listIngredients()
        console.log('toke', token)
        if (ingredients && ingredients.length > 0) {
            let ingList = listToObjects(ingredients)
            axios.post(
                'https://recipeezy-app.herokuapp.com/shopping_list/', {
                ingredients: ingList
            },
                {
                    headers: { Authorization: `Token ${token}` },
                },
            ).then(() => {
                document.querySelector('.add-ing-button').innerHTML = "ADDED SUCCESSFULLY"
                setTimeout(() => {
                    document.querySelector('.add-ing-button').innerHTML = "Add All Ingredients to Shopping List"
                }, 1500) })
        }
    }

    useEffect(() => {
        listIngredients()
    }, [])


    return (
        <Container>
            <IconButton>
                <ArrowBackIcon
                    gutterBottom
                    onClick={handleGoBack}
                >Go back</ArrowBackIcon>
            </IconButton>
            <Typography className={classes.mealTitle} variant='h4' align='center'>
                {selectedRecipe.strMeal}
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
                        <img align='center' alt="recipe-pic" src={selectedRecipe.strMealThumb} />
                    </Grid>
                    <Grid item component={Paper} className={classes.textContainer}>
                        <Typography
                            variant='subtitle1'
                            align="center"
                        >Cuisine: {selectedRecipe.strArea}</Typography>
                        <Typography gutterBottom align='center' variant='subtitle1'>Category: {selectedRecipe.strCategory}</Typography>
                    </Grid>
                </div>
            </Grid>


            <Grid container className={classes.gridListContainer} align='center'>
                <List className={classes.gridList}>
                    <li>{selectedRecipe.strIngredient1}</li><Divider style={selectedRecipe.strIngredient1 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient2}</li><Divider style={selectedRecipe.strIngredient2 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient3}</li><Divider style={selectedRecipe.strIngredient3 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient4}</li><Divider style={selectedRecipe.strIngredient4 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient5}</li><Divider style={selectedRecipe.strIngredient5 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient6}</li><Divider style={selectedRecipe.strIngredient6 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient7}</li><Divider style={selectedRecipe.strIngredient7 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient8}</li><Divider style={selectedRecipe.strIngredient8 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient9}</li><Divider style={selectedRecipe.strIngredient9 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient10}</li><Divider style={selectedRecipe.strIngredient10 ? {} : {display:'none'} }  variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient11}</li><Divider style={selectedRecipe.strIngredient11 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient12}</li><Divider style={selectedRecipe.strIngredient12 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient13}</li><Divider style={selectedRecipe.strIngredient13 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient14}</li><Divider style={selectedRecipe.strIngredient14 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient15}</li><Divider style={selectedRecipe.strIngredient15 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient16}</li><Divider style={selectedRecipe.strIngredient16 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient17}</li><Divider style={selectedRecipe.strIngredient17 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient18}</li><Divider style={selectedRecipe.strIngredient18 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient19}</li><Divider style={selectedRecipe.strIngredient19 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strIngredient20}</li><Divider style={selectedRecipe.strIngredient20 ? {} : {display:'none'} } variant='fullWidth' component="li" />
                </List>
            </Grid>
                <Grid align='center' className="add-all-ingredients">
                    <Button 
                    style={{marginTop:'15px', marginBottom: '15px'}} 
                    variant='contained' 
                    color='primary' 
                    onClick={addAllIngredients}>
                        Add all Ingredients to Shopping List
                    </Button>

                    <Button
                    className="add-ing-button"
                    variant='contained' color='primary'
                    onClick={addSelectedRecipe}>
                        Select Recipe
                    </Button>
                </Grid>



            <div>
                <Typography className={classes.subHeader} variant='h5'>
                    Instructions:
                </Typography>
                <Typography variant='body1'>{selectedRecipe.strInstructions}</Typography>
            </div>
            <Card className={classes.videoCard}>
                <CardMedia
                    // width="100%"
                    src={selectedRecipe.strYoutube.replace('watch?v=', 'embed/')}
                    component='iframe'
                    height='400'
                />
            </Card>
        </Container >

    )
}
