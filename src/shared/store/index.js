import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import app from '../../app/reducer';
import { profile } from '../../profile';
import { account } from '../../account';
import timeline from '../../timeline/reducer';

import { dehydrate, rehydrate } from '../helpers';

const store = createStore(
  combineReducers({ account, app, profile, timeline }),
  rehydrate(),
  composeWithDevTools(applyMiddleware(thunk)),
);

// store.subscribe(dehydrate(store));

export default store;