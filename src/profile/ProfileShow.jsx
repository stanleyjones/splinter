import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Image } from 'semantic-ui-react';

import { getProfile } from './actions';
import { getDefaultProfile } from './reducer';

class ProfileShow extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const { profile = {} } = this.props;
    return profile && (
      <div className="ProfileShow">
        <Image centered size="medium" src={profile.imgUrl} />
        <Header as="h2" icon textAlign="center">
          <Header.Content>{profile.name}</Header.Content>
          <Header.Subheader>{profile.description}</Header.Subheader>
        </Header>

        <h3>Posts</h3>
        <code>[RECENT POSTS]</code>

        <h3>Connections</h3>
        <code>[ALL CONNECTIONS]</code>

        <small><Link to="/profile/edit">edit</Link></small>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: getDefaultProfile(state),
});

const mapDispatchToProps = {
  getProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileShow);
