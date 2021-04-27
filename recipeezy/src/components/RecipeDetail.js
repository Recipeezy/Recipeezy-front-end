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

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    mealTitle: {
        marginBottom: '60px'
    },
    cardDetails: {
        display: 'flex',
    },
    textContainer: {
        justifyContent:'center',
        width:'300px'
    },
    img: {
        width:'50%'
    },
    list: {
        alignItems: 'center'
    }
});

export default function RecipeDetail({selectedRecipe, handleGoBack}) {
    const classes = useStyles()
    console.log('selected recipe ', selectedRecipe)

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
                    <Grid item>
                        <img align='center' alt="recipe-pic" src={selectedRecipe.strMealThumb} />
                    </Grid>
                    <Grid item className={classes.textContainer}>
                        <Typography
                        variant='subtitle1'
                        align="center"
                        >Cuisine: {selectedRecipe.strArea}</Typography>
                        <Typography align='center' variant='subtitle1'>Category: {selectedRecipe.strCategory}</Typography>
                    </Grid>
                </div>
            </Grid>

            <div >
                <List className={classes.list}>
                    <ListItem alignItems='center'>{selectedRecipe.strIngredient1}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient2}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient3}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient4}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient5}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient6}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient7}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient8}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient9}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient10}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient11}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient12}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient13}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient14}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient15}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient16}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient17}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient18}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient19}</ListItem>
                    <ListItem>{selectedRecipe.strIngredient20}</ListItem>
                </List>
            </div>
            <div>
                <Typography variant='body1'> Instructions: {selectedRecipe.strInstructions}</Typography>
            </div>
                    <Card>
                        <CardMedia 
                        width='400px'
                        src={selectedRecipe.strYoutube.replace('watch?v=', 'embed/')}
                        component='iframe'
                        height='400'
                        />
                    </Card>
        </Container>
    )
}

