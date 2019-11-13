// ------------------------------------------------------//
// App Index File | Starter Dashboard
// Apollo V2
// David Michael Hogan | November 13, 2019 | Updated:
// ------------------------------------------------------//

import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// not using service workers atm, view serviceWorker.js for more info
serviceWorker.unregister();
