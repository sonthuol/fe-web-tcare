import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  Paper,
  Snackbar,
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
    width: 300,
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
  form_controller: {
    float: "left",
    fontSize: "10px",
  },
  button: {
    margin: "10px 0",
  },
}));

function Register(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = state;

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setState({
      open: false,
      vertical: "top",
      horizontal: "right",
    });
    authService.register(username, email, password).then(
      () => {
        setUsername("");
        setEmail("");
        setPassword("");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setState({ ...state, open: true });
      }
    );
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <Grid className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Grid align="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h6">Đăng ký tài khoản</Typography>
          <form onSubmit={handleRegister}>
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
              id="email"
              name="email"
              label="email"
              variant="outlined"
              size="small"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              message={message}
              key={vertical + horizontal}
            />
            <Button
              className={classes.button}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
            >
              Đăng ký
            </Button>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Register;
