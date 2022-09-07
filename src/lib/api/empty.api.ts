// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { retryBaseQuery } from './axios-base';
import { createApi } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist/es/constants';

export const emptySplitApi = createApi({
  baseQuery: retryBaseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({})
});
