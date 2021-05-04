import React, { useState } from 'react'
import axios from 'axios'
import { Grid, Input, makeStyles } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'


const useStyles = makeStyles({
    addButton: {
        maxHeight:'50px',
        maxWidth: '40px',
        padding: '0px 0px 0px 0px',
        color:'#004e64'
    },
    container: {
        justifyContent:'center',
    }
})

export default function FoodItemForm({ addFoodItem, token, getPantry }) {
    const [name, setName] = useState('')
    const classes= useStyles()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post(
                'https://recipeezy-app.herokuapp.com/pantry/',
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
            <Grid container spacing={2} alignItems='center' className={classes.container}>
                    <label htmlFor='ingredient-name'></label>
                    <TextField
                        id='ingredient-name'
                        type='text'
                        value={name}
                        placeholder='Add Ingredient'
                        onChange={(event) => setName(event.target.value)}
                    ></TextField>
                <Button
                    size='small'
                    color='secondary'
                    variant='contained'
                    className={classes.addButton}
                    type="submit"
                >Add</Button>
            </Grid>
        </form>
    )

}
