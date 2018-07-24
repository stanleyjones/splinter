import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';

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
        <Card fluid>
          <Image src={profile.imgUrl} />
          <Card.Content>
            <Card.Header>{profile.name}</Card.Header>
            <Card.Meta>{profile.address}</Card.Meta>
            <Card.Description>{profile.description}</Card.Description>
          </Card.Content>
        </Card>
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
