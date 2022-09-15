import { emptySplitApi } from '../api/empty.api';
import authReducer from './auth.slice';
import preferenceReducer from './preferences.slice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth: authReducer,
  preference: preferenceReducer,
  [emptySplitApi.reducerPath]: emptySplitApi.reducer
});

export default rootReducer;
