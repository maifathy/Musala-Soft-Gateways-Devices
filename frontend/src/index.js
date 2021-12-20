import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import history from './utils/history.js';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history} location={history.location} navigator={history}>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
