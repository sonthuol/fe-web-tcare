import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Admin from "./components/Admin";
import Login from "./features/Auth/components/Login";
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
    <div>
      {currentUser ? <Admin /> : <Login />}
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
