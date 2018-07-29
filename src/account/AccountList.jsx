import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, List, Message } from 'semantic-ui-react';

import { getAccounts, selectAccount } from './actions';
import { getAvailableAccounts, getHasAccounts, getSelectedAccount, getShouldGetAccounts } from './reducer';

class AccountList extends Component {
  componentDidMount() {
    if (this.props.shouldGetAccounts) { this.props.getAccounts(); }
    this.interval = setInterval(this.props.getAccounts, 3000);
  }

  componentWillUnmount() { clearInterval(this.interval); }

  render() {
    const { availableAccounts, hasAccounts, selectAccount } = this.props;
    return (
      <div className="AccountList">
        {hasAccounts && (
        <div>
          <Message>Please select an existing account or create a new one.</Message>
          <List relaxed selection >
            {availableAccounts.map(({ username = 'Untitled', address }, index) =>
            <List.Item key={index}>
              <List.Header as={Link} to="/" onClick={() => selectAccount(username)}>{username}</List.Header>
              <List.Description><b>Address:</b> <code>{address}</code></List.Description>
            </List.Item>
            )}
          </List>
        </div>
        )}
        {!hasAccounts && <Message>No existing accounts found. Please create a new one.</Message>}
        <Divider />
        <Button as={Link} primary to="/register">New Account</Button>
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
