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
import {EditEvent} from "./Containers/Event/Components/editEvent";
import {EventDetails} from './Containers/Event/Components/event';
import {inviteUser} from './Containers/Organization/Components/inviteUser';
import {userForm} from "./Containers/Organization/Components/User";
import { Profile } from './Containers/Profile/Components/Profile';
import {Home} from "./Containers/Home/Components/home";
import {SearchResults} from "./Containers/Navbar/Components/search";
import {OrgProfile} from "./Containers/Organization/Components/Profile";
import {resetPass} from "./Containers/Organization/Components/resetPass";
import {ShowTab} from './Containers/Event/Components/showTab';
import {verifyEmail} from "./Containers/Organization/Components/verifyEmail";
import { createHashHistory } from 'history';
import { NewLogin } from './Containers/Login/Components/newLogin';
const history = createHashHistory();


const root = document.getElementById('root');    
if (root)
  ReactDOM.render(
    <HashRouter>
      <div style={{height: "100%"}}>
        <Alert/>
        <Navigation/>
        <Route path = "/opprettEvent" component = {RegistrationForm}/>
        <Route exact path="/profile" component={Profile}/>
        <Route path = "/Event" component = {RegistrationForm}/>
        <Route path = "/Login" component = {NewLogin}/>

        <Route path = "/RegisterOrganization" component = {RegOrganization}/>
        <Route path="/editEvent/:event_id" component={EditEvent}/>
        <Route exact path = "/event/:id" component = {EventDetails}/>
        <Route path = "/user/:token" component = {userForm}/>
        <Route path = "/resetPass/:token" component = {resetPass}/>
        <Route path = "/showEvent/:id" component = {EventDetails}/>
        <Route path = "/inviterBruker" component = {inviteUser}/>
        <Route path = "/home" component = {Home}/>
        <Route path="/search_result/:search" component={SearchResults}/>
        <Route path = "/organizationProfile" component = {OrgProfile}/>
        <Route exact path = "/alleEvents" render = {(props) => <ShowTab all={true}/>}/>
        <Route exact path = "/mineEvents" render = {(props) => <ShowTab all={false}/>}/>
        <Route path = "/verifyEmail/:token" component={verifyEmail}/>
      </div>
    </HashRouter>,
    root
  );
userService.autoLogin();

if(!localStorage.getItem("token")){
  history.push("/login");
}
