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
// import './App.css';

function App() {
  return (
    <Router>
      <div>
        <h1>Hello</h1>
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





        </Switch>
      </div>









      </Router>
  );
}

export default App;
