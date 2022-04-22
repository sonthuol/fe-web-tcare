import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Admin from "./components/Admin";
import Login from "./features/Auth/components/Login";
import authService from "./services/Auth/auth.service";
import userService from "./services/User/user.service";
import doctorService from "./services/Doctor/doctor.service";
import clinicService from "./services/Clinic/clinic.service";
function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentClinic, setCurrentClinic] = useState(undefined);
  const [currentDoctor, setCurrentDoctor] = useState(undefined);
  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await authService.getCurrentUser();
      if (user) {
        if (user.roles[0] === "ROLE_ADMIN") {
          await userService.setCurrentClinic(user.id);
          const clinic = await clinicService.getCurrentClinic();
          if (clinic) {
            setCurrentClinic(clinic);
          }
        }
        if (user.roles[0] === "ROLE_DOCTOR") {
          await userService.setCurrentDoctor(user.id);
          const doctor = await doctorService.getCurrentDoctor();
          if (doctor) {
            setCurrentDoctor(doctor);
            await doctorService.setCurrentClinic(doctor.id);
          }
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
