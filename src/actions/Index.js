import axios from "axios";
import {
  allPosts,
  specificPost,
  isLoggedIn,
  nextPage,
  previousPage,
} from "./ActionTypes";
import { allPostsUrl, newPostUrl } from "../public/endpoints";
//Middlewares
let start = -10,
  limit = 0;
export const allPostsMiddleware = (arrow) => async (dispatch) => {
  if (arrow === "forward") {
    start += 10;
    limit += 10;
  } else if (arrow === "backward") {
    start -= 10;
    limit -= 10;
  }

  console.log("in all posts middle ware");
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
  );
  console.log("all Posts ", response);
  dispatch({
    type: allPosts,
    payload: response.data,
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
