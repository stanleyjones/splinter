import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateProfile } from './actions';
import { getDefaultProfile } from './reducer';

class ProfileEdit extends Component {
  handleChange({ target: { name, value } }) { this.setState({ [name]: value }); }

  postForm(event) {
    event.preventDefault();
    this.props.updateProfile(this.state);
  }

  render() {
    return (
      <div className="ProfileEdit">
        <form onSubmit={ev => this.postForm(ev)}>

          <p>
            <label htmlFor="name">Name</label>
            <input name="name" onChange={ev => this.handleChange(ev)} />
          </p>

          <p>
            <label htmlFor="imgUrl">Avatar URL</label>
            <input name="imgUrl" onChange={ev => this.handleChange(ev)} />
          </p>

          <p>
            <label htmlFor="description">Description</label>
            <textarea name="description" onChange={ev => this.handleChange(ev)} />
          </p>

          <button type="submit">Update Profile</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: getDefaultProfile(state),
});

const mapDispatchToProps = {
  updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
