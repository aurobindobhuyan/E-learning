import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import image from "../../Home_Page_Images/banner-1.png";
import jsImage from "../../Home_Page_Images/javascript.png";
import reactImage from "../../Home_Page_Images/react.png";
import reduxImage from "../../Home_Page_Images/redux.png";
import mongodbImage from "../../Home_Page_Images/mongodb.jpg";
import htmlImage from "../../Home_Page_Images/HTML&CSS.png";
import expressImage from "../../Home_Page_Images/express.png";
import { Toolbar, Typography } from "@mui/material";

const Home = () => {
  const [restart, setRestart] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const store = useSelector((store) => store.isLoggedIn);

  const arr = [
    "This is a very big line ..........",
    "Short line",
    "Welcome to the website....",
    "This is the second line",
    "This is the third line",
  ];

  useEffect(() => {
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
      const sentence = arr[i];
      let result = "";
      let reverseLoop_IndexTracker = sentence.length;
      setTimeout(() => {
        for (let j = 0; j < sentence.length; j++) {
          const element = sentence[j];
          setTimeout(() => {
            result += element;
            setDisplayName(result);
          }, j * 150);
        }
        let timer_indexTracker = 0;
        for (let index = sentence.length; index >= 0; index--) {
          setTimeout(() => {
            result = result.slice(0, reverseLoop_IndexTracker);
            reverseLoop_IndexTracker = --index;
            setDisplayName(result);
          }, sentence.length * 150 + 150 * timer_indexTracker);
          timer_indexTracker++;
        }
      }, counter);
      counter += sentence.length * 150 * 2 + 1000;
    }
    return () => {
      setDisplayName("");
    };
  }, [restart]);

  useEffect(() => {
    if (displayName === arr[arr.length - 1]) {
      setTimeout(() => {
        setDisplayName("");
        setRestart(!restart);
      }, displayName.length * 200);
    }
  }, [displayName]);

  const parentDiv = {
    display: "flex",
    flexWrap: "wrap",
    width: "60%",
    height: "80%",
  };
  const childDiv = { flex: "1 1 200px", margin: "0 20px", textAlign: "center" };
  const figureTag = { height: "60%" };
  const imageTag = { objectFit: "cover", maxWidth: "100%" };
  const bTag = { fontSize: "20px" };

  return (
    <>
      <div className="appDiv1">
        <img id="backgroundImage" src={image} alt="background" />
        {store ? (
          <div className="appDiv1">
            <Toolbar />
            <h1 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
              POPULAR ONLINE COURSES
            </h1>
            <Typography
              variant="h5"
              style={{
                fontFamily: "sans-serif",
                textAlign: "center",
                color: "rgb(3 149 151)",
              }}
            >
              {displayName}
            </Typography>
            <div style={parentDiv}>
              <div style={childDiv}>
                <figure style={figureTag}>
                  <img style={imageTag} src={jsImage} alt="js image" />
                </figure>
                <br />
                <b style={bTag}>Javascript (ES6)</b>
              </div>
              <div style={childDiv}>
                <figure style={figureTag}>
                  <img style={imageTag} src={reactImage} alt="js image" />
                </figure>
                <br />
                <b style={bTag}>ReactJS</b>
              </div>
              <div style={childDiv}>
                <figure style={figureTag}>
                  <img style={imageTag} src={reduxImage} alt="js image" />
                </figure>
                <br />
                <b style={bTag}>ReduxJS</b>
              </div>
              <div style={childDiv}>
                <figure style={figureTag}>
                  <img style={imageTag} src={htmlImage} alt="js image" />
                </figure>
                <br />
                <b style={bTag}>HTML & CSS</b>
              </div>
              <div style={childDiv}>
                <figure style={figureTag}>
                  <img style={imageTag} src={expressImage} alt="js image" />
                </figure>
                <br />
                <b style={bTag}>ExpressJS</b>
              </div>
              <div style={childDiv}>
                <figure style={figureTag}>
                  <img style={imageTag} src={mongodbImage} alt="js image" />
                </figure>
                <br />
                <b style={bTag}>MongoDB</b>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="appDiv1"
            style={{
              fontFamily: "sans-serif",
              paddingLeft: "50px",
              paddingTop: "50px",
            }}
          >
            <Toolbar />
            <Typography variant="h2">Demo LogIn Credentials</Typography>
            <Typography variant="h3">Demo details for Admin</Typography>
            <h3>Email - aurobindo@gmail.com</h3>
            <h3>Password - secret123</h3>
            <Typography variant="h3">Demo details for student</Typography>
            <h3>Email - ananya@gmail.com</h3>
            <h3>Password - 12345678</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
