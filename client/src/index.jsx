import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import store from './redux/store.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import rootReducer from './redux/reducers';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(<Provider store={store}><MuiThemeProvider><App /></MuiThemeProvider></Provider>, document.getElementById('root'));
