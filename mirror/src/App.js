import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './dashboard'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './history'
import { Route, Switch, Redirect } from "react-router-dom";
import config from './config'
import moment_locale from 'moment/min/locales.min'

global.config = config

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <ConnectedRouter history={history}>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Redirect to="/" />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
