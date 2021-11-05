import { editPost, specificPost } from "../actions/ActionTypes";

const initialState = {
  title: "",
  body: "",
};

const onePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case specificPost:
      return { title: action.payload.title, body: action.payload.body };
    case editPost:
      return { title: action.payload, body: action.payload.body };
    default:
      return state;
  }
};

export default onePostReducer;
