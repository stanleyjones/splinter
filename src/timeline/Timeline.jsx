import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getSelectedAccount } from '../account/reducer';

import Message from './Message';
import { refreshPosts } from './actions';

class Timeline extends Component {
  componentDidMount() {
    if (this.props.profile) { this.props.refreshPosts(this.props.profile.address); }
  }

  render() {
    const { account, posts, refreshPosts } = this.props;
    return account ? (
      <div className="Timeline">
        <h2>Timeline</h2>
        <ul>{posts.map(Message)}</ul>
        <button onClick={() => refreshPosts(account.address)}>Refresh Posts</button>
      </div>
    ) : <Redirect to="/account" />;
  }
}

const mapStateToProps = state => ({
  account: getSelectedAccount(state),
  posts: state.timeline.posts,
});

const mapDispatchToProps = {
  refreshPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);