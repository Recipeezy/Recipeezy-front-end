import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Grid, Link, Paper, makeStyles, Typography, Avatar, Button, TextField } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    signUpMsg: {
        marginTop: '20px',
        marginBottom: '20px',
    }
    }));

export default function Registration({ isLoggedIn, setAuth }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const classes = useStyles();

    if (isLoggedIn) {
        return <Redirect to='/' />
    }

    function handleSubmit(event) {
        event.preventDefault()
        axios
            .post('https://recipeezy-app.herokuapp.com/auth/users/', {
                username,
                password,
            })
            .then((response) => {
                return axios 
                .post('https://recipeezy-app.herokuapp.com/auth/token/login', {
                    username,
                    password,
                })
                .then((data) => {
                    if (data && data.data.auth_token) {
                        setAuth(username, data.data.auth_token)
                    }
                })
            })
    }

    return (
        <div className={classes.paper}>
            <Grid container align='center' className={classes.signUpMsg}>
                <Typography  component="h1" variant="h5">
                Discover recipes, build your shopping list, and keep track of your pantry on Recipeezy.
                </Typography>
            </Grid>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Recipeezy
            </Typography>

            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="email"
                    autoComplete="email"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                >
                Sign Up
                </Button>
                <Grid container justify="flex-end">
                <Grid item>
                    <Link color='secondary' href="/login" variant="body2">
                    Already have an account? Sign in
                    </Link>
                </Grid>
                </Grid>
            </form>
        </div>
    )
}