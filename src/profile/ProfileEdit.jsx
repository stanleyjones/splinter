import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Form } from 'semantic-ui-react';

import { updateProfile } from './actions';
import { getDefaultProfile } from './reducer';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = props.profile || {};
  }

  handleChange(event, { name, value }) { this.setState({ [name]: value }); }

  postForm(event) {
    event.preventDefault();
    this.props.updateProfile(this.state);
  }

  render() {
    const { name, imgUrl, description } = this.state;
    return (
      <div className="ProfileEdit">
        <Form onSubmit={ev => this.postForm(ev)}>

          <Form.Input defaultValue={name} label="Name" name="name" onChange={this.handleChange} />
          <Form.Input defaultValue={imgUrl} label="Avatar URL" name="imgUrl" onChange={this.handleChange} />
          <Form.TextArea defaultValue={description} label="Description" name="description" onChange={this.handleChange} />
          <Divider />
          <Button primary type="submit">Update Profile</Button>
        </Form>
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
