import React, { useState } from 'react'
import axios from 'axios'
import { ListItem } from '@material-ui/core'
import { ListItemIcon } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { Button, makeStyles, Checkbox } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add';
import { Typography } from '@material-ui/core'
import { BorderRightRounded } from '@material-ui/icons'


const useStyles = makeStyles(() => ({
    label: {
        marginRight:'75px'
    },
    listItem: {
        '&:hover': {
            background: '#c0dfa1',
        },
        marginTop: '15px',
        marginBotton: '15px',
        borderRadius:'15px'
    },
    
}));

export default function ShopListItem ({food, token}) {
    const [isDeleted, setIsDeleted] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(food.name)
    const classes = useStyles()

    const updateShopListItem = (event) => {

        event.preventDefault()
        axios.put(
            `http://recipeezy-app.herokuapp.com/ingredients/${food.id}/`,
            {
                name: name
            },
            {
                headers: { Authorization: `Token ${token}` },
            },
        )
            .then(setIsEditing(false))


    }

    const deleteShopListItem = (event) => {
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


    const swapItemToPantry = (event) => {
        console.log('token is ', token)
        event.preventDefault();
        axios.put(`https://recipeezy-app.herokuapp.com/ingredients/${food.id}/swap/`,
            {
            },
            {
                headers: { Authorization: `Token ${token}` },
            },
        )
            .then((response) => {
                setIsDeleted(true)
            },
            )
    }
    
    if (isDeleted) return false;

    return (
        <ListItem className={classes.listItem}>
            <Checkbox
                type='checkbox'
                id={food.id}
                className='checkboxes'
                value={food.name}
                
                >
            </Checkbox>
            {isEditing ?
                <div>
                    <input onChange={(event) => setName(event.target.value)} value={name}></input>
                    <button onClick={(event) => updateShopListItem(event)}
                        value={food.id}>Submit Edit</button>
                </div>
                : 
                <Typography className={classes.label}>
                    <label htmlFor={name}>{name}</label>
                </Typography>
                }
            <ListItemIcon>
                <AddIcon
                    onClick={(event) => swapItemToPantry(event)}>Add to Pantry
                </AddIcon>
            </ListItemIcon>
            <ListItemIcon>
                <DeleteIcon 
                    onClick={(event) => deleteShopListItem(event)}>Delete Item
                </DeleteIcon>
            </ListItemIcon>
            <ListItemIcon>
                <EditIcon onClick={() => setIsEditing(true)}>Edit Item</EditIcon>
            </ListItemIcon>
        </ListItem>
    )
}