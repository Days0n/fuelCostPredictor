import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";


import axios from "axios";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
              Zia Yacoubou, Davidson Vu, Boris Ofon
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Styles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#D95CB8",
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#D95CB8",
    color: "white",
  },
  header: {
    fontFamily: "Oleo Script",
  },
}));

function checkAlert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Register() {
  const classes = Styles();

  const [on, setOn] = React.useState(false);

  const close = (type, press) => {
    if (press === "clickaway") {
      return;
    }

    setOn(false);
  };

  const [regInfo, setRegInfo] = useState({
    username: "",
    password: "",
  });

  const updateChange = (e) => {
    setRegInfo({ ...regInfo, [e.target.name]: e.target.value });
  };


  let hist = useHistory();

  const registered = (e) => {
    setOn(true);
    axios
      .post(process.env.REACT_APP_SERVER_URL + "register", regInfo)
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          console.log(res.data.error);
        } else {
            setTimeout(() => {
              hist.push("/login");
            }, 2000);
        }
      })
      .catch((err) => console.log(err));
      console.log(regInfo);
    e.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" className={classes.header}>
          Register
        </Typography>
        <FormControl className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required="true"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={updateChange}
          />
          <FormHelperText id="my-helper-text">*Required</FormHelperText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            onChange={updateChange}
          />
          <FormHelperText id="my-helper-text">*Required</FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={registered}
          >
            Register
          </Button>
          <Snackbar open={on} autoHideDuration={10000} onClose={close}>
            <checkAlert onClose={close} severity="success">
              Succes, You're registered, Please login!
            </checkAlert>
          </Snackbar>
          <Grid container>
            <Grid item>
              <Link
                href="/login"
                variant="body2"
                style={{ textDecoration: "none", color: "black" }}
              >
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </FormControl>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
