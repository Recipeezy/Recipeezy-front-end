import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='home-content'>
            <h1>Welcome Home</h1>
            <Link to="/reciperesults" type='button'>Random 10 Recipes</Link>
            <br/>
            <Link to="/pantry" type='button'>View pantry</Link>
            <br/>
            <Link to='/selectedrecipes' type='button'>Selected Recipes</Link>
        </div>
    )
}
