// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { HashRouter, Route} from 'react-router-dom';
import {Login} from "./Containers/Login";
import {Alert} from "./widgets";
import {RegistrationForm} from "./Containers/Event/Components/registrationFormEvent";
import {Ticket} from "./Containers/Event/Components/ticketDropdown";
import {Artist} from "./Containers/Event/Components/artist";
import { RegOrganization } from './Containers/Organization/Components/registerOrgForm';
import {EditEvent} from "./Containers/Event/Components/editEvent";
import {Navigation} from './Containers/Navbar/Components/Navbar';
import {userService} from "./services/UserService";
import {sharedComponentData} from "react-simplified";

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
          <Alert></Alert>
          <Navigation/>
          <Route path = "/registerOrganization" component = {RegOrganization}/>
          <Route path = "/event" component = {RegistrationForm}/>
          <Route path="/editEvent/:event_id" component={EditEvent}/>
          <Route path = "/Login" component={Login}/>
      </div>
    </HashRouter>,
    root
  );
userService.autoLogin();