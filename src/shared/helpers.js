import { NAMESPACE } from './constants';

export const throttle = (callback, limit = 1000) => {
  let wait = false;
  return () => {
    if (!wait) {
      callback.call();
      wait = true;
      setTimeout(() => { wait = false; }, limit);
    }
  };
};

export const dehydrate = store => throttle(() => {
  const state = store.getState();
  try {
    localStorage.setItem(`${NAMESPACE}/state`, JSON.stringify(state));
  } catch (e) {
    console.error(e.stack);
  }
});

export const rehydrate = (initState = {}) => {
  return undefined;
  // try {
  //   let rehydratedState = JSON.parse(localStorage.getItem(`${NAMESPACE}/state`));
  //   return { ...initState, ...rehydratedState };
  // } catch (e) {
  //   return initState;
  // }
};

export const success = type => `${type} success!`;
export const failure = type => `${type} failure!`;
export const started = type => type;

const zipPayload = (args, argNames = []) => argNames.reduce((payload, argName, index) =>
  ({ ...payload, [argName]: args[index] }), {});

export const createAction = (type, ...argNames) => (...args) =>
  ({ type, payload: zipPayload(args, argNames) });

export const createAsyncAction = (type, fn, options = {}) => (...args) => async (dispatch) => {
  dispatch({ type });
  try {
    const payload = await fn(...args);
    dispatch({ type: success(type), payload });
  } catch ({ message }) {
    dispatch({ type: failure(type), payload: message, error: true });
  }
};