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
import useLocalStorageState from 'use-local-storage-state'
import Login from './components/Login';
import Registration from './components/Registration';

// import './App.css';

function App() {
  const [username, setUsername] = useLocalStorageState('username', '')
  const [token, setToken] = useLocalStorageState('token', '')

  function setAuth(username, token) {
    setUsername(username)
    setToken(token)
  }

  function logOut() {
    setUsername(null)
    setToken(null)
  }

  const isLoggedIn = username && token 


  return (
    <Router>
      <div>
        <h1>Recipeezy</h1>
        {/* <RecipeResults /> */}
      </div>


      <div>
        <Switch>
          <Route path='/reciperesults'>
            <RecipeResults isLoggedIn={isLoggedIn} token={token}/>
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/pantry'>
            <Pantry isLoggedIn={isLoggedIn} token={token}/>
          </Route>
          <Route path='/login'>
              <Login setAuth={setAuth} isLoggedIn={isLoggedIn} token={token} />
              </Route>
          <Route path='/registration'>
            <Registration setAuth={setAuth} isLoggedIn={isLoggedIn} />
            </Route>




        </Switch>
      </div>









      </Router>
  );
}

export default App;
