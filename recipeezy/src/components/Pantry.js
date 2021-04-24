import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FoodItem from './FoodItem.js'
import FoodItemForm from './FoodItemForm.js'
import axios from 'axios'



export default function Pantry() {
    const [foodList, setFoodList] = useState([])





    const [searchResults, setSearchResults] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])


    useEffect(() => {
        axios
            .get('http://recipeezy-app.herokuapp.com/ingredients/', {
                headers: {

                },
            })
            .then((data) => {
                setFoodList(data.data)
                console.log('foodList', foodList)
            })
    }, [])






    // post request to add an ingredient to the Pantry
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     axios
    //         .post(
    //             'http://recipeezy-app.herokuapp.com/ingredients/',
    //             {
    //                 name: name
    //             },
    //             {
    //                 headers: { Authorization: `Token ${token}` },
    //             },
    //         )
    //         .then((data) => {
    //             // useEffect()
    //             setFoodList([...foodList, data.data])
    //         })
    // }


    // }
    const addFoodItem = (newItem) => {
        setFoodList([...foodList, newItem])
    }



    const handleSearch = () => {



        axios.get(`https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${selectedIngredients.join()}`).then((response) => {
            setSearchResults((response.data.meals && response.data.meals.length > 10) ? response.data.meals.slice(0, 10) : response.data.meals)

            console.log('SEARCH', searchResults)

        })

    }


    return (
        <div className='pantry-wrapper'>
            <h1>Pantry</h1>
            <Link to='/' type='button'>home</Link>

            {foodList.map((food) => (
                <FoodItem food={food} key={food.id} selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} />
            ))}

            <FoodItemForm addFoodItem={addFoodItem} />

            <button className='search-ingredients' onClick={handleSearch}>Search</button>

            <div>
                {selectedIngredients.length > 0 && (
                    <h1>Results:</h1>
                )}
                {searchResults ? (

                    searchResults.map((result) => (
                        <>
                            <img src={result.strMealThumb}></img>
                            <h1>{result.strMeal}</h1>
                        </>
                    ))

                ) : (<h1>No results</h1>)}

            </div>
        </div>
    )
}
