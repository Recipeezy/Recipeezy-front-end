import React, { useState } from 'react'
import Home from './components/Home'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Container, Typography, Menu, AppBar, Toolbar, IconButton, MenuItem, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import RecipeResults from './components/RecipeResults'
import Pantry from './components/Pantry'
import theme from './theme';
// import './App.css';

function App() {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null)
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth='md'>
          <div>
            <h1>Hello</h1>
            {/* <RecipeResults /> */}
          </div>
          <AppBar color='primary'>
                  <Toolbar>
                      <IconButton edge='start'>
                          <MenuIcon color='secondary' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}/>
                      </IconButton>
                          <Menu
                          id='simple-menu'
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          >
                              <MenuItem onClick={handleClose}>
                                  <Link to="/reciperesults" type='button'>Random 10 Recipes</Link>
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                  <Link to="/pantry" type='button'>View pantry</Link>
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                  <Link to='/selectedrecipes' type='button'>Selected Recipes</Link>
                              </MenuItem>
                          </Menu>
                      <Typography variant='h3'color="secondary">
                          Recipeezy
                      </Typography>
                  </Toolbar>
              </AppBar>


          <div>
            <Switch>
              <Route path='/reciperesults'>
                <RecipeResults />
              </Route>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/pantry'>
                <Pantry />
              </Route>
            </Switch>
          </div>








          </Container>
        </ThemeProvider>
      </Router>
  );
}

export default App;
