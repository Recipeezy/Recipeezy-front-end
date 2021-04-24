import React, { useState } from 'react'
import axios from 'axios'

export default function FoodItemForm ({addFoodItem, token}) {
    const [name, setName] = useState('')

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
                setName('')
                addFoodItem(data.data)
            })
    }

    
    return(
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
    )

}