import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ProfileEdit, ProfileShow } from '.';

export default (props) => (
  <div className="Profile">
    <h2>Profile</h2>
    <Switch>
      <Route component={ProfileEdit} path="/profile/edit" exact />
      <Route component={ProfileShow} path="/profile" />
    </Switch>
  </div>
);