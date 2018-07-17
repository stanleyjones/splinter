import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAccounts, selectAccount } from './actions';
import { getAvailableAccounts, getHasAccounts, getSelectedAccount, getShouldGetAccounts } from './reducer';

class AccountList extends Component {
  componentDidMount() {
    if (this.props.shouldGetAccounts) { this.props.getAccounts(); }
  }

  render() {
    const { availableAccounts, selectAccount } = this.props;
    return (
      <div className="AccountList">
        <ul>{availableAccounts.map(({ username, address }, index) =>
          <li key={index}>
            <span onClick={() => selectAccount(username)}>{username}</span>{' '}
            (<code>{address}</code>)
          </li>
        )}</ul>
        <Link to="/account/create">Create Account</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedAccount: getSelectedAccount(state),
  availableAccounts: getAvailableAccounts(state),
  hasAccounts: getHasAccounts(state),
  shouldGetAccounts: getShouldGetAccounts(state),
});

const mapDispatchToProps = {
  selectAccount,
  getAccounts,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);
