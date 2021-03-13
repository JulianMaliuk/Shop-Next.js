import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { useMemo } from 'react'

import {products, cart, delivery} from './reducers';

const middleware = getDefaultMiddleware({
  immutableCheck: true,
  serializableCheck: true,
  thunk: true,
});

if(process.env.NODE_ENV !== 'production') middleware.push(logger)

let store;

function initStore(initialState) {
  return configureStore({
    // preloadedState: {},
    reducer: {
      products,
      cart,
      delivery,
    },
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
  });
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    console.log('preloadedState')
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store

  if (!store) {
    
  }

  // Create the store once in the client
  if (!store) {
    store = _store
  }

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
