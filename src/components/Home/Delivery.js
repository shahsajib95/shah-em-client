import React from "react";
import { GiSurferVan, GiClockwork } from "react-icons/gi";
import { RiExchangeDollarFill } from "react-icons/ri";

export default function Delivery() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-4 text-center">
          <div className="card bg-danger text-white p-5 m-3">
            <h3>
              <GiSurferVan />
            </h3>
            <h5 className="mt-2">Fast Delivery</h5>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <div className="card bg-danger text-white p-5 m-3">
            <h3>
              <GiClockwork />
            </h3>
            <h5 className="mt-2">Support 24 Hours</h5>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <div className="card bg-danger text-white p-5 m-3">
            <h3>
              <RiExchangeDollarFill />
            </h3>
            <h5 className="mt-2">Back Guarantee</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
