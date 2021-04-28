import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RecipeDetail from './RecipeDetail'
import { Link } from 'react-router-dom'
import { StylesProvider, ThemeProvider, createMuiTheme } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { Card } from '@material-ui/core'
import { CardMedia } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ButtonBase } from '@material-ui/core'
import theme from '../theme'

const useStyles = makeStyles({
  buttonRoot: {
    marginTop: '30px',
    color: '#333',
  }
})

function ButtonStyled() {
  const classes = useStyles();
  return <Button
    color="primary"
    size="small"
    className={classes.buttonRoot}>See More +</Button>
}



export default function RecipeResults({ token }) {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(false)
  const classes = useStyles()

  // function handleGoBack={() => setSelectedRecipe(null)}



  useEffect(() => {
    axios
      .get('https://www.themealdb.com/api/json/v2/9973533/randomselection.php?key=value')
      .then((response) => {
        setRecipes(response.data)
      })
  }, [])

  console.log('recipes is ', recipes)

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography align='center' variant='h3' color='secondary' gutterBottom>
          Recipe Results
          </Typography>
        <div className='recipe-list'>
          <>
            {recipes.meals ? (
              <div>
                {selectedRecipe ? (
                  <RecipeDetail
                    selectedRecipe={selectedRecipe}
                    handleGoBack={() => setSelectedRecipe(null)} token={token}
                  />
                ) : (
                  <Grid container justify='center' spacing={2} className='recipe-list' >
                    {recipes.meals.map((recipe) => (
                      <Grid item wrap="wrap" id={recipe.idMeal} maxWidth={300}>
                        <Card variant='outlined' height={800} maxWidth={300} className="recipe-card" elevation={3} padding={5}>
                          <img
                            alt="recipe-pic"
                            src={recipe.strMealThumb} />
                          <Typography gutterBottom variant='h6' align='center'>
                            {recipe.strMeal}
                          </Typography>
                          <Typography gutterBottom variant='subtitle1' align='center'>
                            Cuisine: {recipe.strArea}
                          </Typography>
                          <Button
                            // variant='contained'
                            color="secondary"
                            // size="small"
                            onClick={() => setSelectedRecipe(recipe)}
                          >
                            See more
                            </Button>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </>
        </div>
      </div>
    </ThemeProvider>
  )
}
