import React from "react";
import "./Loader.css"
const Loader = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center loader">
      <div className="spinner-border" role="status"></div>
      <span className="mt-4">Loading...</span>
    </div>
  );
};

export default Loader;
