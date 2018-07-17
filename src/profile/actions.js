import Splinter from 'shared/models/Splinter';
import { createAsyncAction } from 'shared/helpers';

export const GET_PROFILE = 'GET Profile...';
export const getProfile = createAsyncAction(GET_PROFILE, address => Splinter.getProfile(address));

export const UPDATE_PROFILE = 'UPDATE Profile...';
export const updateProfile = createAsyncAction(UPDATE_PROFILE, update => Splinter.updateProfile(update));
