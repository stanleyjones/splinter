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
        this.feed = await this.loadFeed(this.address);
        resolve(this.feed);
      });
    });
  }

  async loadFeed() {
    try {
      const feed = await this.orbit.open(`${NAMESPACE}/${this.username}`, orbitConfig);
      await feed.load();
      return feed;
    } catch (error) {
      this.handleError(error);
    }
  }

  getInfo() {
    return {
      address: this.feed.address.root,
    };
  }

  async query() {
    return this.feed.iterator({ limit: -1 }).collect().map(event => event.payload.value);
  }

  async getPosts() {
    const messages = await this.query();
    return messages
      .filter(message => message.type === 'post');
  }

  async getProfile() {
    const messages = await this.query();
    return messages
      .filter(message => message.type === 'profile')
      .reduce((profile, message) => ({ ...profile, ...message.content }), defaultProfile);
  }

  update({ type, ...content }) {
    const timestamp = new Date();
    try {
      this.feed.add({ content, timestamp, type });
    } catch (error) {
      this.handleError(error);
    }
  }

  on(event, callback) { return this.events.on(event, callback); }

  setup() {
    const ipfs = new Ipfs(ipfsConfig);
    ipfs.on('error', this.handleError);
    ipfs.on('ready', this.setupOrbit.bind(this));
      // () => {
      // const orbit = new OrbitDb(ipfs);
      // this.feed = new Feed(orbit, this.address || this.username);
      // this.feed.on('ready', this.emit('ready'));
      // this.feed.on('write', this.emit('write'));
      // this.events.emit('ipfs.ready');
    // });

    // this.on('orbit.ready', this.loadFeed.bind(this));
  }

  async _setupOrbit() {
    const orbit = new OrbitDb(this.ipfs);
    try {
      const options = this.address ? { sync: true } : orbitConfig;
      const db = await orbit.open(this.name, options);
      db.events.on('ready', this.emit('ready'));
      db.events.on('write', this.emit('update'));
      await db.load();
      this.db = db;
      this.events.emit('loaded');
      this.events.emit('orbit.ready');
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    console.error(error.stack);
  }

  emit(message) {
    return () => { this.events.emit(message); }
  }
}

export default Account;