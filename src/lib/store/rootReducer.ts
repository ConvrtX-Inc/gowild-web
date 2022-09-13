import authReducer from './auth.slice';
import preferenceReducer from './preferences.slice';
import {combineReducers} from '@reduxjs/toolkit';
import {emptySplitApi} from "../api/empty.api";

const rootReducer = combineReducers({
    auth: authReducer,
    preference: preferenceReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer
});

export default rootReducer;
