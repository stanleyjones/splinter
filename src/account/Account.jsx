import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AccountCreate, AccountList } from '.';

export default (props) => (
  <div className="Account">
    <h2>Account</h2>
    <Switch>
      <Route component={AccountCreate} path="/account/create" exact />
      <Route component={AccountList} path="/account" />
    </Switch>
  </div>
);