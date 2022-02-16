import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import Login from "../../../features/Auth/components/Login";
import Register from "../../../features/Auth/components/Register";
import authService from "../../../services/Auth/auth.service";
import Admin from "../Admin";
import Doctor from "../Doctor";
import Home from "../Home";
import Profile from "../Profile";
import Receptionist from "../Receptionist";
import Root from "../Root";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: "10px",
  },
  link: {
    color: "White",
    textDecoration: "none",
    position: "relative",
  },
}));
function AppBarAdmin(props) {
  const classes = useStyles();
  const [showRootBoard, setShowRootBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showDoctorBoard, setShowDoctorBoard] = useState(false);
  const [showReceptionistBoard, setShowReceptionistBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowRootBoard(user.roles.includes("ROLE_ROOT"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowDoctorBoard(user.roles.includes("ROLE_DOCTOR"));
      setShowReceptionistBoard(user.roles.includes("ROLE_RECEPTIONIST"));
    }
  }, []);

  const logOut = () => {
    authService.logout();
    props.history.push("/login");
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" className={classes.title}>
            <Link to={"/"} className={classes.link}>
              Home
            </Link>
          </Typography>
          {showRootBoard && (
            <Typography variant="subtitle1" className={classes.title}>
              <Link to={"/root"} className={classes.link}>
                Root
              </Link>
            </Typography>
          )}

          {showAdminBoard && (
            <Typography variant="subtitle1" className={classes.title}>
              <Link to={"/admin"} className={classes.link}>
                Admin
              </Link>
            </Typography>
          )}

          {showDoctorBoard && (
            <Typography variant="subtitle1" className={classes.title}>
              <Link to={"/doctor"} className={classes.link}>
                Doctor
              </Link>
            </Typography>
          )}

          {showReceptionistBoard && (
            <Typography variant="subtitle1" className={classes.title}>
              <Link to={"/receptionist"} className={classes.link}>
                Receptionist
              </Link>
            </Typography>
          )}

          {currentUser ? (
            <>
              <Typography variant="subtitle1" className={classes.title}>
                <Link to={"/profile"} className={classes.link}>
                  Profile
                </Link>
              </Typography>
              <Typography variant="subtitle1" className={classes.title}>
                <Link to={"/login"} className={classes.link} onClick={logOut}>
                  Logout
                </Link>
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="subtitle1" className={classes.title}>
                <Link to={"/login"} className={classes.link}>
                  Login
                </Link>
              </Typography>
              <Typography variant="subtitle1" className={classes.title}>
                <Link to={"/register"} className={classes.link}>
                  Register
                </Link>
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/root" component={Root} />
        <Route path="/admin" component={Admin} />
        <Route path="/doctor" component={Doctor} />
        <Route path="/receptionist" component={Receptionist} />
      </Switch> */}
    </div>
  );
}

export default withRouter(AppBarAdmin);
