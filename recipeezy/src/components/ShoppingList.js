import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import axios from 'axios';
import ShopListItem from './ShopListItem.js'
import ShopItemForm from './ShopItemForm.js'
import { List, Card, Grid, Paper } from '@material-ui/core';
import { ListItem, makeStyles, ListItemText, Button } from '@material-ui/core';
import { Container } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { IconButton } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 400,
        maxWidth: 300,
        // backgroundColor: theme.palette.background.paper,
    },
    }));


function ShoppingList({token}) {
    const [shopList, setShopList] = useState([])
    const classes=useStyles();


    useEffect(() => {
        axios.get('https://recipeezy-app.herokuapp.com/shopping_list/', { 
            headers: { 'Authorization': `Token ${token}` }, 
        })
            .then((data) => {
                setShopList(data.data[0].shopping_list)
                console.log(data.data[0].shopping_list)
                
                
                

            })
    }, [])

    const addShopItem = (newItem) => {
        setShopList([...shopList, newItem])
    }



    return (
        <div>
            <IconButton component={Link} to='/'>
                <HomeIcon>
                    Home
                </HomeIcon>
            </IconButton>
            <h1>SHOPPING LIST</h1>
            <Paper width='500px' height='700px' className="shopping-list-main-container">
                
                {shopList ? (
                    <List component='nav'>
                        {shopList.map((food) => (
                            <ShopListItem
                            food={food}
                            key={food.id}
                            token={token}
                            setShopList={setShopList}
                            shopList={shopList}
                        />
                        
                        ))
                        }
                    <ShopItemForm addShopItem={addShopItem} token={token} />
                    </List>
                    ) : (
                        <p>Loading...</p>
                    )}
            </Paper>
        </div>
    

    )
}

export default ShoppingList


// useEffect(() => {
//     axios.get('https://recipeezy-app.herokuapp.com/shopping_list/', { 
//         headers: { 'Authorization': `Token ${token}` }, 
//     })
//         .then((response) => {
//             console.log(typeof (response.data[0].shopping_list))
//             console.log(response.data[0])
//             setShopList(response.data[0].shopping_list.map((obj) => obj.name))

//         })
// }, [])

