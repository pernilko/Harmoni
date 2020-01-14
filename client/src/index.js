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
import {Navigation} from './Containers/Navbar/Components/Navbar';
import {userService} from "./services/UserService";
import {EventList} from './Containers/Event/Components/showEvents';
import {sharedComponentData} from "react-simplified";
import { Profile } from './Containers/Profile/Components/Profile';

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert/>
        <Navigation/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/profile/editPB" component={Profile}/>
        <Route exact path="/profile/editInfo" component={Profile}/>
        <Route exact path="/profile/editUP" component={Profile}/>
        <Route exact path="/profile/deleteUser" component={Profile}/>

        <Route exact path = "/allEvents" component={EventList}/>
        <Route path = "/Event" component = {RegistrationForm}/>
        <Route path = "/Login" component = {Login}/>
        <Route path = "/RegisterOrganization" component = {RegOrganization}/>
      </div>
    </HashRouter>,
    root
  );
userService.autoLogin();