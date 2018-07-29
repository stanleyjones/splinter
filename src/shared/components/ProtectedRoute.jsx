import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import { getIsLoaded, getIsLoggedIn } from 'account/reducer';

export const ProtectedRoute = ({ isLoaded, isLoggedIn, ...rest }) =>
  isLoaded
    ? isLoggedIn
      ? <Route {...rest} />
      : <Redirect to="/login" />
    : <Loader active />;

const mapStateToProps = state => ({
  isLoaded: getIsLoaded(state),
  isLoggedIn: getIsLoggedIn(state),
});

export default connect(mapStateToProps)(ProtectedRoute);
