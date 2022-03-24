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
import NewClinic from "../../pages/Clinic/NewClinic";

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
          <Route exact path="/clinics/create" component={NewClinic} />
          <Route path="/clinics/:id" component={Clinic} />
        </Switch>
      </div>
    </div>
  );
}
