// @flow

import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDOM from 'react-dom';
import * as React from 'react';
import { HashRouter, Route} from 'react-router-dom';
import {LoginCard} from '../src/Containers/Login/Components/index';

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
          <LoginCard bruker=""></LoginCard>
      </div>
    </HashRouter>,
    root
  );