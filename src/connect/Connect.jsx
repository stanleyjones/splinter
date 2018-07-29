import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Form, Image, List, Segment } from 'semantic-ui-react';

import { getSelectedAccount } from '../account/reducer';

import { getFollowing as getFollowed, getProfiles, updateFollowing } from './actions';
import { getFollowing, getAllProfiles } from './reducer';

class Connect extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submitFollow = this.submitFollow.bind(this);
  }

  componentDidMount() {
    this.props.getFollowed();
    this.props.getProfiles();
  }

  handleChange(event, { name, value }) { this.setState({ [name]: value }); }

  submitFollow() {
    const [username, address] = this.state.followAddress.split('@');
    const splinterAddress = `/orbitdb/${address}/splinter/${username}`;
    this.props.updateFollowing(splinterAddress);
  }

  render() {
    const { username, address } = this.props.account;
    return (
      <div className="Connect">
        <h2>Connect</h2>

        <h3>Your Splinter Address</h3>
        <Segment inverted><code>{username}@{address}</code></Segment>
        <p>Share this address with someone if they'd like to follow you.</p>

        <Divider />

        <h3>Follow Someone</h3>

        <Form>
          <Form.Input label="Splinter Address" name="followAddress" onChange={this.handleChange} />
          <Button onClick={this.submitFollow}>Follow</Button>
        </Form>

        <Divider />

        <h3>Your Connections <small>({this.props.profiles.length})</small></h3>
        <List>
          {this.props.profiles.map((profile, index) =>
          <List.Item key={index}>
            <Image avatar src={profile.imgUrl} />
            <List.Content>
              <List.Header>{profile.name}</List.Header>
              <List.Description>{profile.description}</List.Description>
            </List.Content>
          </List.Item>
          )}
        </List>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  account: getSelectedAccount(state),
  following: getFollowing(state),
  profiles: getAllProfiles(state),
});

const mapDispatchToProps = {
  getFollowed,
  getProfiles,
  updateFollowing,
};

export default connect(mapStateToProps, mapDispatchToProps)(Connect);
