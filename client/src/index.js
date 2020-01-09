// @flow

//import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import * as React from 'react';
import { HashRouter, Route} from 'react-router-dom';
import {Login} from "./Containers/Login";
import {Alert} from "./widgets";
import {RegistrationForm} from "./Containers/Event/Components/registrationFormEvent";


const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
          <Alert></Alert>
          <Route path = "/registerEvent" component={RegistrationForm}/>
      </div>
    </HashRouter>,
    root
  );

//Remember to add <Login></Login>