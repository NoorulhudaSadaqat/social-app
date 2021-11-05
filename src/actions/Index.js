import axios from "axios";
import {
  allPosts,
  specificPost,
  isLoggedIn,
  viewComments,
} from "./ActionTypes";
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

  //console.log("in all posts middle ware");
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
  //console.log("In logged in middle ware ");
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

export const specificPostMiddleware = (id) => async (dispatch) => {
  console.log("in specific post middleware");
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  dispatch({
    type: specificPost,
    payload: response.data,
  });
};

export const deletePostMiddleware = (postId) => async (dispatch) => {
  const res = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/:${postId}`
  );
};

export const editPostMiddleware = (postId, post) => async (dispatch) => {
  const res = await axios.put(
    `https://jsonplaceholder.typicode.com/posts/:${postId}`,
    post
  );
  console.log("respose of put API :", res);
};

export const viewCommentsMiddleware = (id) => async (dispatch) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/:${id}/comments`
  );
  console.log("comments middleware response  : ", response);
  dispatch({
    type: viewComments,
    payload: response.data,
  });
};

export const newPostMiddleware = () => async (dispatch) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts/:postId"
  );
  console.log("repsonse of new post : ", response);
};
