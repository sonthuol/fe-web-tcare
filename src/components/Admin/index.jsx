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

export default function Admin() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/accounts" component={AccountList} />
          <Route path="/accounts/:id" component={Account} />

          <Route exact path="/clinics" component={ClinicList} />
          <Route exact path="/clinics/restore" component={ClinicRestore} />
          <Route exact path="/clinics/create" component={NewClinic} />
          <Route path="/clinics/:id" component={Clinic} />

          <Route exact path="/specialties" component={SpecialtyList} />
          <Route
            exact
            path="/specialties/restore"
            component={SpecialtyRestore}
          />
          <Route exact path="/specialties/create" component={NewSpecialty} />
          <Route path="/specialties/:id" component={Specialty} />
          <Route exact path="/doctors" component={DoctorList} />
        </Switch>
      </div>
    </div>
  );
}
