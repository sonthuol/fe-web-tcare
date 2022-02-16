import { Route, Switch } from "react-router-dom";
import AppBar from "./components/Admin/AppBar";
import Home from "./components/Admin/Home";
import Root from "./components/Admin/Root";
import Admin from "./components/Admin/Admin";
import Doctor from "./components/Admin/Doctor";
import Receptionist from "./components/Admin/Receptionist";
import Profile from "./components/Admin/Profile";
import Login from "./features/Auth/components/Login";
import Register from "./features/Auth/components/Register";
import { useEffect, useState } from "react";
import authService from "./services/Auth/auth.service";
function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  return (
    <div className="App">
      {currentUser && <AppBar />}
      <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/root" component={Root} />
        <Route path="/admin" component={Admin} />
        <Route path="/doctor" component={Doctor} />
        <Route path="/receptionist" component={Receptionist} />
      </Switch>
    </div>
  );
}

export default App;
