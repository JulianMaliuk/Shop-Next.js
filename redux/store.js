import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import logger from 'redux-logger';
import { useMemo } from 'react'

import {products, cart, delivery} from './reducers';

const middleware = getDefaultMiddleware({
  immutableCheck: true,
  serializableCheck: true,
  thunk: true,
});

if(process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') middleware.push(logger)

function makeStore() {
  return configureStore({
    preloadedState: {},
    reducer: {
      products,
      cart,
      delivery,
    },
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
  });
}

export const wrapper = createWrapper(makeStore, {debug: false});
