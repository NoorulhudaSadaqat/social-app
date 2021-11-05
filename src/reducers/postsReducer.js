import { allPosts, isLoggedIn, viewComments } from "../actions/ActionTypes";

const intialState = {
  allPostsData: [],
  isLoggedIn: false,
  comments: [],
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case allPosts:
      return { ...state, allPostsData: action.payload };
    case isLoggedIn:
      return { ...state, isLoggedIn: action.payload };
    case viewComments:
      return { ...state, comments: action.payload };
    default:
      return state;
  }
};

export default reducer;
