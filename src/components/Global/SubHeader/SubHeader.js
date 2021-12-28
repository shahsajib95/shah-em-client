import React from "react";

export default function SubHeader({ name }) {
  return (
    <div className="py-5 bg-light d-flex justify-content-center">
      <h3>{name}</h3>
    </div>
  );
}
