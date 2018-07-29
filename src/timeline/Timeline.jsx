import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Feed, Form, Icon, Modal } from 'semantic-ui-react';

import Message from './Message';
import { getTimeline, updatePosts } from './actions';
import { getPosts } from './reducer';

class Timeline extends Component {
  constructor() {
    super();
    this.state = { post: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.account) { this.props.getTimeline(); }
    this.interval = setInterval(this.props.getTimeline, 30000);
  }

  handleChange(event, { value }) { this.setState({ post: value }); }

  render() {
    const { getTimeline, posts, updatePosts } = this.props;
    return (
      <div className="Timeline">
        <Button basic fluid icon onClick={() => getTimeline()}><Icon name="refresh" /></Button>
        <Feed>{posts.map(Message)}</Feed>

        <Modal open={false}>
          <Modal.Content>
            <Form>
              <Form.TextArea onChange={this.handleChange} />
              <Button attached="bottom" onClick={() => updatePosts(this.state.post)}>Post</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: getPosts(state),
});

const mapDispatchToProps = {
  getTimeline,
  updatePosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);