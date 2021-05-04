import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        },
    signUpMsg: {
        marginTop: '20px',
        marginBottom: '50px',
    }
    }));


export default function Login({ setAuth, isLoggedIn }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [inError, setInError] = useState(false)
    const [errorNonfielderrors, setErrorNonfielderrors] = useState([])
    const classes = useStyles();

    if (isLoggedIn) {
        return <Redirect to='/' />
    }

    function handleSubmit(event) {
        event.preventDefault()
        axios
            .post('https://recipeezy-app.herokuapp.com/auth/token/login',
            {
                username: username,
                password: password,
            })
            .then((data) => {
                if (data && data.data.auth_token) {
                    setAuth(username, data.data.auth_token)
                }
            }).catch(error => {
                console.log(error.response.data)
                setErrorNonfielderrors(error.response.data.non_field_errors)
                setInError(true)
        })
    }    

    return (
        <Container component="main" maxWidth="xs">
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
                Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {inError ? (
                    <div>
                    {errorNonfielderrors}
                    </div>
                    ) : (
                    <p></p>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                    Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link color='primary' href="/registration" type="button" variant='body2'>
                                Don't have an account? Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
    }