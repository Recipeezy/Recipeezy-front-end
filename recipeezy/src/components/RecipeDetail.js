import React, { useState, useEffect } from 'react'
import { Typography, IconButton, Button, makeStyles, Divider } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Paper, Card } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { List } from '@material-ui/core';
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
    },
    backButton: {
        "&:hover": {
            background: "#fcf5c7"
        }
    },
});


export default function RecipeDetail({ selectedRecipe, handleGoBack, token }) {
    console.log(selectedRecipe.strYoutube.replace('watch?', 'embed/'))
    const classes = useStyles()
    const [ingredients, setIngredients] = useState([])
    const [selected, setSelected] = useState(false)
    const [added, setAdded] = useState(false)
    const recipeTitle = selectedRecipe.strMeal
    const recipeImg = selectedRecipe.strMealThumb
    const recipeCuisine = selectedRecipe.strArea
    const recipeInstruc = selectedRecipe.strInstructions
    const recipeVideo = selectedRecipe.strYoutube
    const [measurements, setMeasurements] = useState([])


    
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

        
        let measureList = []
        for (let i = 1; i < 21; i++) {
            eval('measureList.push(selectedRecipe.strMeasure' + i + ')')
        }
        if (measureList.length > 0) {
            let newMeasureList = measureList.filter(function (measure) {
                return (measure && measure.length > 0)
            })
            setMeasurements(newMeasureList)
        }
    }
    const listMeasurements = () => {
        let measureList = []
        for (let i = 1; i < 21; i++) {
            eval('measureList.push(selectedRecipe.strMeasure' + i + ')')
        }
        if (measureList.length > 0) {
            let newMeasureList = measureList.filter(function (measure) {
                return (measure && measure.length > 0)
            })
            setMeasurements(newMeasureList)
        }
    }

    const listToObjectsMeasure = (list) => {
        let listObjects = list.map(x => {
            let properties = {
                "measurement": x
            }
            return properties
        })
        console.log("Measure LIST", listObjects)
        return listObjects

    }

    
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

    const combineObjects = (obj1, obj2) => {
        return obj1.map((item, x) => Object.assign({}, item, obj2[x]))
    }


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const addSelectedRecipe = () => {
        listIngredients()
        // listMeasurements()
        if (ingredients.length > 0 || measurements.length > 0) {
            console.log("measure", measurements)
            let ingList = listToObjects(ingredients)
            let mesList = listToObjectsMeasure(measurements)
            let ingAndMes = combineObjects(ingList, mesList)
            axios.post(
                'https://recipeezy-app.herokuapp.com/recipes/',
                {
                    title: recipeTitle,
                    origin: recipeCuisine,
                    instructions: recipeInstruc,
                    img_id: recipeImg,
                    video_id: recipeVideo,
                    ingredients: ingAndMes,
                    category: selectedRecipe.strCategory
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
            )
        }
    }

    useEffect(() => {
        listIngredients()
    }, [])


    return (
        <Container>
            <Grid align='center'>
                <Button
                    style={{marginBottom: 30, color: '#004e64'}}
                    color='secondary'
                    variant='contained'
                    onClick={handleGoBack}
                >Go back</Button>
                <Typography className={classes.mealTitle} variant='h6' align='center'>
                    {selectedRecipe.strMeal}
                </Typography>
            </Grid>

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
                        {/* <Typography gutterBottom align='center' variant='subtitle1'>Category: {selectedRecipe.strCategory}</Typography> */}
                    </Grid>
                </div>
            </Grid>


            <Grid container className={classes.gridListContainer} align='center'>
                <List className={classes.gridList}>
                    <li>{selectedRecipe.strMeasure1} {selectedRecipe.strIngredient1}</li><Divider style={selectedRecipe.strIngredient1 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure2} {selectedRecipe.strIngredient2}</li><Divider style={selectedRecipe.strIngredient2 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure3} {selectedRecipe.strIngredient3}</li><Divider style={selectedRecipe.strIngredient3 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure4} {selectedRecipe.strIngredient4}</li><Divider style={selectedRecipe.strIngredient4 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure5} {selectedRecipe.strIngredient5}</li><Divider style={selectedRecipe.strIngredient5 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure6} {selectedRecipe.strIngredient6}</li><Divider style={selectedRecipe.strIngredient6 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure7} {selectedRecipe.strIngredient7}</li><Divider style={selectedRecipe.strIngredient7 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure8} {selectedRecipe.strIngredient8}</li><Divider style={selectedRecipe.strIngredient8 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure9} {selectedRecipe.strIngredient9}</li><Divider style={selectedRecipe.strIngredient9 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure10} {selectedRecipe.strIngredient10}</li><Divider style={selectedRecipe.strIngredient10 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure11} {selectedRecipe.strIngredient11}</li><Divider style={selectedRecipe.strIngredient11 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure12} {selectedRecipe.strIngredient12}</li><Divider style={selectedRecipe.strIngredient12 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure13} {selectedRecipe.strIngredient13}</li><Divider style={selectedRecipe.strIngredient13 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure14} {selectedRecipe.strIngredient14}</li><Divider style={selectedRecipe.strIngredient14 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure15} {selectedRecipe.strIngredient15}</li><Divider style={selectedRecipe.strIngredient15 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure16} {selectedRecipe.strIngredient16}</li><Divider style={selectedRecipe.strIngredient16 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure17} {selectedRecipe.strIngredient17}</li><Divider style={selectedRecipe.strIngredient17 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure18} {selectedRecipe.strIngredient18}</li><Divider style={selectedRecipe.strIngredient18 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure19} {selectedRecipe.strIngredient19}</li><Divider style={selectedRecipe.strIngredient19 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                    <li>{selectedRecipe.strMeasure20} {selectedRecipe.strIngredient20}</li><Divider style={selectedRecipe.strIngredient20 ? {} : { display: 'none' }} variant='fullWidth' component="li" />
                </List>
            </Grid>

            <Grid align='center' className="add-all-ingredients">
                {!selected ? (
                    <Button
                        className="add-ing-button" style={{ color: '#004e64'}}
                        variant='contained' color='secondary'
                        onClick={() => { addSelectedRecipe(); setSelected(true) }}>
                        Select Recipe
                    </Button>
                ) : (
                    <Button
                        style={{ marginTop: '15px', marginBottom: '15px', color: '#004e64' }}
                        variant='contained'
                        color='secondary'
                        onClick={() => { addAllIngredients(); setAdded(true) }}>

                        {!added ? (
                            'Add all Ingredients to Shopping List'
                        ) : (
                            'Ingredients Added!'
                        )}
                    </Button>
                )}
            </Grid>

            <div>
                <Typography className={classes.subHeader} variant='h5'>
                    Instructions:
                </Typography>
                
                <Typography variant='body1'
                dangerouslySetInnerHTML={{__html: selectedRecipe.strInstructions.replaceAll('.','. <br/>')}}></Typography>
            </div>
            <Card className={classes.videoCard}>
                <CardMedia
                    src={selectedRecipe.strYoutube.replace('watch?v=', 'embed/')}
                    component='iframe'
                    height='400'
                />
            </Card>
        </Container >

    )
}
