import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'


export default function Home({ isLoggedIn, logOut }) {
    return (
        <div className='home-content'>
            <Typography variant='h4'>
                Home Page
            </Typography>
            
            {isLoggedIn ? (
                <>
                <Link to="/" onClick={logOut} type="button">Log Out</Link>
                </>  
            ) : (
                <>
                    <Link to="/registration" type="button">Register</Link>
                    <br/>
                    <Link to="/login" type="button">Log In</Link>
                </>
            )}
            <br/>
            <Link to="/reciperesults" type='button'>Random 10 Recipes</Link>
            <br />
            <Link to="/pantry" type='button'>View pantry</Link>
            <br />
            <Link to='/selectedrecipes' type='button'>Selected Recipes</Link>
            <br />
            <Link to="/shoppinglist" type="button">Shopping List</Link>
        </div>
    )
}

