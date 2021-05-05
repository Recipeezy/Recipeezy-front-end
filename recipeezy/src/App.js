import React, { useState } from 'react'
import Home from './components/Home'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button, Grid, Container, Typography, Menu, AppBar, Toolbar, IconButton, MenuItem, CssBaseline, makeStyles, ThemeProvider, Paper } from '@material-ui/core'
import { Link as UiLink } from '@material-ui/core'
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
import RecipeHistory from './components/RecipeHistory'
import SelectedRecipeDetail from './components/SelectedHistoryDetail';



const useStyles = makeStyles(() => ({
  navButtons: {
    marginTop:'0px',
    
  },
  okButton: {
    marginBottom:'30px'
  }
}));

function App() {
  const [username, setUsername] = useLocalStorageState('username', '')
  const [token, setToken] = useLocalStorageState('token', '')
  const [loggedOut, setLoggedOut] = useState(false)
  const classes = useStyles();


  function setAuth(username, token) {
    setUsername(username)
    setToken(token)
  }

  function logOut() {
    setUsername(null)
    setToken(null)
    setLoggedOut(true)
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
        <Container maxWidth='md'>
          <AppBar color='primary'>
            <Toolbar>
            {isLoggedIn ? (
            <>  
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
                  <UiLink href='/' type='button' style={{ textDecoration: 'none', textDecorationColor: 'black' }} variant='body2'>Home</UiLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <UiLink href="/pantry" type='button' variant='body2' style={{ textDecoration: 'none' }}>View pantry</UiLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <UiLink href='/selectedrecipes' type='button' variant='body2' style={{ textDecoration: 'none', textDecorationColor: 'black' }}>Selected Recipes</UiLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <UiLink href='/shoppinglist' type='button' variant='body2' style={{ textDecoration: 'none', textDecorationColor: 'black' }}>Shopping List</UiLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <UiLink href='/recipehistory' type='button' variant='body2' style={{ textDecoration: 'none', textDecorationColor: 'black' }}>Recipe History</UiLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <UiLink href="/reciperesults" type='button' variant='body2' style={{ textDecoration: 'none' }}>10 Random Recipes</UiLink>
                </MenuItem>
              </Menu>
            </>  
                ) : (
                  <p></p>
                )}
                      <UiLink variant='h4' href='/' type='button' color='secondary' style={{ textDecoration: 'none', fontWeight:'bold' }} >Recipeezy</UiLink>
                      {isLoggedIn ? (
                          <Grid container justify='flex-end'>
                            <Button
                            className={classes.navButtons}
                            variant='contained'
                            color="secondary"
                            size="small"
                            >
                              <UiLink href="/" color='primary' onClick={logOut} style={{ textDecoration: 'none' }} type="button">Log Out</UiLink>
                            </Button>
                          </Grid>
                        ) : (
                        <Grid container alignItems='center' justify='flex-end'>
                          <Button
                            style={{marginRight: '10px'}}
                            className={classes.navButtons}
                            variant='contained'
                            color="secondary"
                            size="small">
                            <UiLink href="/registration" style={{ textDecoration: 'none' }} type="button">Register</UiLink>
                          </Button>
                          <Button
                            className={classes.navButtons}
                            variant='contained'
                            color="secondary"
                            size='small'
                          >
                            <UiLink href="/login" type="button" style={{ textDecoration: 'none' }}>Log In</UiLink>
                          </Button>
                        </Grid>
                        )}
            </Toolbar>
          </AppBar>
                        
                        
          {loggedOut ? (
          <Grid component={Paper} align='center'>
            <Typography variant='body1'>You have been logged out.</Typography>
            <Button color='primary' className={classes.okButton} variant='contained' onClick={() => setLoggedOut(false)}>OK</Button>
          </Grid>
            ) : (
          <p></p>
            )}



          <div>
            <Switch>

              <Route path='/reciperesults' render={() => isLoggedIn ? (<RecipeResults isLoggedIn={isLoggedIn} token={token}/>)
              : ( <Registration />)}>                
              </Route>

              <Route exact path='/' render={() => isLoggedIn ? (<Home isLoggedIn={isLoggedIn} token={token} logOut={logOut} />)
              : (<Registration />)}>                
              </Route>

              <Route path='/pantry' render={() => isLoggedIn ? (<Pantry isLoggedIn={isLoggedIn} token={token} logOut={logOut} />)
              : (<Registration />)}>                
              </Route>

              <Route path='/login'>
                <Login setAuth={setAuth} isLoggedIn={isLoggedIn} token={token} />
              </Route>

              <Route path='/registration'>
                <Registration setAuth={setAuth} isLoggedIn={isLoggedIn} />
              </Route>

              <Route path="/shoppinglist" render={() => isLoggedIn ? (<ShoppingList isLoggedIn={isLoggedIn} token={token} logOut={logOut} />)
              : (<Registration />)}>
            </Route>

            <Route path='/searchresults' render={() => isLoggedIn ? (<SearchResults token={token} />)
              : (<Registration />)}>
            </Route>

            <Route path='/selectedrecipes' render={() => isLoggedIn ? (<SelectedRecipes isLoggedIn={isLoggedIn} token={token} logOut={logOut} />)
              : (<Registration />)}>
            </Route>

            <Route path='/recipehistory' render={() => isLoggedIn ? (<RecipeHistory isLoggedIn={isLoggedIn} token={token} logOut={logOut} />)
              : (<Registration />)}>
            </Route>

            </Switch>
          </div>
        </Container>
      </ThemeProvider>
    </Router>

    

  );
}

export default App;
