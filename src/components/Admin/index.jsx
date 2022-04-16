import React from "react";
import Home from "../../pages/Home";
import Topbar from "../TopBar";
import Sidebar from "./SideBar";
import "./style.css";

import { Route, Switch } from "react-router-dom";
import AccountList from "../../pages/Account/AccountList";
import Account from "../../pages/Account/Account";
import ClinicList from "../../pages/Clinic/ClinicList";
import Clinic from "../../pages/Clinic/Clinic";
import ClinicRestore from "../../pages/Clinic/ClinicRestore";
import NewClinic from "../../pages/Clinic/NewClinic";
import DoctorList from "../../pages/Doctor/DoctorList";
import SpecialtyList from "../../pages/Specialty/SpecialtyList";
import NewSpecialty from "../../pages/Specialty/NewSpecialty";
import Specialty from "../../pages/Specialty/Specialty";
import SpecialtyRestore from "../../pages/Specialty/SpecialtyRestore";
import NewDoctor from "../../pages/Doctor/NewDoctor";
import Doctor from "../../pages/Doctor/Doctor";
import DoctorRestore from "../../pages/Doctor/DoctorRestore";
import NoAccess from "../../pages/NoAccess";
import { useEffect, useState } from "react";
import authService from "../../services/Auth/auth.service";

export default function Admin() {
  const [user, setUser] = useState([]);
  const [role, setRole] = useState("");
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setUser(user);
      setRole(user.roles[0]);
    }
  }, []);
  return (
    <div>
      <Topbar user={user} />
      <div className="container">
        <Sidebar role={role} />
        <Switch>
          {/* Tài khảo */}
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/accounts"
            component={role === "ROLE_ROOT" ? AccountList : NoAccess}
          />
          <Route
            path="/accounts/:id"
            component={role === "ROLE_ROOT" ? Account : NoAccess}
          />

          {/* Phòng khám */}
          <Route
            exact
            path="/clinics"
            component={role === "ROLE_ROOT" ? ClinicList : NoAccess}
          />
          <Route
            exact
            path="/clinics/restore"
            component={role === "ROLE_ROOT" ? ClinicRestore : NoAccess}
          />
          <Route
            exact
            path="/clinics/create"
            component={role === "ROLE_ROOT" ? NewClinic : NoAccess}
          />
          <Route
            path="/clinics/:id"
            component={role === "ROLE_ROOT" ? Clinic : NoAccess}
          />

          {/* Chuyên khoa */}
          <Route
            exact
            path="/specialties"
            component={role === "ROLE_ADMIN" ? SpecialtyList : NoAccess}
          />
          <Route
            exact
            path="/specialties/restore"
            component={role === "ROLE_ADMIN" ? SpecialtyRestore : NoAccess}
          />
          <Route
            exact
            path="/specialties/create"
            component={role === "ROLE_ADMIN" ? NewSpecialty : NoAccess}
          />
          <Route
            path="/specialties/:id"
            component={role === "ROLE_ADMIN" ? Specialty : NoAccess}
          />

          {/* Bác sĩ */}
          <Route
            exact
            path="/doctors"
            component={role === "ROLE_ADMIN" ? DoctorList : NoAccess}
          />
          <Route
            exact
            path="/doctors/restore"
            component={role === "ROLE_ADMIN" ? DoctorRestore : NoAccess}
          />
          <Route
            exact
            path="/doctors/create"
            component={role === "ROLE_ADMIN" ? NewDoctor : NoAccess}
          />
          <Route
            path="/doctors/:id"
            component={role === "ROLE_ADMIN" ? Doctor : NoAccess}
          />
        </Switch>
      </div>
    </div>
  );
}
