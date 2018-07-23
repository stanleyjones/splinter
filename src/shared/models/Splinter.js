import Account from './Account';

import { NAMESPACE } from '../constants';

class Splinter {
  constructor() {
    this.account = null;
    const savedAccount = this.load('account');
    if (savedAccount) { this.selectAccount(savedAccount); }
  }

  // Accounts

  async createAccount(username) {
    const accounts = this.getAccounts();
    const newAccount = new Account(username);
    await newAccount.init();
    const { address } = newAccount.getInfo();
    return this.saveAccounts([...accounts, { username, address }]);
  }

  getAccount() {
    const savedAccount = this.load('account');
    if (!this.account) { this.selectAccount(savedAccount.username); }
    return savedAccount;
  }

  getAccounts() { return this.load('accounts'); }

  saveAccounts(accounts) { return this.save('accounts', accounts); }

  async selectAccount(username) {
    const selectedAccount = new Account(username);
    await selectedAccount.init();
    this.account = selectedAccount;
    this.save('account', { username, address });
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
    return await this.account.getTimeline();
  }

  async updatePosts(text) {
    await this.account.update({ type: 'post', text });
    return await this.account.getTimeline();
  }

  // Social

  async getFollowing() {
    return await this.account.getFollowing();
  }

  async updateFollowing(update) {
    await this.account.update({ type: 'follow', ...update });
    return await this.account.getFollowing();
  }

  // Helpers

  load(key, defaultValue = null) {
    try {
      const valueString = localStorage.getItem(`${NAMESPACE}/${key}`);
      const value = JSON.parse(valueString);
      return value;
    } catch (error) {
      console.error(error.stack);
      return defaultValue;
    }
  }

  save(key, value) {
    try {
      const valueString = JSON.stringify(value);
      localStorage.setItem(`${NAMESPACE}/${key}`, valueString);
      return value;
    } catch (error) {
      console.error(error.stack);
    }
  }
}

export default new Splinter();
