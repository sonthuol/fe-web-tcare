import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import authService from "../../../../services/Auth/auth.service";
const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: 20,
    width: 280,
    minHeight: "60vh",
    margin: "20px auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    backgroundColor: "blue",
  },
  text_field: {
    marginTop: 15,
  },
  button: {
    margin: "10px 0",
  },
}));

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();
  const handleLogin = (e) => {
    e.preventDefault();
    authService.login(username, password).then(
      () => {
        props.history.push("/profile");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
      }
    );
  };
  return (
    <Grid className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Grid align="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h6">Đăng nhập</Typography>
          <form onSubmit={handleLogin}>
            <TextField
              className={classes.text_field}
              id="username"
              name="username"
              label="Tên đăng nhập"
              variant="outlined"
              size="small"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              className={classes.text_field}
              id="password"
              name="password"
              label="Mật khẩu"
              variant="outlined"
              size="small"
              fullWidth
              type="password"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              className={classes.button}
              color="primary"
              variant="contained"
              fullWidth
            >
              Đăng nhập
            </Button>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Login;
