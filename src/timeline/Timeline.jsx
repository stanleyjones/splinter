import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getSelectedAccount } from '../account/reducer';

import Message from './Message';
import { getTimeline, updatePosts } from './actions';
import { getPosts } from './reducer';

class Timeline extends Component {
  componentDidMount() {
    if (this.props.account) { this.props.getTimeline(); }
  }

  render() {
    const { account, getTimeline, posts, updatePosts } = this.props;
    return account ? (
      <div className="Timeline">
        <h2>Timeline</h2>
        <button onClick={() => getTimeline()}>Refresh Posts</button>
        <ul>{posts.map(Message)}</ul>
        <textarea ref={c => { this.ref = c; }} />
        <button onClick={() => updatePosts(this.ref.value)}>Post</button>
      </div>
    ) : <Redirect to="/account" />;
  }
}

const mapStateToProps = state => ({
  account: getSelectedAccount(state),
  posts: getPosts(state),
});

const mapDispatchToProps = {
  getTimeline,
  updatePosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);