import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import onePostReducer from "./onePostReducer";

export default combineReducers({
  posts: postsReducer,
  post: onePostReducer,
});
