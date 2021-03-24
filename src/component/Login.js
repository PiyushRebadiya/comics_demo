import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../css/login.css";
import { userLogin } from "../redux/Action/loginAction";

const Login = () => {
  const [arr, setArr] = useState({ user: "", password: 0 });
  const [blank, setBlank] = useState(false);
  const [username, setUsername] = useState(false);
  const [pass, setPass] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [chekBoxShow, setChekBoxShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    userLogin();
    loginChecked();
  }, []);

  const usernameChange = (e) => {
    let item = e.target.value;
    let symbol = item.indexOf("@");
    let dot = item.lastIndexOf(".");
    if (symbol < 1) {
      setUsername(true);
    } else if (dot <= symbol + 4) {
      setUsername(true);
    } else if (dot === item.length - 1) {
      setUsername(true);
    } else {
      setUsername(false);
      setArr({ ...arr, user: e.target.value });
    }
  };

  const passwordChange = (e) => {
    var item = e.target.value;
    var numbers = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,10}$/;
    if (item.match(numbers)) {
      setArr({ ...arr, password: e.target.value });
      setPass(false);
    } else {
      setPass(true);
    }

    if (item.length > 0) {
      setChekBoxShow(true);
    } else {
      setChekBoxShow(false);
    }
  };

  const passwordToggle = () => {
    setHidden(!hidden);
  };

  const loginChecked = () => {
    const token = JSON.parse(localStorage.getItem("login"));
    if (token) {
      setBlank(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("data", arr);
    const { user, password } = arr;
    if (user && password) {
      dispatch(userLogin(arr));
      setTimeout(() => {
        loginChecked();
      }, 2000);
    } else {
      toast.error("Error!!!");
      setArr({ user: "", password: "" });
    }
  };

  if (blank) {
    return <Redirect to="/dash" />;
  }

  return (
    <>
      <div className="login">
        <h2>Sign Up</h2>
        <br />
        <input type="text" placeholder="username" onChange={usernameChange} />
        <br />
        {username && <p>User is invalid!!!</p>}
        <br />
        <input
          type={hidden ? "text" : "password"}
          placeholder="password"
          onChange={passwordChange}
        />
        <br />
        {pass && <p>Invalid Password!!!</p>}
        {chekBoxShow && (
          <label>
            show Password
            <input type="checkbox" onClick={passwordToggle} />
          </label>
        )}
        <br />
        <input
          type="submit"
          value="Login"
          className="btn btn-dark"
          onClick={submitHandler}
        />
        <br />
        <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default Login;
