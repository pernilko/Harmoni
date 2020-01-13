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

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert/>
        <Navigation/>
        <Route exact path = "/allEvents" render = {(props) => <EventList user={false}/>}/>
        <Route exact path = "/myEvents" render = {(props) => <EventList user={true}/>}/>
        <Route path = "/Event" component = {RegistrationForm}/>
        <Route path = "/Login" component = {Login}/>
        <Route path = "/RegisterOrganization" component = {RegOrganization}/>
      </div>
    </HashRouter>,
    root
  );
userService.autoLogin();
