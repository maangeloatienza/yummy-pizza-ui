import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';


import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-globally'
import * as serviceWorker from './serviceWorker';


const globalState = {
  badge: 0
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider globalState={globalState}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
