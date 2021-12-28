import React from "react";
import CustomLink from "../../Global/CustomLink";
import ArrivalSection from "./ArrivalSection";

export default function Arrivals() {
  return (
    <div className="container my-5">
      <div className="text-center">
        <h5 className="list-inline-item text-secondary">
          New Arrivals
          <hr></hr>
        </h5>
      </div>
      <ArrivalSection />
    </div>
  );
}
