import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Icon, Menu } from 'semantic-ui-react';

import { getAccount } from '../account/actions';
import { getShouldGetAccounts } from '../account/reducer';

import './Shell.css';

class Shell extends Component {
  componentDidMount() { if (this.props.shouldGetAccounts) { this.props.getAccount(); } }

  render() {
    return (
      <Container className="Shell">
        <Menu borderless color="yellow" fixed="top">
          <Menu.Item>SPLINTR</Menu.Item>
          <Menu.Item position="right"><Icon name="edit" /></Menu.Item>
        </Menu>

        {this.props.children}

        <Menu color="yellow" fixed="bottom" fluid icon="labeled" widths={4}>
          <Menu.Item as={Link} to="/profile"><Icon name="user" />Profile</Menu.Item>
          <Menu.Item as={Link} to="/"><Icon name="list" />Timeline</Menu.Item>
          <Menu.Item as={Link} to="/connect"><Icon name="share" />Connect</Menu.Item>
        </Menu>

      </Container>
    );
  }
}

const mapStateToProps = state => ({
  shouldGetAccounts: getShouldGetAccounts(state),
});

const mapDispatchToProps = {
  getAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Shell);
