import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FoodItem from './FoodItem.js'
import FoodItemForm from './FoodItemForm.js'
import axios from 'axios'



export default function Pantry({token}) {
    const [foodList, setFoodList] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])
    console.log('foodList is ', foodList)
    

    useEffect(() => {
        console.log('token is ', token)
        axios
            .get('http://recipeezy-app.herokuapp.com/pantry/', {
                headers: {
                    Authorization: `Token ${token}` 
                },
            })
            .then((data) => {
                console.log('data.data is ', data.data)
                setFoodList(data.data[0].ingredients_list)
                console.log('foodList', foodList)
            })
    }, [])


    const addFoodItem = (newItem) => {
        setFoodList([...foodList, newItem])
    }

    const handleChange2 = (e) => {
        var checkboxItems = document.querySelectorAll('.checkboxes')
        let n = []
        for (let c of checkboxItems) {
            if (c.checked) {
                n.push(c.value)
            }

        }
        n.sort()
        n.length = 4
        setSelectedIngredients(n)


        // document.querySelector('.ings').textContent = selectedIngredients

        axios.get(`https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${selectedIngredients[0]},${selectedIngredients[1]}`).then((response) => {
            setSearchResults(response.data)
            console.log('SEARCH', searchResults)

        })


    }
    return (
        <div className='pantry-wrapper'>
            <h1>Pantry</h1>
            <Link to='/' type='button'>home</Link>
            
            {foodList ? (
            
            <div>
                {foodList.map((food) => (
                    <FoodItem food={food} key={food.id}/>
                ))}
                    
                <FoodItemForm addFoodItem={addFoodItem} />
                <button className='search-ingredients' onClick={handleChange2}>Search</button>

                <div>
                    {searchResults.meals ? (

                        searchResults.meals.map((result) => (
                            <>
                                <img src={result.strMealThumb} alt='food-pic'></img>
                                <h1>{result.strMeal}</h1>
                            </>
                        ))

                    ) : (<h1>No results</h1>)}

                </div>
                
            </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

 // const handleChange = (e) => {
    //     if (!selectedIngredients.includes(e.target.value)) {
    //         console.log(e.target.value)
    //         setSelectedIngredients([e.target.value, ...selectedIngredients])
    //     } else if (selectedIngredients.includes(e.target.value)) {
    //         let n = selectedIngredients
    //         for (let i = 0; i < n.length; i++) {
    //             if (n[i] === e.target.value) {
    //                 n.pop(i)

    //             }
    //         }
    //         n.sort()
    //         setSelectedIngredients(n)
    //     }

    // }
