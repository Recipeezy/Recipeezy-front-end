import React, { useState } from 'react'
import Home from './components/Home'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button, Grid, Container, Typography, Menu, AppBar, Toolbar, IconButton, MenuItem, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import RecipeResults from './components/RecipeResults'
import Pantry from './components/Pantry'
import SelectedRecipes from './components/SelectedRecipes'
import ShoppingList from './components/ShoppingList'
import useLocalStorageState from 'use-local-storage-state'
import Login from './components/Login';
import Registration from './components/Registration';
import SearchResults from './components/SearchResults'
import theme from './theme'
import HomeIcon from '@material-ui/icons/Home'



const useStyles = makeStyles(() => ({
  navButtons: {
    marginTop:'0px',
    color: '#de1616',
    backgroundColor: '#FFFFFF'
    
  }
}));

function App() {
  const [username, setUsername] = useLocalStorageState('username', '')
  const [token, setToken] = useLocalStorageState('token', '')
  const classes = useStyles();

  function setAuth(username, token) {
    setUsername(username)
    setToken(token)
  }

  function logOut() {
    setUsername(null)
    setToken(null)
    alert('You have been logged out')
  }


  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null)
  }

  const isLoggedIn = username && token


  return (
    <Router>


      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth='sm'>
          <div>
            <h1>Hello</h1>
            {/* <RecipeResults /> */}
          </div>
          <AppBar color='primary'>
            <Toolbar>
              <IconButton edge='start'>
                <MenuIcon color='secondary' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick} />
              </IconButton>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to='/' type='button' style={{ textDecoration: 'none', textDecorationColor: 'black' }}>Home</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/reciperesults" type='button' style={{ textDecoration: 'none' }}>Random 10 Recipes</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/pantry" type='button' style={{ textDecoration: 'none' }}>View pantry</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to='/selectedrecipes' type='button' style={{ textDecoration: 'none', textDecorationColor: 'black' }}>Selected Recipes</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to='/shoppinglist' type='button' style={{ textDecoration: 'none', textDecorationColor: 'black' }}>Shopping List</Link>
                </MenuItem>
              </Menu>
              <Typography variant='h4' color="secondary">
                Recipeezy
                      </Typography>
                      {isLoggedIn ? (
                          <Grid container justify='flex-end'>
                            <Button
                            className={classes.navButtons}
                            variant='contained'
                            color="primary"
                            size="small"
                            >
                              <Link to="/" onClick={logOut} style={{ textDecoration: 'none' }}  type="button">Log Out</Link>
                            </Button>
                          </Grid>
                        ) : (
                        <Grid container alignItems='center' justify='flex-end'>
                          <Button
                            style={{marginRight: '10px', backgroundColor:"#FFFFFF"}}
                            className={classes.navButtons}
                            variant='contained'
                            color="primary"
                            size="small">
                            <Link to="/registration" style={{ textDecoration: 'none' }} type="button">Register</Link>
                          </Button>
                          <Button
                            className={classes.navButtons}
                            variant='contained'
                            color="primary"
                            size='small'
                          >
                            <Link to="/login" type="button" style={{ textDecoration: 'none' }}>Log In</Link>
                          </Button>
                        </Grid>
                        )}
            </Toolbar>
          </AppBar>


          <div>
            <Switch>
              <Route path='/reciperesults'>
                <RecipeResults isLoggedIn={isLoggedIn} token={token} />
              </Route>
              <Route exact path='/'>
                <Home isLoggedIn={isLoggedIn} token={token} logOut={logOut} />
              </Route>
              <Route path='/pantry'>
                <Pantry isLoggedIn={isLoggedIn} token={token} />
              </Route>
              <Route path='/login'>

                <Login setAuth={setAuth} isLoggedIn={isLoggedIn} token={token} />
              </Route>
              <Route path='/registration'>
                <Registration setAuth={setAuth} isLoggedIn={isLoggedIn} />
              </Route>
              <Route path="/shoppinglist">
                <ShoppingList
                  setAuth={setAuth}
                  isLoggedIn={isLoggedIn} token={token}/>
            </Route>
            <Route path='/searchresults'>
              <SearchResults token={token}/>
            </Route>
            <Route path='/selectedrecipes'>
              <SelectedRecipes isLoggedIn={isLoggedIn} token={token} />
            </Route>
            </Switch>
          </div>
        </Container>
      </ThemeProvider>
    </Router>

  );
}

export default App;
