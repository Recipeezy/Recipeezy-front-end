import React, { useState, useEffect } from 'react'
import axios from 'axios';


export default function RecipeHistory({token}) {
    const [selectedRecipes, setSelectedRecipes] = useState([])
    const [selectedRecipeDetail, setSelectedRecipeDetail] = useState(false)
    

    const getRecipeHistoryList = () => {
        axios.get('https://recipeezy-app.herokuapp.com/recipe_history/', {
            headers: { 'Authorization': `Token ${token}` },
        })
            .then((data) => {
                console.log(data.data)
                setSelectedRecipes(data.data)
                
            })
    }
    useEffect(() => {
        getRecipeHistoryList()
    }, [])
    


    return (
        <div>
            <h1>Recipe History yo</h1>
        </div>
    )
}
