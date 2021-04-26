import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { List, Card, Grid } from '@material-ui/core';
import { ListItem, makeStyles, ListItemText } from '@material-ui/core';
import { Container } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 400,
        maxWidth: 300,
        // backgroundColor: theme.palette.background.paper,
    },
    }));



function ShoppingList() {
    const [shopList, setShopList] = useState([])
    const classes=useStyles();


    // Hardcoded token for now
    const token = '9600235d3622575ff38d185b19a319d8c288a59b'

    useEffect(() => {
        axios.get('https://recipeezy-app.herokuapp.com/shopping_list/', { headers: { 'Authorization': `Token ${token}` }, })
            .then((response) => {
                console.log(typeof (response.data[0].shopping_list))
                console.log(response.data[0])
                setShopList(response.data[0].shopping_list.map((obj) => obj.name))
            })
    }, [])




    return (
        <div>
            <Link to='/' type='button'>Home</Link>
            <Grid>
            <h1>SHOPPING LIST</h1>
                <Container className={classes.root}>
                    <Card className="shopping-list-main-container">
                        <List>
                            {shopList && (
                                shopList.map((e) => (
                                    <ListItem>{e}</ListItem>
                                ))
                            )}
                        </List>
                    </Card>
                </Container>
            </Grid>
        </div>
    )
}

export default ShoppingList
