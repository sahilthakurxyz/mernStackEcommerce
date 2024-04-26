import React from "react";
import "./Loading.css";
const Loading = () => {
  return (
    <div className="loading-page">
      <div className="loader"></div>
      <p>Please wait, your website is loading...</p>
      <p>
        The loading time depends on your internet connection and browser. We
        appreciate your patience.
      </p>
    </div>
  );
};

export default Loading;
