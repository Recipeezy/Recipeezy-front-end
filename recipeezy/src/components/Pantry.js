import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FoodItem from './FoodItem.js'
import FoodItemForm from './FoodItemForm.js'
import axios from 'axios'
import HomeIcon from '@material-ui/icons/Home';
import { IconButton } from '@material-ui/core';
import lodash from 'lodash'


export default function Pantry({ token }) {
    const [foodList, setFoodList] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [isAtLimit, setIsAtLimit] = useState(false)



    useEffect(() => {
        console.log('token is ', token)
        axios
            .get('http://recipeezy-app.herokuapp.com/pantry/', {
                headers: {
                    Authorization: `Token ${token}`
                },
            })
            .then((data) => {
                function setFood (data) {
                    setFoodList(lodash.uniqBy(data, 'name'))
                }
                setFood(data.data[0].ingredients_list)
            })

    }, [])


    const addFoodItem = (newItem) => {
        setFoodList([...foodList, newItem])
    }


    const handleSearch = () => {
        axios.get(`https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${selectedIngredients.join()}`).then((response) => {
            if (response.data.meals) {
                setSearchResults((response.data.meals && response.data.meals.length > 10) ? response.data.meals.slice(0, 10).map((obj) => obj.idMeal) : response.data.meals.map((obj) => obj.idMeal))


            }
            console.log('SEARCH', searchResults)
        })
    }




    return (
        <div className='pantry-wrapper'>
            <h1>Pantry</h1>
            <IconButton component={Link} to='/'>
                <HomeIcon>
                    Home
                </HomeIcon>
            </IconButton>

            {foodList ? (
                <div>
                {foodList.map((food) => (
                    <FoodItem food={food} key={food.id} selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} token={token} isAtLimit={isAtLimit} setIsAtLimit={setIsAtLimit}/>
                ))}
                {isAtLimit ? (
                <div><p>You may only select a maximum of 4 ingredients</p></div>
                ) : (
                    <p></p>
                )}

                <FoodItemForm addFoodItem={addFoodItem} token={token} />

                <button className='search-ingredients' onClick={handleSearch}>Search</button>

                <div>
                    {(selectedIngredients && selectedIngredients.length > 0) && (
                        <h1>Results:</h1>
                    )}
                    {searchResults && searchResults.length > 0 ? (

                        <Link to={{
                            pathname: '/searchresults',
                            state: {
                                search: searchResults, item: selectedIngredients.join()
                            }
                        }} type='button'>Show {searchResults.length} Results</Link>

                    ) : (<h1>No results</h1>)}

                </div>
                </div>
                ) : (
                    <p>Loading...</p>
                )} 
            </div>
            
    )
}
