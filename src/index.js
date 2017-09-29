import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Router, Route, browserHistory } from 'react-router';
import promise from 'redux-promise';

import App from './components/app';
import WeatherList from './components/weatherList';
import reducers from './reducers';

import requireAuth from './components/require_authentication';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    {/* <BrowserRouter> */}
      {/* <div> */}
        <Router history={ browserHistory }>
          <Route path='/getweather' component={requireAuth(WeatherList)} />
          <Route path='/' component={App} />
        </Router>
      {/* </div> */}
    {/* </BrowserRouter> */}
  </Provider>
  , document.querySelector('.containerApp'));
