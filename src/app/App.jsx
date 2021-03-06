import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Account from 'account';
import Connect from 'connect/Connect';
import Profile from 'profile';
import Timeline from 'timeline/Timeline';
import { ProtectedRoute } from 'shared/components';

import Shell from './Shell';

import('semantic-ui-css/semantic.min.css');

const App = ({ store }) => (
  <Provider store={store}>
    <Switch>
      <Route component={Account} path="/login" exact />
      <Route component={Account} path="/register" exact />
      <Route path="/">
        <Shell>
          <Switch>
            <ProtectedRoute component={Connect} path="/connect" />
            <ProtectedRoute component={Profile} path="/profile" />
            <ProtectedRoute component={Timeline} path="/" />
          </Switch>
        </Shell>
      </Route>
    </Switch>
  </Provider>
);

export default App;
