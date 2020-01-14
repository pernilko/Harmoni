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
import {New, Navigation} from './Containers/Navbar/Components/Navbar';
import {userService} from "./services/UserService";
import {EventList} from './Containers/Event/Components/showEvents';
import {sharedComponentData} from "react-simplified";
import {EventDetails} from './Containers/Event/Components/event';
import {inviteUser} from './Containers/Organization/Components/inviteUser';
import {userForm} from "./Containers/Organization/Components/User";


const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert/>
        <Navigation/>
        <Route path = "/opprettEvent" component = {RegistrationForm}/>
        <Route exact path = "/allEvents" render = {(props) => <EventList user={false}/>}/>
        <Route exact path = "/myEvents" render = {(props) => <EventList user={true}/>}/>
        <Route path = "/Event" component = {RegistrationForm}/>
        <Route path = "/Login" component = {Login}/>
        <Route path = "/RegisterOrganization" component = {RegOrganization}/>
        <Route path = "/user/:token" component = {userForm}/>
        <Route path = "/showEvent/:id" component = {EventDetails}/>
        <Route path = "/inviterBruker" component = {inviteUser}/>
      </div>
    </HashRouter>,
    root
  );
userService.autoLogin();