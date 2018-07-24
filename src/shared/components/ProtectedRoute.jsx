import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { getSelectedAccount } from 'account/reducer';

export const ProtectedRoute = ({ account, ...rest }) => {
  return account ? <Route {...rest} /> : <Redirect to="/login" />;
};

const mapStateToProps = state => ({
  account: getSelectedAccount(state),
});

export default connect(mapStateToProps)(ProtectedRoute);
