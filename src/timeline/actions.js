import Splinter from '../shared/models/Splinter';

export const REFRESH_POSTS = 'posts.refresh';
export const refreshPosts = () => async dispatch => {
  dispatch({ type: REFRESH_POSTS });
  try {
    const posts = await Splinter.getTimeline();
    dispatch({ type: REFRESH_POSTS, posts });
  } catch (e) {
    dispatch({ type: REFRESH_POSTS, error: e.message });
  }
}