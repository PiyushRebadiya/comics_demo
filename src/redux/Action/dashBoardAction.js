import axios from "axios";

export const FETCH_DASH_BOARD_REQUEST = "FETCH_DASH_BOARD_REQUEST";
export const FETCH_DASH_BOARD_SUCCESS = "FETCH_DASH_BOARD_SUCCESS";
export const FETCH_DASH_BOARD_FAILURE = "FETCH_DASH_BOARD_FAILURE";

export const dash_BoardRequest = () => ({
  type: FETCH_DASH_BOARD_REQUEST,
});

export const dash_BoardSuccess = (data) => ({
  type: FETCH_DASH_BOARD_SUCCESS,
  payload: data,
});

export const dash_BoardFailure = (error) => ({
  type: FETCH_DASH_BOARD_FAILURE,
  payload: error,
});

export const dash_Board_Api = (comicdata, page) => {
//   console.log("comicdata", comicdata);
//   console.log("page", page);
  return (dispatch) => {
    dispatch(dash_BoardRequest());
    axios
      .get(
        `https://gateway.marvel.com/v1/public/comics?limit=${comicdata}&offset=${page}&ts=1&hash=866ddc8bf8343c53f45a710a0deb34c0&apikey=8b0c1cf5084a6b18d0034b1096ece30d`
      )
      .then((res) => {
        // console.log("apiRes", res);
        const users = res.data;
        // console.log("users", users);
        dispatch(dash_BoardSuccess(users));
        return res.data;
      })
      .catch((error) => {
        dispatch(dash_BoardFailure("error api...."));
      });
  };
};
