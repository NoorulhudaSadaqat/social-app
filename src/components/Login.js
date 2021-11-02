import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { isLoggedInMiddleware } from "../actions/Index";
import { useDispatch } from "react-redux";
import {
  Typography,
  Paper,
  Avatar,
  Button,
  Grid,
  ButtonBase,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    display: "flex",
    justifyContent: "center",
    color: "white",
    marginTop: 50,
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
}));

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory();
  const dispatch = useDispatch();

  const classes = useStyles();

  function handleOnSubmit() {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    console.log(localStorage.getItem("email"));

    // if (isLoggedIn) {
    //   history.push("/posts");
    // }
    dispatch(isLoggedInMiddleware());
  }
  function handleEmailChange(value) {
    setEmail(value);
  }
  function handlePasswordChange(value) {
    setPassword(value);
  }
  return (
    <div className={classes.root}>
      <Card sx={{ minWidth: 275, maxWidth: 500 }}>
        <CardContent>
          <Paper className={classes.paper}>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <Avatar className={classes.avatar}>{/* <LockIcon /> */}</Avatar>
              </Grid>
            </Grid>
            <Typography component="h1" variant="h5" align="center">
              Sign in
            </Typography>
            <ValidatorForm className={classes.form}>
              <TextValidator
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="off"
                onChange={(e) => handleEmailChange(e.target.value)}
                required
                fullWidth
              />
              <TextValidator
                label="Password"
                name="password"
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
                fullWidth
              />
              <Typography
                component="h1"
                align="center"
                variant="subtitle1"
                style={{ backgroundColor: "lightblue" }}
              >
                {/* {state.errorMessage} */}
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleOnSubmit}
              >
                Sign In
              </Button>
            </ValidatorForm>
            <br />
          </Paper>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
