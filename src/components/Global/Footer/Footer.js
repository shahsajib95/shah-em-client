import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-light py-5">
      <div className=" container">
        <div className="row">
          <div className="col-md-4">
            <h4>Contact</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing sed do eiusmod
              tempor incididun
            </p>
            <small>Address: Demo Street, DEMO, DM 12345 - USA. </small>
            <br></br>
            <small>Call to: (000) 000 000 000-000</small>
            <br></br>
            <small>Mail to: yourmail@example.com</small>
          </div>
          <div className="col-md-4">
            <h4>Pages</h4>
            <Link to="/all-products">
              <small>Shop Now</small>
            </Link>
            <br></br>
            <Link to="/store">
              <small>Store</small>
            </Link>
            <br></br>
            <Link to="/contact">
              <small>Contact</small>
            </Link>
          </div>
          <div className="col-md-4">
            <h4>Newsletter</h4>
            <p>Get E-mail updates about our latest shop and special offers.</p>
            <input placeholder="Enter Your Mail" className="form-control" />
            <button
              className="btn btn-danger text-white mt-3"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
