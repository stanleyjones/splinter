import { REFRESH_POSTS } from './actions';

const initialState = {
  posts: [
    { timestamp: 1531058247, content: 'test post' },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {

    case REFRESH_POSTS:
      return { ...state, posts: action.posts ? action.posts : state.posts };

    default:
      return state;
  }
}