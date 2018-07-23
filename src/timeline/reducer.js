import { started, success, failure } from 'shared/helpers';
import { LOADED, LOADING, UNLOADED } from 'shared/constants';

import { GET_TIMELINE, UPDATE_POSTS } from './actions';

const initialState = {
  posts: [],
  readyState: UNLOADED,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case started(GET_TIMELINE):
    case started(UPDATE_POSTS):
      return { ...state, readyState: LOADING };

    case success(GET_TIMELINE):
    case success(UPDATE_POSTS):
      return { ...state, posts: payload, readyState: LOADED };

    case failure(GET_TIMELINE):
    case failure(UPDATE_POSTS):
      return { ...state, readyState: LOADED };

    default:
      return state;
  }
}

const getTimeline = state => state.timeline;

export const getPosts = state => getTimeline(state).posts;