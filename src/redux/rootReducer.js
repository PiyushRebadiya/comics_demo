import { combineReducers } from "redux";
import { loginReducer } from "./Reducer/loginReducer";
import { dash_Board_Reducer } from "./Reducer/dashBoardReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  comic: dash_Board_Reducer,
});

export default rootReducer;
