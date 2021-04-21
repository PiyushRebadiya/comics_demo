import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { Redirect, Link } from "react-router-dom";

import {
  dash_Board_Api,
  dash_BoardSuccess,
} from "../redux/Action/dashBoardAction";
import "../css/dashboard.css";
import { toast } from "react-toastify";

const DashBoard = () => {
  var subtitle;
  const [comicdata, setComicData] = useState(10);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [blank, setBlank] = useState({ img: "", title: "", details: "" });
  const [login, setLogIn] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("login"));
    // console.log("token", token);
    // console.log("token", typeof token);
    if (token === null) {
      setLogIn(true);
    }
  }, []);

  const scrollTOEnd = () => {
    setComicData(comicdata + 10);
    // setPage(page + 1);
  };

  window.onscroll = function () {
    let scrollingDown =
      document.documentElement.scrollTop <
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    if (scrollingDown === false) {
      scrollTOEnd();
    }
  };

  const result = useSelector((state) => state.comic.comicsData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dash_Board_Api(comicdata, page));
    // dispatch(dash_BoardSuccess());
  }, [comicdata, page]);

  const showData = (data, detail) => {
    // console.log("apidata", data);
    // console.log("details", detail);
    setBlank({
      img: data.thumbnail.path + "." + data.thumbnail.extension,
      title: data.title,
      details: detail,
    });
    setIsOpen(true);
  };
  //   console.log("arrrrrr", blank);

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
    setBlank({ img: "", title: "", details: "" });
  }

  const homePage = () => {
    toast.info("Home Page.")
  }

  if (login) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="container">
        <Link to="/logout">
          <button className="btn btn-danger" onClick={homePage}>Log out</button>
        </Link>
        <div className="row">
          {result &&
            result.data &&
            result.data.results.map((item) => {
              console.log("appppppp", item);
              return (
                <div className="col-md-3 col-sm-6 pb-3 mainDiv">
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={item.thumbnail.path + "." + item.thumbnail.extension}
                      alt="Card image cap"
                      onClick={() => showData(item, item.description)}
                    />
                    <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                      className="modelClass"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <img
                            className="card-img-top"
                            src={blank.img}
                            alt="Card image cap"
                            style={{ height: 800, width: 500 }}
                          />
                        </div>
                        <div className="col-md-6">
                          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                            {blank.title}
                          </h2>
                          <div>{blank.details}</div>
                          <button
                            onClick={closeModal}
                            className="btn btn-primary"
                          >
                            close
                          </button>
                        </div>
                      </div>
                    </Modal>
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default DashBoard;
