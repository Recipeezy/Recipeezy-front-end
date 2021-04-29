import React, { useState } from 'react'
import { ListItemIcon, ListItem, Button, makeStyles, Checkbox } from '@material-ui/core'
import axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add';
import { Typography } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'


const useStyles = makeStyles(() => ({
    label: {
        marginRight: '50px'
    },
    listItem: {
        '&:hover': {
            background: '#c0dfa1',
        },
        // marginTop: '15px',
        // marginBotton: '15px',
        borderRadius: '15px'
    },

}));

export default function FoodItem({ food, setSelectedIngredients, selectedIngredients, isAtLimit, setIsAtLimit, token }) {
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
        axios.delete(`http://recipeezy-app.herokuapp.com/ingredients/${food.id}`,
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

        if (!selectedIngredients.includes(e.target.value)) {
            setSelectedIngredients([...selectedIngredients, e.target.value])
        } else {
            let n = [...selectedIngredients]
            n.splice(n.indexOf(e.target.value), 1)
            setSelectedIngredients(n)
        }
        console.log("AFTER CHECKCLICK", selectedIngredients)
    }


    if (isDeleted) return false;

    return (
        <ListItem className={`${classes.listItem} checkboxes`} >
            <Checkbox onChange={checkBoxClick} type='checkbox' id={food.name} className="checkboxes" value={food.name}></Checkbox>
            {
                isEditing ?
                    <div>
                        <input onChange={(event) => setName(event.target.value)} value={name}></input>
                        <button onClick={(event) => updateFoodItem(event)}
                            value={food.id}>Submit Edit</button>
                    </div>
                    :
                    // <Typography variant='body1' >
                    <InputLabel htmlFor={name} className={classes.label}>{food.name}</InputLabel>
                // </Typography>
            }
            <ListItemIcon>
                <DeleteIcon
                    onClick={(event) => deleteIngredient(event)}>Delete Item
                </DeleteIcon>
            </ListItemIcon>
            <ListItemIcon>
                <EditIcon onClick={() => setIsEditing(true)}>Edit Item</EditIcon>
            </ListItemIcon>
        </ListItem >
    )
}