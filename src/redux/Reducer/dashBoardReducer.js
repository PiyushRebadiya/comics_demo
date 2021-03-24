import {
  FETCH_DASH_BOARD_REQUEST,
  FETCH_DASH_BOARD_SUCCESS,
  FETCH_DASH_BOARD_FAILURE,
} from "../Action/dashBoardAction";

const initialState = {
  comicsData: [],
};

export const dash_Board_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASH_BOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DASH_BOARD_SUCCESS:
      console.log("success called");
      return {
        ...state,
        loading: false,
        comicsData: action.payload,
        error: "",
      };
    case FETCH_DASH_BOARD_FAILURE:
      return {
        ...state,
        loading: false,
        comicsData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
