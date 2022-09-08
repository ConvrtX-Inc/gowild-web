import { retryBaseQuery } from './axios-base';
import { createApi } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist/es/constants';

export const emptySplitApi = createApi({
  baseQuery: retryBaseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({})
});
