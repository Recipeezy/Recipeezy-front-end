import React, { useState } from 'react'
import axios from 'axios'
import { Input } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'

export default function FoodItemForm({ addFoodItem, token, getPantry }) {
    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post(
                'https://recipeezy-app.herokuapp.com/pantry/add/',
                {
                    ingredients: [
                        { name: name }
                    ]
                },
                {
                    headers: { Authorization: `Token ${token}` },
                },
            )
            .then((data) => {
                addFoodItem(data.data)
                setName('')
                getPantry()
            })
    }


    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                    <label htmlFor='ingredient-name'></label>
                    <TextField
                        id='ingredient-name'
                        type='text'
                        value={name}
                        placeholder='Add Ingredient'
                        onChange={(event) => setName(event.target.value)}
                    ></TextField>
                <Button
                    variant='contained'
                    // fullWidth
                    className='submit-btn'
                    type="submit"
                >Add</Button>
            </Grid>
        </form>
    )

}