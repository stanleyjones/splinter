import { started, success, failure } from 'shared/helpers';
import { LOADED, LOADING, UNLOADED } from 'shared/constants';

import { CREATE_ACCOUNT, GET_ACCOUNTS, SELECT_ACCOUNT } from './actions';

const initialState = {
  available: [],
  readyState: UNLOADED,
  selected: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case started(CREATE_ACCOUNT):
    case started(GET_ACCOUNTS):
      return { ...state, readyState: LOADING };

    case success(CREATE_ACCOUNT):
    case success(GET_ACCOUNTS):
      return { ...state, available: payload, readyState: LOADED };

    case success(SELECT_ACCOUNT):
      return { ...state, selected: payload };

    case failure(CREATE_ACCOUNT):
    case failure(GET_ACCOUNTS):
      return { ...state, readyState: LOADED };

    default:
      return state;
  }
}

const getAccount = state => state.account;

export const getAvailableAccounts = state => getAccount(state).available;
export const getSelectedAccount = state => getAccount(state).selected;
export const getShouldGetAccounts = state => getAccount(state).readyState === UNLOADED;
export const getHasAccounts = state =>
  getAccount(state).readyState === LOADED && getAvailableAccounts(state).length;
