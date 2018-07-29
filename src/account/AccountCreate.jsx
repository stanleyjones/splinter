import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, Message, Segment } from 'semantic-ui-react';

import { createAccount } from './actions';

class AccountCreate extends Component {
  constructor() {
    super();
    this.state = { username: '', sanitized: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(username) {
    const sanitized = username.replace(/\W*/g, '').toLowerCase();
    this.setState({ username, sanitized });
  }

  postForm(event) {
    event.stopPropagation();
    this.props.createAccount(this.state.sanitized);
  }

  render() {
    return (
      <Form>
        <Message>Choose a username for this account.</Message>
        <Form.Input label="Username" name="username" onChange={(event, { value }) => this.handleChange(value)} required />
        <Segment inverted><code>{this.state.sanitized}</code>&nbsp;</Segment>
        <Button as={Link} disabled={this.state.username === ''} onClick={event => this.postForm(event)} primary to="/">Create Account</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  createAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountCreate);
