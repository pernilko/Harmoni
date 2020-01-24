// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { HashRouter, Route} from 'react-router-dom';
import {Login} from "./Containers/Login/Components/login";
import {Alert} from "./widgets";
import {RegistrationForm} from "./Containers/Event/Components/registrationFormEvent";
import {Ticket} from "./Containers/Event/Components/ticketDropdown";
import {Artist} from "./Containers/Event/Components/artist";
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
import {OrgProfile} from "./Containers/Organization/Components/OrganizationProfile";
import {resetPass} from "./Containers/Login/Components/resetPass";
import {ShowTab} from './Containers/Event/Components/showTab';
import {CancelledEvent} from './Containers/Event/Components/cancelledEvent';
import {verifyEmail} from "./Containers/Organization/Components/verifyEmail";
import { createHashHistory } from 'history';
import {OrgProfile2} from "./Containers/Organization/Components/profile2";
const history = createHashHistory();

const root = document.getElementById('root');
//Hovedprogrammet som kjøres på nettsiden. Bestemmer hvilket komponent på nettsiden som kjøres til enhver tid basert på pathing.
if (root)
  ReactDOM.render(
    <HashRouter>
      <div style={{height: "100%"}}>
        <Alert/>
        <Navigation/>
        <Route exact path = "/" render={()=>{
          history.push("/alleEvents");
        }}/>
        <Route path = "/opprettEvent" component = {RegistrationForm}/>
        <Route exact path = "/profile" component = {Profile}/>
        <Route path = "/Event" component = {RegistrationForm}/>
        <Route path = "/login" component = {Login}/>
        <Route path="/editEvent/:event_id" component={EditEvent}/>
        <Route path = "/user/:token" component = {userForm}/>
        <Route path = "/resetPass/:token" component = {resetPass}/>
        <Route path = "/showEvent/:id" component = {EventDetails}/>
        <Route path = "/inviterBruker" component = {inviteUser}/>
        <Route path = "/home" component = {Home}/>
        <Route exact path = "/search_result/:search" component={SearchResults}/>
        <Route path = "/alleEvents" render = {(props) => <ShowTab all={true}/>}/>
        <Route path = "/mineEvents" render = {(props) => <ShowTab all={false}/>}/>
        <Route exact path = "/verifyEmail/:token" component={verifyEmail}/>
        <Route path = "/organizationProfile" component={OrgProfile2}/>
      </div>
    </HashRouter>,
    root
  );

userService.autoLogin();
