import React, { useState } from 'react'
import { ListItemIcon, ListItem, Button, makeStyles, Checkbox } from '@material-ui/core'
import axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add';
import { Typography } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { Card } from '@material-ui/core'
import { Box } from '@material-ui/core'


const useStyles = makeStyles(() => ({
    listItem: {
        '&:hover': {
            background: '#fcf5c7',
        },
        borderRadius: '15px',
        justifyContent: 'space-between'

    },
    submitButton: {
        marginLeft: '15px',
        marginTop: '0px',
        padding: '0',
        height: '50px',
        width: '70px'

    },
    inputField: {
        padding: '10px'
    },
    listIcons: {
        margin: '0',
        minWidth: '30px',
        height: '24px'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center'
    },
}));

export default function FoodItem({ food, setSelectedIngredients, selectedIngredients, isAtLimit, setIsAtLimit, token, getSearch }) {
    const [isDeleted, setIsDeleted] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(food.name)
    const classes = useStyles()


    const updateFoodItem = (event) => {

        event.preventDefault()
        axios.put(
            `https://recipeezy-app.herokuapp.com/ingredients/${food.id}/`,
            {
                name: name
            },
            {
                headers: { Authorization: `Token ${token}` },
            },
        )
            .then(setIsEditing(false))


    }
    const deleteIngredient = (event) => {
        event.preventDefault();
        axios.delete(`https://recipeezy-app.herokuapp.com/ingredients/${food.id}`,
            {
                headers: { Authorization: `Token ${token}` },
            }
        )
            .then((response) => {
                console.log('deleted', response)
                setIsDeleted(true)

            },
            )
    }

    const checkBoxClick = (e) => {
        let checkedTotal = 0
        let checkboxes = document.querySelectorAll('.checkboxes')
        for (let c of checkboxes) {
            if (c.checked === true) {
                checkedTotal++
            }
        }
        if (checkedTotal > 4) {
            setIsAtLimit(true)
            e.target.checked = false
        }

        if (checkedTotal < 4) {
            setIsAtLimit(false)
        }

        if (!selectedIngredients.includes(e.target.value) && e.target.checked === true) {
            setSelectedIngredients([...selectedIngredients, e.target.value])
            console.log("CHECKBOX SELECT INGS", selectedIngredients)
            getSearch()
        } else {
            let n = [...selectedIngredients]
            n.splice(n.indexOf(e.target.value), 1)
            setSelectedIngredients(n)
            getSearch()
        }
    }


    if (isDeleted) return false;

    return (
        <Grid container alignItems='center'>
            <ListItem className={classes.listItem}>
                <div className={classes.checkboxLabel}>
                    <Checkbox onChange={checkBoxClick} type='checkbox' id={name} className="checkboxes" value={food.name} color='secondary'></Checkbox>
                    <InputLabel htmlFor={name} className={classes.label} style={isEditing ? {display:'none'} : {} }>{food.name}</InputLabel>
                </div>
                {isEditing ?
                    <Grid container direction='row' alignItems='center'>
                        <TextField margin='dense' onChange={(event) => setName(event.target.value)} value={name}></TextField>
                        <Button color='primary' size='small' variant='contained' onClick={(event) => updateFoodItem(event)}
                            value={food.id}>Submit</Button>
                    </Grid>
                    :
                    <>
                        

                        <Grid display='flex'>
                            <ListItemIcon className={classes.listIcons}>
                                <EditIcon color='primary' onClick={() => setIsEditing(true)}>Edit Item</EditIcon>
                            </ListItemIcon>
                            <ListItemIcon className={classes.listIcons}>
                                <DeleteIcon color='primary'
                                    onClick={(event) => deleteIngredient(event)}>Delete Item
                            </DeleteIcon>
                            </ListItemIcon>
                        </Grid>
                    </>
                }
            </ListItem>
        </Grid>
    )
}