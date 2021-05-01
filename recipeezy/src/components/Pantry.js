import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import FoodItem from './FoodItem.js'
import FoodItemForm from './FoodItemForm.js'
import axios from 'axios'
import { makeStyles } from '@material-ui/core';
import lodash from 'lodash'
import { Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
    search: {
        margin: '0 auto'
    }
})


export default function Pantry({ token }) {
    const [foodList, setFoodList] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [isAtLimit, setIsAtLimit] = useState(false)
    const classes = useStyles()

    const history = useHistory()
    let clicks = 0

    const getPantry = () => {

        axios
            .get('https://recipeezy-app.herokuapp.com/pantry/', {
                headers: {
                    Authorization: `Token ${token}`
                },
            })
            .then((data) => {
                function setFood(data) {
                    setFoodList(lodash.uniqBy(data, 'name'))
                }
                setFood(data.data[0].ingredients)
            })
    }

    useEffect(() => {
        console.log('token is ', token)
        getPantry()
        console.log(foodList)

    }, [])


    const addFoodItem = (newItem) => {
        setFoodList([...foodList, newItem])
    }


    const getSearch = () => {
        let templist = []
        let checkedValues = document.querySelectorAll("input[type='checkbox']:checked")
        for (let c of checkedValues) {
            templist.push(c.id)
        }
        console.log('checked values', checkedValues)
        console.log("TMEPLIST", templist)
        axios.get(`https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${templist.join()}`).then((response) => {
            if (response.data.meals) {
                setSearchResults((response.data.meals && response.data.meals.length > 10) ? response.data.meals.slice(0, 10).map((obj) => obj.idMeal) : response.data.meals.map((obj) => obj.idMeal))


            }
            console.log('SEARCH', searchResults)

        })
    }

    const handleSearch = () => {
        getSearch()
        clicks++
        if (clicks > 1) {
            document.querySelector("#search-button").innerHTML = "Couldn't Find Results..."
            setTimeout(() => {
                document.querySelector("#search-button").innerHTML = "Search"
            }, 1250)
            clicks = 0

        }

        if (searchResults.length > 0) {
            history.push('/searchresults', { search: searchResults, item: selectedIngredients.join() })
        } else {
            console.log("AHAHHAH")
        }
    }



    return (
        <div className='pantry-wrapper'>
            <Typography variant='h4' align='center' gutterBottom>
                Pantry
            </Typography>
            {foodList ? (
                <div>
                    {foodList.map((food) => (
                        <FoodItem food={food} key={food.id} selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} token={token} isAtLimit={isAtLimit} setIsAtLimit={setIsAtLimit} getSearch={getSearch} />
                    ))}
                    {isAtLimit ? (
                        <div><p>You may only select a maximum of 4 ingredients</p></div>
                    ) : (
                        <p></p>
                    )}

                    <FoodItemForm addFoodItem={addFoodItem} token={token} getPantry={getPantry} />

                    <Button
                        fullWidth
                        style={{ marginTop: '30px' }}
                        variant='contained'
                        className={classes.search} id="search-button" onClick={handleSearch}>Search</Button>
                    <div>
                        <h2 className="errorh2"></h2>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>

    )
}
