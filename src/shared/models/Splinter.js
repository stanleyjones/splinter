import Account from './Account';

import { NAMESPACE } from '../constants';

class Splinter {
  constructor() {
    this.account = null;
  }

  // Accounts

  async createAccount(username) {
    const accounts = this.getAccounts();
    const newAccount = new Account(username);
    await newAccount.init();
    const { address } = newAccount.getInfo();
    return this.saveAccounts([...accounts, { username, address }]);
  }

  getAccounts() { return this.load('accounts'); }

  saveAccounts(accounts) { return this.save('accounts', accounts); }

  async selectAccount(username) {
    const selectedAccount = new Account(username);
    await selectedAccount.init();
    this.account = selectedAccount;
    const { address } = selectedAccount.getInfo();
    return { username, address };
  }

  // Profiles

  async getProfile(address) {
    return await this.account.getProfile();
  }

  async updateProfile(update) {
    await this.account.update({ type: 'profile', ...update });
    return await this.account.getProfile();
  }

  // Timeline

  async getTimeline() {
    return await this.account.getPosts();
  }

  postMessage(message) {
    if (this.status !== 'ready') { return false; }
    this.account.update({ type: 'post', ...message });
  }

  // Helpers

  load(key) {
    try {
      const valueString = localStorage.getItem(`${NAMESPACE}/${key}`);
      const value = JSON.parse(valueString);
      return value;
    } catch (e) {
      this.handleError(e);
    }
  }

  save(key, value) {
    try {
      const valueString = JSON.stringify(value);
      localStorage.setItem(`${NAMESPACE}/${key}`, valueString);
      return value;
    } catch (e) {
      this.handleError(e);
    }
  }

  handleError(e) { console.error(e.stack); }
}

export default new Splinter();
