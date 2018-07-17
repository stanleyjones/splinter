import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSelectedAccount } from '../account/reducer';

class Shell extends Component {
  render() {
    const { account, children } = this.props;
    return (
      <div className="container">

        <h1>Splinter</h1>

        {account && (
          <p>
            <b>Account:</b>{' '}
            <Link to="/account">{account.username}</Link>{' '}
            (<code>{account.address}</code>)
          </p>
        )}

        {children}

        <p>
          <Link to="/profile">Profile</Link>{' '}|{' '}
          <Link to="/">Timeline</Link>{' '}|{' '}
          <Link to="/connect">Connect</Link>
        </p>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  account: getSelectedAccount(state)
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Shell);
