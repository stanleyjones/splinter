import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Account from '../account';
import Connect from '../connect/Connect';
import Profile from '../profile';
import Timeline from '../timeline/Timeline';

import Shell from './Shell';

export default ({ store }) => (
  <Provider store={store}>
    <Shell>
      <Switch>
        <Route component={Account} path="/account" />
        <Route component={Connect} path="/connect" />
        <Route component={Profile} path="/profile" />
        <Route component={Timeline} path="/" />
      </Switch>
    </Shell>
  </Provider>
);
