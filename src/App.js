import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Admin from "./components/Admin";
import Login from "./features/Auth/components/Login";
import authService from "./services/Auth/auth.service";
import userService from "./services/User/user.service";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await authService.getCurrentUser();
      if (user) {
        if (user.roles[0] !== "ROLE_ROOT") {
          await userService.setCurrentClinic(user.id);
        }
        setCurrentUser(user);
      }
    };
    getCurrentUser();
  }, []);
  return (
    <div>
      {currentUser ? <Admin /> : <Login />}
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
