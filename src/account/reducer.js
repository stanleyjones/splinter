import Splinter from 'shared/models/Splinter';

import { started, success, failure } from 'shared/helpers';
import { LOADED, LOADING, UNLOADED } from 'shared/constants';

import { CREATE_ACCOUNT, GET_ACCOUNT, GET_ACCOUNTS, SELECT_ACCOUNT } from './actions';

const initialState = {
  available: [],
  readyState: UNLOADED,
  selected: Splinter.getAccount(),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case started(CREATE_ACCOUNT):
    case started(GET_ACCOUNT):
    case started(GET_ACCOUNTS):
    case started(SELECT_ACCOUNT):
      return { ...state, readyState: LOADING };

    case success(CREATE_ACCOUNT):
    case success(GET_ACCOUNTS):
      return { ...state, available: payload, readyState: LOADED };

    case success(GET_ACCOUNT):
    case success(SELECT_ACCOUNT):
      return { ...state, selected: payload, readyState: LOADED };

    case failure(CREATE_ACCOUNT):
    case failure(GET_ACCOUNT):
    case failure(GET_ACCOUNTS):
    case failure(SELECT_ACCOUNT):
      return { ...state, readyState: LOADED };

    default:
      return state;
  }
}

const getAccount = state => state.account;

export const getAvailableAccounts = state => getAccount(state).available;
export const getSelectedAccount = state => getAccount(state).selected;

const getReadyState = state => getAccount(state).readyState;
export const getIsLoaded = state => getReadyState(state) === LOADED;
export const getShouldGetAccounts = state => getReadyState(state) === UNLOADED;

export const getHasAccounts = state => getIsLoaded(state) && !!getAvailableAccounts(state).length;
export const getIsLoggedIn = state => getIsLoaded(state) && !!getAccount(state).selected;
