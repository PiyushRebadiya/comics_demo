import axios from "axios";
import { toast } from "react-toastify";

export const FETCH_LOGIN_REQUEST = "FETCH_LOGIN_REQUEST";
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
export const FETCH_LOGIN_FAILURE = "FETCH_LOGIN_FAILURE";

export const loginRequest = () => ({
  type: FETCH_LOGIN_REQUEST,
});

export const loginSuccess = (data) => ({
  type: FETCH_LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error) => ({
  type: FETCH_LOGIN_FAILURE,
  payload: error,
});

export const userLogin = (data) => {
    // console.log("dataApi");
  return (dispatch) => {
    dispatch(loginRequest());
    axios
      .get("http://localhost:3003/login")
      .then((res) => {
        console.log("apiRes", res);
        const users = res.data
        // console.log("users",users);
        var user1 = users.find(
            (values) =>
              values.user === data.user && values.password === data.password
          );
          console.log(user1);
          if (user1 === undefined) {
            throw res.error;
          }
          toast.success("MY SUCCESS");
          localStorage.setItem("login", JSON.stringify(true));
          localStorage.setItem("user", JSON.stringify(user1));
          localStorage.setItem("token", user1.id);
          dispatch(loginSuccess(user1));
          return res.data;
        })
        .catch((error) => {
        toast.error("MY Error");
        dispatch(loginFailure("error api....",error));
      });
  };
};
