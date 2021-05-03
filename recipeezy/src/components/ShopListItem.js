import React, { useState } from "react";
import axios from "axios";
import {
  ListItemIcon,
  ListItem,
  Button,
  makeStyles,
  Checkbox,
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@material-ui/core";
import { BorderRightRounded } from "@material-ui/icons";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  label: {
    padding: "0",
  },
  listItem: {
    "&:hover": {
      background: "#fcf5c7",
    },
    display: "flex",
    borderRadius: "15px",
    justifyContent: "space-between",
    padding: "8px 0px",
  },
  listIcons: {
    margin: "0",
    minWidth: "30px",
    height: "24px",
  },
  container: {
    justifyContent: "center",
  },
  submitButton: {
    marginLeft: "15px",
    marginTop: "0px",
    padding: "0",
    height: "50px",
    width: "70px",
  },
}));

export default function ShopListItem({ food, token }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(food.name);
  const classes = useStyles();

  const updateShopListItem = (event) => {
    event.preventDefault();
    axios
      .put(
        `http://recipeezy-app.herokuapp.com/ingredients/${food.id}/`,
        {
          name: name,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then(setIsEditing(false));
  };

  const deleteShopListItem = (event) => {
    event.preventDefault();
    axios
      .delete(`http://recipeezy-app.herokuapp.com/ingredients/${food.id}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log("deleted", response);
        setIsDeleted(true);
      });
  };

  const swapItemToPantry = (event) => {
    console.log("token is ", token);
    event.preventDefault();
    axios
      .patch(
        `https://recipeezy-app.herokuapp.com/pantry/${food.id}/ingredients/`,
        {},
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((response) => {
        console.log("swapped");
        setIsDeleted(true);
      });
  };

  const toggleCrossOut = (e) => {
    if (e.target.checked) {
      e.target.parentElement.parentElement.parentElement.style.textDecoration =
        "line-through";
    } else {
      e.target.parentElement.parentElement.parentElement.style.textDecoration =
        "none";
    }
  };

  if (isDeleted) return false;

  return (
    <Grid>
      <ListItem className={classes.listItem}>
        <Checkbox
          type="checkbox"
          id={food.id}
          className="checkboxes"
          value={food.name}
          onChange={toggleCrossOut}
        ></Checkbox>
        {isEditing ? (
          <Grid container direction="row" alignItems="center">
            <TextField
              onChange={(event) => setName(event.target.value)}
              value={name}
            ></TextField>
            <Button
              size="small"
              variant="contained"
              line-through
              onClick={(event) => updateShopListItem(event)}
              value={food.id}
            >
              Submit
            </Button>
          </Grid>
        ) : (
          <>
            <Typography className={classes.label}>
              <label htmlFor={name}>{name}</label>
            </Typography>

            <Grid spacing={0} item alignContent="flex-end">
              <ListItemIcon className={classes.listIcons}>
                <EditIcon color='secondary' onClick={() => setIsEditing(true)}>
                  Edit Item
                </EditIcon>
              </ListItemIcon>
              <ListItemIcon className={classes.listIcons}>
                <DeleteIcon color='secondary' onClick={(event) => deleteShopListItem(event)}>
                  Delete Item
                </DeleteIcon>
              </ListItemIcon>
            </Grid>
          </>
        )}
      </ListItem>
    </Grid>
  );
}
