import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <small><Link to="/profile/edit">edit</Link></small>

        <img alt="avatar" src={profile.imgUrl} />
        <h3>{profile.name}</h3>
        <code>{profile.address}</code>
        <p>{profile.description}</p>
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
