import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="banner d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="col-md-6">
          <h1 className="fw-bold">
            Fashion New <br></br>Collection
          </h1>
          <Link to="/all-products">
            <button className="btn btn-success text-white">Shop Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
