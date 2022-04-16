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

export default function Admin() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          {/* Tài khảo */}
          <Route exact path="/" component={Home} />
          <Route exact path="/accounts" component={AccountList} />
          <Route path="/accounts/:id" component={Account} />

          {/* Phòng khám */}
          <Route exact path="/clinics" component={ClinicList} />
          <Route exact path="/clinics/restore" component={ClinicRestore} />
          <Route exact path="/clinics/create" component={NewClinic} />
          <Route path="/clinics/:id" component={Clinic} />

          {/* Chuyên khoa */}
          <Route exact path="/specialties" component={SpecialtyList} />
          <Route
            exact
            path="/specialties/restore"
            component={SpecialtyRestore}
          />
          <Route exact path="/specialties/create" component={NewSpecialty} />
          <Route path="/specialties/:id" component={Specialty} />

          {/* Bác sĩ */}
          <Route exact path="/doctors" component={DoctorList} />
          <Route exact path="/doctors/restore" component={DoctorRestore} />
          <Route exact path="/doctors/create" component={NewDoctor} />
          <Route path="/doctors/:id" component={Doctor} />
        </Switch>
      </div>
    </div>
  );
}
