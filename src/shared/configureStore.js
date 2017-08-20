// Dependencies
import isomorphicFetch from 'isomorphic-fetch';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Root reducer
import rootReducer from './reducers';

const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function' ? action({ ...deps, dispatch, getState }) : action);

export default function configureStore(initialState) {
  const middleware = [
    thunk,
    injectMiddleware({
      fetch: isomorphicFetch
    }),
    reduxImmutableStateInvariant()
  ];

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
}
