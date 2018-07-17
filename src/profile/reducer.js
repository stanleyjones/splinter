import { started, success, failure } from 'shared/helpers';
import { UNLOADED, LOADED, LOADING } from 'shared/constants';

import { GET_PROFILE, UPDATE_PROFILE } from './actions';

const initialState = {
  profile: null,
  readyState: UNLOADED,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case started(GET_PROFILE):
    case started(UPDATE_PROFILE):
      return { ...state, readyState: LOADING };

    case success(GET_PROFILE):
    case success(UPDATE_PROFILE):
      return { ...state, profile: payload, readyState: LOADED };

    case failure(GET_PROFILE):
    case failure(UPDATE_PROFILE):
      return { ...state, readyState: LOADED };

    default:
      return state;
  }
}

export const getProfile = state => state.profile;
export const getDefaultProfile = state => getProfile(state).profile;
