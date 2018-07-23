import { createAsyncAction } from 'shared/helpers';
import Splinter from 'shared/models/Splinter';

export const GET_TIMELINE = 'GET Timeline...';
export const getTimeline = createAsyncAction(GET_TIMELINE, () => Splinter.getTimeline());

export const UPDATE_POSTS = 'UPDATE Posts...';
export const updatePosts = createAsyncAction(UPDATE_POSTS, post => Splinter.updatePosts(post));
