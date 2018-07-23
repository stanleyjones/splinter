import Ipfs from 'ipfs';
import OrbitDb from 'orbit-db';

import { NAMESPACE } from 'shared/constants';

import { ipfsConfig, orbitConfig } from './config';

const defaultProfile = {
  description: '',
  imgUrl: 'http://placekitten.com/200/200',
  name: 'Untitled Splinter Account',
};

class Account {
  constructor(username) {
    this.username = username;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const ipfs = new Ipfs(ipfsConfig);
      ipfs.on('error', () => { reject(this.handleError) });
      ipfs.on('ready', async () => {
        this.orbit = new OrbitDb(ipfs);
        this.feed = await this.loadFeed();
        this.feeds = await this.loadFollowFeeds();
        resolve(this.feed);
      });
    });
  }

  async loadFeed(address) {
    const options = address ? { sync: true } : orbitConfig;
    const name = address || `${NAMESPACE}/${this.username}`;
    try {
      const feed = await this.orbit.open(name, options);
      await feed.load();
      return feed;
    } catch (error) {
      this.handleError(error);
    }
  }

  async loadFollowFeeds() {
    const follows = await this.getFollowing();
    return await Promise.all(follows.map(async follow => await this.loadFeed(follow.address)));
  }

  getInfo() {
    return {
      id: this.feed.id,
      address: this.feed.address.root,
    };
  }

  async query(feed = this.feed) {
    return feed.iterator({ limit: -1 }).collect().map(event => event.payload.value);
  }

  async getPosts(feed = this.feed) {
    const messages = await this.query(feed);
    return messages
      .filter(message => message.type === 'post');
  }

  async getProfile() {
    const messages = await this.query();
    return messages
      .filter(message => message.type === 'profile')
      .reduce((profile, { content }) => ({ ...profile, ...content }), defaultProfile);
  }

  async getFollowing() {
    const messages = await this.query();
    return messages
      .filter(message => message.type === 'follow')
      .reduce((following, { content }) => content.follow
        ? [...following, content.account]
        : following,
      []);
  }

  async getTimeline() {
    const myPosts = await this.getPosts();
    const followPosts = await Promise.all(this.feeds.map(async feed => await this.getPosts(feed)));
    return followPosts
      .reduce((posts, feed) => posts.concat(feed), myPosts)
      .sort((a, b) => a.timestamp < b.timestamp ? -1 : 1);
  }

  async update({ type, ...content }) {
    const timestamp = new Date();
    try {
      await this.feed.add({ content, timestamp, type });
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    console.error(error.stack);
  }
}

export default Account;