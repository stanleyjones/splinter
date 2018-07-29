import Splinter from 'shared/models/Splinter';
import { createAsyncAction } from 'shared/helpers';

export const UPDATE_FOLLOWING = 'UPDATE Following...';
export const updateFollowing = createAsyncAction(UPDATE_FOLLOWING, address => Splinter.updateFollowing({ account: { address }, follow: true }));

export const GET_FOLLOWING = 'GET Following...';
export const getFollowing = createAsyncAction(GET_FOLLOWING, address => Splinter.getFollowing(address));

export const GET_PROFILES = 'GET Profiles...';
export const getProfiles = createAsyncAction(GET_PROFILES, () => Splinter.getProfiles());
