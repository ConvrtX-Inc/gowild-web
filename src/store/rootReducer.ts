import { combineReducers } from "@reduxjs/toolkit";
import { reducer as chatReducer } from "../slices/chat";

const rootReducer = combineReducers({
  chat: chatReducer,
});

export default rootReducer;
