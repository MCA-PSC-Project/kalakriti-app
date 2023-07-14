import React from "react";
import "./Loading.css";
import Logo from "../../assets/logo.jpeg";

function Loading() {
  return (
    <div className="loading-container">
      <img className="loading-image" src={Logo} alt="Loading" />
    </div>
  );
}

export default Loading;
