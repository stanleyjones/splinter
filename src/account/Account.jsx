import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { AccountCreate, AccountList } from '.';

import './Account.css';

const AccountRouter = props => (
  <Container className="Account">
    <Switch>
      <Route component={AccountCreate} path="/register" exact />
      <Route component={AccountList} path="/login" />
    </Switch>
  </Container>
);

export default AccountRouter;
