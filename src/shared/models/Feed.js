import { EventEmitter } from 'events';

import { orbitConfig } from './config';

class Feed {
  constructor(orbitdb, address) {
    this.events = new EventEmitter();
    this.loadFeed(orbitdb, address);
  }

  async query() {
    const results = this.db.iterator({ limit: 5 }).collect();
    return results.slice().reverse().map((e) => e.payload.value);
  }

  update(content) {
    const timestamp = new Date();
    const type = 'post';
    try {
      this.db.add({ content, timestamp, type });
    } catch (e) {
      this.handleError(e);
    }
  }

  on(event, callback) { return this.events.on(event, callback); }

  async loadFeed(orbitdb, address) {
    try {
      debugger;
      const options = address ? { sync: true } : orbitConfig;
      const db = await orbitdb.open(address, options);
      db.events.on('ready', this.emit('ready'));
      db.events.on('write', this.emit('update'));
      await db.load();
      this.db = db;
      this.events.emit('loaded');
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) { console.error(error.stack); }

  emit(message) { return () => { this.events.emit(message); }; }
}

export default Feed;