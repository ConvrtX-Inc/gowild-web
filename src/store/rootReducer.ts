import { combineReducers } from "@reduxjs/toolkit";
import { reducer as chatReducer } from "../slices/chat";
import { reducer as routeListReducer } from "../slices/route-list";

const rootReducer = combineReducers({
  chat: chatReducer,
  routeList: routeListReducer,
});

export default rootReducer;
