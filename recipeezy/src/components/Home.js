import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CssBaseline, MenuItem } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Icons from '@material-ui/icons'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography'
import IconButton  from '@material-ui/core/IconButton';

export default function Home() {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className='home-content'>
            <div>
                <AppBar>
                    <Toolbar>

                    </Toolbar>
                </AppBar>
            </div>

            <h1>Welcome Home</h1>

            <Link to="/reciperesults" type='button'>Random 10 Recipes</Link>
            <br/>
            <Link to="/pantry" type='button'>View pantry</Link>
            <br/>
            <Link to='/selectedrecipes' type='button'>Selected Recipes</Link>
        </div>
    )
}
