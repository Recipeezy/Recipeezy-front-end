import React from 'react'
import Home from './components/Home'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import RecipeResults from './components/RecipeResults'
import Pantry from './components/Pantry'
import ShoppingList from './components/ShoppingList'
// import './App.css';

function App() {
  return (
    <Router>
      <div>
        <h1>Recipeezy</h1>
        {/* <RecipeResults /> */}
      </div>


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
          <Route path="/shoppinglist">
            <ShoppingList />
          </Route>





        </Switch>
      </div>









    </Router>
  );
}

export default App;
