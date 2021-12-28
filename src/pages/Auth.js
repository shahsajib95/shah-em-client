import React from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import SubHeader from "../components/Global/SubHeader/SubHeader";

export default function Auth() {
  return (
    <div>
      <SubHeader name={"Login | Register"} />
      <div className="container">
        <div className="row my-5">
          <div className="col-md-6">
            <Login />
          </div>
          <div className="col-md-6">
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
}
