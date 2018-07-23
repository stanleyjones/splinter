import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFollowing as getFollowed, updateFollowing } from './actions';
import { getFollowing } from './reducer';

class Connect extends Component {
  componentDidMount() {
    this.props.getFollowed();
  }

  render() {
    return (
      <div className="Connect">
        <h2>Connect</h2>

        <h3>Following</h3>
        <ul>{this.props.following.map(account =>
          <li key={account.address}><code>{account.address}</code></li>
        )}</ul>

        <label htmlFor="follow">Follow by Address</label>
        <input name="follow" ref={c => this.ref = c} />
        <button onClick={() => this.props.updateFollowing(this.ref.value)}>Follow</button>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  following: getFollowing(state),
});

const mapDispatchToProps = {
  getFollowed,
  updateFollowing,
};

export default connect(mapStateToProps, mapDispatchToProps)(Connect);
