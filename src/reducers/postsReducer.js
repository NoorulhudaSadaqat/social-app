import { allPosts, specificPost, isLoggedIn } from "../actions/ActionTypes";

const intialState = {
  allPostsData: [],
  isLoggedIn: false,
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case allPosts:
      return { ...state, allPostsData: action.payload };
    case isLoggedIn:
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
};

export default reducer;
