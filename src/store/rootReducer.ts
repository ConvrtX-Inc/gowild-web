import { reducer as chatReducer } from '../slices/chat';
import { reducer as routeListReducer } from '../slices/route-list';
import { reducer as userListReducer } from '../slices/user-list';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  chat: chatReducer,
  routeList: routeListReducer,
  userList: userListReducer
});

export default rootReducer;
