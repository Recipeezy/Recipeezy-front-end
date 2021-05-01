import React, { useState, useEffect } from 'react'
import axios from 'axios';
import SelectedHistoryDetail from './SelectedHistoryDetail'


export default function RecipeHistory({token}) {
    const [selectedRecipes, setSelectedRecipes] = useState([])
    const [selectedHistoryDetail, setSelectedHistoryDetail] = useState(false)


    const getRecipeHistoryList = () => {
        axios.get('https://recipeezy-app.herokuapp.com/recipe_history/', {
            headers: { 'Authorization': `Token ${token}` },
        })
            .then((data) => {
                console.log(data.data[0].recipe_history)
                setSelectedRecipes(data.data[0].recipe_history)
                
            })
    }
    useEffect(() => {
        getRecipeHistoryList()
    }, [])
    


    return (
        <>
            
            <h1>Recipe History</h1>
            
            
            {selectedHistoryDetail ? ( 
                <SelectedHistoryDetail recipe={selectedHistoryDetail} 
                handleGoBack={() => setSelectedHistoryDetail(null)} token={token}
                />
            ) : (
                selectedRecipes.map((recipe) => (
                
                    <li key={recipe.id}>
                        <div key={recipe.id}>
                            <img alt='recipe-pic' src={recipe.img_id}></img>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.origin}</p>
                            <button onClick={() => setSelectedHistoryDetail(recipe)}>See More</button>
                        </div>
                    </li>
                
                ))
            )}
            
        </>

    )
}
