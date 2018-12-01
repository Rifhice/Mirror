import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Recognizer from './containers/Recognizer.container'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './history'
import { Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <ConnectedRouter history={history}>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Recognizer} />
              <Redirect to="/" />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
