import { Button, IconButton } from '@material-ui/core'
import { Card, Grid, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import RecipeDetail from './RecipeDetail'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles({
    cardStyle: {
        maxWidth:'300px'
    }
    })


function SearchResults() {
    const [recipes, setRecipes] = useState([])
    const [mealIds, setMealIds] = useState([])
    const classes = useStyles()
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    let location = useLocation()
    let n = []


    useEffect(() => {
        console.log("LOCATION STATE", location.state.search)
        setMealIds(location.state.search)

        const fetchData = (idList) => {
            location.state.search.map((id) => {
                axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                    .then((res) => {
                        if (n.includes(res.data)) {
                            n.splice(n.indexOf(res.data), 1)
                        } else {
                            n.push(res.data)
                        }

                        if (n.length === location.state.search.length) {
                            setRecipes(n)
                        }
                    })
            })
        }

        fetchData(location.state.search)

    }, [])


    return (
        <div>
            <IconButton component={Link} to='/pantry'>
                <ArrowBackIcon>Back to Pantry</ArrowBackIcon>
            </IconButton>

            <Typography variant='subtitle2' align='center'>
                <h1>Search({recipes.length}) Results for: {location.state.item}</h1>
            </Typography>
            <Typography variant='subtitle1' align='center' gutterBottom>
                RECIPES: {recipes.length}
            </Typography>
            <div>
                {(recipes && recipes.length > 0) ? (
                    <div>
                        {selectedRecipe ? (
                            <RecipeDetail selectedRecipe={selectedRecipe} handleGoBack={() => setSelectedRecipe(null)} />
                        ) : (
                            <Grid container justify='center' spacing={2}>
                                
                                    {
                                        recipes.map((recipe) => (
                                        <Grid item wrap='wrap' id={recipe.idMeal} className={classes.cardStyle}>
                                            <Card key={recipe.meals[0].idMeal}>
                                                <div key={recipe.meals[0].idMeal} id={recipe.meals[0].idMeal}>
                                                    <img alt='recipe-pic' src={recipe.meals[0].strMealThumb}></img>
                                                    <Typography variant='h6' align='center' gutterBottom>
                                                        {recipe.meals[0].strMeal}
                                                    </Typography>
                                                    {/* <Typography variant='caption'>
                                                        {recipe.meals[0].idMeal}    
                                                    </Typography>     */}
                                                    <Typography variant='subtitle1' align='center'>
                                                        Cuisine: {recipe.meals[0].strArea}
                                                    </Typography>
                                                    <Button
                                                    fullWidth
                                                    variant='contained'
                                                    color='primary'
                                                    onClick={() => setSelectedRecipe(recipe.meals[0])}>
                                                        See More
                                                    </Button>
                                                </div>
                                            </Card>
                                        </Grid>
                                        ))
                                    }
                                
                            </Grid>
                        )}
                    </div>
                ) : (
                    <h1>no results</h1>
                )}
            </div>

        </div>
    )
}

export default SearchResults
