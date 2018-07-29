import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ProfileEdit, ProfileShow } from '.';

const ProfileRouter = props => (
  <Switch>
    <Route component={ProfileEdit} path="/profile/edit" exact />
    <Route component={ProfileShow} path="/profile" />
  </Switch>
);

export default ProfileRouter;
