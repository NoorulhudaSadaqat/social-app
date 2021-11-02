import axios from "axios";
import { allPosts, specificPost, isLoggedIn } from "./ActionTypes";
import { allPostsUrl, newPostUrl } from "../public/endpoints";
//Middlewares

export const allPostsMiddleware = () => async (dispatch) => {
  console.log("in all posts middle ware");
  const response = await axios.get(allPostsUrl);
  console.log("all Posts ", response);
  dispatch({
    type: allPosts,
    payload: response,
  });
};

export const isLoggedInMiddleware = () => (dispatch) => {
  const email = localStorage.getItem("email");
  console.log("In logged in middle ware ");
  if (email) {
    dispatch({
      type: isLoggedIn,
      payload: "true",
    });
  } else {
    dispatch({
      type: isLoggedIn,
      payload: "false",
    });
  }
};

export const specificPostMiddleware = () => async (dispatch) => {
  const response = await axios.get(specificPost);
  console.log("specific post ", response);
  dispatch({
    type: specificPost,
    payload: response,
  });
};
