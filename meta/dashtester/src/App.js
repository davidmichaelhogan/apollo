// ------------------------------------------------------//
// App Container Component | Starter Dashboard
// Apollo V2
// David Michael Hogan | November 13, 2019 | Updated:
// ------------------------------------------------------//

import React, { Component } from 'react';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './Routes';

import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}

// ------------------------------------------------------//
// creates rounded corners on bar graph : dh 11/13/19
// ------------------------------------------------------//
// import validate from 'validate.js';
// import validators from './common/validators';
// validate.validators = {
//   ...validate.validators,
//   ...validators
// };
// ------------------------------------------------------//


// ------------------------------------------------------//
// creates rounded corners on bar graph : dh 11/13/19
// ------------------------------------------------------//
// import { Chart } from 'react-chartjs-2';
// import { chartjs } from './helpers';
// Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
//   draw: chartjs.draw
// });
// ------------------------------------------------------//
