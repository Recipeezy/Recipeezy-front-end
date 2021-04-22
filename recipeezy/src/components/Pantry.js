import React, { useState, useEffect } from 'react'
import { pantryData } from '../api'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
// import { getPantryData } from '../api'


export default function Pantry() {
    // 1. pantry component needs CRUD capabilities 
    // 2. hardcode ingredients into checkable boxes
    // 3. make checkboxes (ingredients) capped 2-3 (test w/ api to determine what works and what makes the api render null)
    // 4. make a 'Start Plan' button that onClick takes values of checkboxes and sends those ingredients to API useEffect call in RecipeResults.js
    // 5. we're going to need a function that handles the separation of ingredients in the API link (they're separated by commas)


    const [foodList, setFoodList] = useState([])
    const [name, setName] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [selectedID, setSelectedID] = useState(null)

    const [editedIngredient, setEditedIngredient] = useState('')



    const [searchResults, setSearchResults] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const token = '9600235d3622575ff38d185b19a319d8c288a59b'




    // get request to set foodList 
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
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post(
                'http://recipeezy-app.herokuapp.com/ingredients/',
                {
                    name: name
                },
                {
                    headers: { Authorization: `Token ${token}` },
                },
            )
            .then((data) => {
                // useEffect()
                setFoodList([...foodList, data.data])
            })
    }

    // delete request to delete ingredient from Pantry
    const deleteIngredient = (id, event) => {
        document.querySelector('#ingredient-name').value = ""
        axios
            .delete(`http://recipeezy-app.herokuapp.com/ingredients/${id}`,
                {
                    headers: { Authorization: `Token ${token}` },
                }
            )
            .then((response) => {
                console.log('deleted', response)
                if (response.data != null) {
                    event.target.parentElement.remove()
                    // setDeleted(true)
                }
            },
            )
    }

    const editIngredient = (id, event) => {
        event.preventDefault()
        axios

            .put(
                `http://recipeezy-app.herokuapp.com/ingredients/${id}`,
                {
                    name: editedIngredient
                },
                {
                    headers: { Authorization: `Token ${token}` },
                },
            )
            .then(setIsEditing(false))


    }

    // const handleSearch = () => {
    //     console.log("STATE INGREDIENTS", selectedIngredients)

    // }

    const handleChange2 = (e) => {
        var checkboxItems = document.querySelectorAll('.checkboxes')
        let n = []
        for (let c of checkboxItems) {
            if (c.checked) {
                n.push(c.value)
            }
        }
        if (n.length > 4) {
            n.length = 4
        }
        n.sort()
        setSelectedIngredients(n)
        console.log(selectedIngredients)






        // document.querySelector('.ings').textContent = selectedIngredients

        axios.get(`https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${selectedIngredients.join()}`).then((response) => {
            setSearchResults(response.data)
            console.log('SEARCH', searchResults)

        })


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



    return (
        <div className='pantry-wrapper'>
            <h1>Pantry</h1>
            <Link to='/' type='button'>home</Link>


            {/* post request happening every time form is submitted because of above */}
            {foodList.map((food) => (
                <li key={food.id}>
                    <input className="checkboxes" type='checkbox' id={food.item} value={food.name}></input>
                    {isEditing && selectedID === food.id ?
                        <div>
                            <input onChange={(event) => setEditedIngredient(event.target.value)}></input>
                            <button onClick={(event) => editIngredient(food.id, event)}
                                value={food.id}>Submit Edit</button>
                        </div>
                        : <label htmlFor={food.name}>{food.name}</label>}

                    <button onClick={(event) => deleteIngredient(food.id, event)}>Delete Item</button>
                    <button onClick={() => setIsEditing(true)} value={food.id}>Edit Item</button>

                </li>
            )
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='ingredient-name'></label>
                    <input
                        id='ingredient-name'
                        type='text'
                        placeholder='Add Ingredient'
                        onChange={(event) => setName(event.target.value)}
                    ></input>

                </div>
                <div className='btn'>

                    <button
                        className='submit-btn'
                        type="submit"
                    >Add</button>
                </div>

            </form>


            <button className='search-ingredients' onClick={handleChange2}>Search</button>

            <div>
                {searchResults.meals ? (

                    searchResults.meals.map((result) => (
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

