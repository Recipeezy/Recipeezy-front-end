import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import ShopListItem from "./ShopListItem.js";
import ShopItemForm from "./ShopItemForm.js";
import { makeStyles, Typography, Button, Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 400,
    maxWidth: 300,
  },
  buttonSpacing: {
    marginTop: '30px'
  }
}));

function ShoppingList({ token }) {
  const [shopList, setShopList] = useState([]);
  const history = useHistory()
  const [doneShopping, setDoneShopping] = useState(false)
  const classes = useStyles();

  const getShopList = () => {
    axios
      .get("https://recipeezy-app.herokuapp.com/shopping_list/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((data) => {
        setShopList(data.data[0].ingredients);
      });
  };

  useEffect(() => {
    getShopList();
  }, []);

  const addShopItem = (newItem) => {
    setShopList([...shopList, newItem]);
  };

  const swapSelected = () => {
    let idList = [];
    let checkedIngs = document.querySelectorAll(
      "input[type='checkbox']:checked"
    );
    for (let c of checkedIngs) {
      idList.push(c.id);
    }

    idList.map((x) => {
      axios
        .patch(
          `https://recipeezy-app.herokuapp.com/pantry/${x}/ingredients/`,
          {},
          {
            headers: { Authorization: `Token ${token}` },
          }
        )
        .then((res) => {
          console.log("done");
          getShopList();
        });
    });
  };

  const backToPantry = () => {
    history.push('/', {})
  }

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Shopping List
      </Typography>
      <div className="shopping-list-main-container">
        {(shopList && shopList.length > 0) ? (
          <div>
            <div style={{maxHeight: 450, overflowY: 'auto', overflowX: 'hidden' }}>
              {shopList.map((food) => (
                <ShopListItem
                  food={food}
                  key={food.id}
                  token={token}
                  setShopList={setShopList}
                  shopList={shopList}
                />
              ))}
            </div>
            <ShopItemForm
              addShopItem={addShopItem}
              token={token}
              getShopList={getShopList}
            />
            {doneShopping ? (
          <Grid component={Paper} align='center'>
            <Typography variant='body1'>These items have been added to your Pantry!</Typography>
            <Button color='primary' className={classes.okButton} variant='contained' onClick={() => setDoneShopping(false)}>OK</Button>
          </Grid>
            ) : (
          <p></p>
            )}
            <Button
              style={{marginTop: '30px', marginBottom:'30px'}}
              fullWidth
              className="swap-selected-ings"
              variant="contained"
              color="primary"
              
              onClick={() => {swapSelected(); setDoneShopping(true)}}>
              Done Shopping
            </Button>
          </div>
        ) : (
          <>
            <ShopItemForm
              addShopItem={addShopItem}
              token={token}
              getShopList={getShopList}
            />
            <Button
            className="back-home" variant="contained" color="primary" onClick={backToPantry}>Back Home</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default ShoppingList;
