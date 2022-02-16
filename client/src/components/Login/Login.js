import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../assets/fuel.png';

import axios from "axios";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
              Zia Yacoubou, Davidson Vu, Boris Ofon
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Styles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
    image: {
        backgroundImage: `url(${Logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#D95CB8"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#D95CB8",
    color: "white",
  },
  header: {
    fontFamily: "Oleo Script",
}
}));

export default function Login() {
  const classes = Styles();
  let history = useHistory();

  const [logCredentials, setLogin] = useState({
    username: "",
    password: "",
  });

  const update = (e) => {
    setLogin({
      ...logCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    axios
      .post(process.env.REACT_APP_SERVER_URL + "login", {
        username: logCredentials.username,
        password: logCredentials.password,
      })
      .then((res) => {
        localStorage.setItem("userid", res.data.userid);
        console.log(res.data);
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          console.log(res.data.credentials);
        }
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3" className={classes.header}>
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={update}
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
              onChange={update}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={login}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/Register" variant="body2" style={{textDecoration: "none", color: "black"}}>
                  {"Don't have an account? Create Account"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

