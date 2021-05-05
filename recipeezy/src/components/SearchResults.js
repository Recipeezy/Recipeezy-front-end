import { Button } from '@material-ui/core'
import { Card, Grid, makeStyles, Typography, IconButton } from '@material-ui/core'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import RecipeDetail from './RecipeDetail'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles({
    cardStyle: {
        maxWidth: '300px'
    }
})



function SearchResults({ token }) {

    const [recipes, setRecipes] = useState([])
    const [mealIds, setMealIds] = useState([])
    const classes = useStyles()
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    let location = useLocation()
    let n = []


    useEffect(() => {
        console.log("LOCATION STATE", location.state.search)
        console.log("token is", token)
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
            {!selectedRecipe && (
                <Grid align='center'>
                    <Button
                    style={{marginBottom: 30, color: '#004e64'}}
                    color='secondary'
                    variant='contained'
                    component={Link} to='/'>
                        Back to Pantry
                    </Button>
                </Grid>
            )}

            <Typography variant='h5' align='center' style={{ marginBottom: '30px'}}>
                Result{recipes.length > 1 ? 's' : ""} for {location.state.item}
            </Typography>
            <div>
                {(recipes && recipes.length > 0) ? (
                    <div>
                        {selectedRecipe ? (
                            <RecipeDetail selectedRecipe={selectedRecipe} handleGoBack={() => setSelectedRecipe(null)} token={token} />
                        ) : (
                            <Grid container justify='center' spacing={2}>
                                {
                                    recipes.map((recipe) => (
                                        <Grid item wrap='wrap' id={recipe.idMeal} className={classes.cardStyle}>
                                            <Card variant='outlined' key={recipe.meals[0].idMeal}>
                                                <div key={recipe.meals[0].idMeal} id={recipe.meals[0].idMeal}>
                                                    <img alt='recipe-pic' src={recipe.meals[0].strMealThumb}></img>
                                                    <Typography variant='h6' align='center' gutterBottom>
                                                        {recipe.meals[0].strMeal}
                                                    </Typography>
                                                    
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
