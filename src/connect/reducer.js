import { started, success, failure } from 'shared/helpers';
import { LOADED, LOADING, UNLOADED } from 'shared/constants';

import { GET_FOLLOWING, UPDATE_FOLLOWING } from './actions';

const initialState = {
  following: [],
  readyState: UNLOADED,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case started(GET_FOLLOWING):
    case started(UPDATE_FOLLOWING):
      return { ...state, readyState: LOADING };

    case success(GET_FOLLOWING):
    case success(UPDATE_FOLLOWING):
      return { ...state, following: payload, readyState: LOADED };

    case failure(GET_FOLLOWING):
    case failure(UPDATE_FOLLOWING):
      return { ...state, readyState: LOADED };

    default:
      return state;
  }
}

const getConnect = state => state.connect;

export const getFollowing = state => getConnect(state).following;