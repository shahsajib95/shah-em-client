import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="p-5 text-center d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <div>
        <h1 style={{ fontSize: "5rem" }} className="text-warning">
          404
        </h1>
        <h3 style={{ fontSize: "2rem" }} className="text-warning">
          The page you are looking for is not there
        </h3>
        <Link to="/">
          <button className="btn btn-success text-white m-4 px-5">
            <b>Home</b>
          </button>
        </Link>
      </div>
    </div>
  );
}
