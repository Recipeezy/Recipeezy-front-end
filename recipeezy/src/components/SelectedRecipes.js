import React, { useState, useEffect } from "react";
import axios from "axios";
import SelectedRecipeDetail from "./SelectedRecipeDetail.js";
import { Card, Grid, makeStyles, Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
    cardStyle: {
    maxWidth: "300px",
    },    
  selectedHeader: {
    marginTop: '30px',
    marginBottom: '30px'
    },
  });

export default function SelectedRecipes({ token }) {
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [selectedRecipeDetail, setSelectedRecipeDetail] = useState(false);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const getSelectedRecipesList = () => {
    setLoading(true);

    axios
        .get("https://recipeezy-app.herokuapp.com/selected_recipes/", {
        headers: { Authorization: `Token ${token}` },
        })
        .then((data) => {
        console.log("SR data", data.data[0]);
        setSelectedRecipes(data.data[0].selected_recipes);
        setLoading(false);
        });
    };
    useEffect(() => {
    getSelectedRecipesList();
    }, []);

    const renderContent = () => {
    if (selectedRecipeDetail) {
        return (
        <SelectedRecipeDetail
            recipe={selectedRecipeDetail}
            handleGoBack={() => setSelectedRecipeDetail(null)}
            getSelectedRecipesList={getSelectedRecipesList}
          //handleGoBack={handleGoBack}
            token={token}
        />
        );
    } else if (loading) {
        return "Loading...";
    } else if (selectedRecipes.length === 0) {
        return "You haven't selected any recipes yet!";
    } else if (selectedRecipes.length > 0) {
        return selectedRecipes.map((recipe) => (
        <Grid item wrap="wrap" className={classes.cardStyle}>
            <Card variant="outlined" key={recipe.id}>
            <div key={recipe.id}>
                <img alt="recipe-pic" src={recipe.img_id}></img>
                <Typography variant="h6" gutterBottom align="center">
                {recipe.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom align="center">
                {recipe.origin}
              </Typography>
              <Button
              fullWidth
              variant='contained'
              color="primary"
              size="small"
              onClick={() => setSelectedRecipeDetail(recipe)}>
                See More
              </Button>
            </div>
            </Card>
        </Grid>
        ));
    }
    };

    return (
    <>
      <Typography variant="h4" align="center" className={classes.selectedHeader}>
        Selected Recipes
        </Typography>
        <Grid style={{maxHeight: 450, overflowY: 'auto', overflowX: 'hidden' }} container justify="center" spacing={2}>
        {renderContent()}
        </Grid>
    </>
    );
}
