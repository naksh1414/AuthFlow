import React from "react";
import "./index.css";
const Loader = () => {
  return (
    <div className="loader w-full h-screen flex items-center justify-center">
      <span className="loader-text">loading</span>
      <span className="load"></span>
    </div>
  );
};

export default Loader;
