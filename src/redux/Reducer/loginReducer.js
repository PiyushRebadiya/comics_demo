import {
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
} from "../Action/loginAction";

const initialState = {
  userData: [],
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LOGIN_SUCCESS:
      console.log("success called");
      return {
        ...state,
        loading: false,
        userData: action.payload,
        error: "",
      };
    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        userData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
