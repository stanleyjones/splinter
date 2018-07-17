import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createAccount } from './actions';

class AccountCreate extends Component {
  handleChange({ target: { name, value } }) { this.setState({ [name]: value }); }

  postForm(event) {
    event.preventDefault();
    this.props.createAccount(this.state.username);
  }

  render() {
    return (
      <div className="AccountCreate">
        <form onSubmit={ev => this.postForm(ev)}>
          <label htmlFor="username">Username</label>
          <input name="username" onChange={ev => this.handleChange(ev)} required />
          <button type="submit">Create Account</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  createAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountCreate);
