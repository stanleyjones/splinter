import Splinter from 'shared/models/Splinter';
import { createAsyncAction } from 'shared/helpers';

export const CREATE_ACCOUNT = 'CREATE Account...';
export const createAccount = createAsyncAction(CREATE_ACCOUNT, username => Splinter.createAccount(username));

export const GET_ACCOUNT = 'GET Account...';
export const getAccount = createAsyncAction(GET_ACCOUNT, () => Splinter.getAccount());

export const GET_ACCOUNTS = 'GET Accounts...';
export const getAccounts = createAsyncAction(GET_ACCOUNTS, () => Splinter.getAccounts());

export const SELECT_ACCOUNT = 'SELECT Account...';
export const selectAccount = createAsyncAction(SELECT_ACCOUNT, username => Splinter.selectAccount(username));