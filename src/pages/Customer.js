import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserForm from "../components/Customer/UserForm";
import NotFound from "../components/Global/NotFound";

export default function Customer() {
  const auth = useSelector((state) => state.auth);

  const { customerId } = useParams();

  if (auth.user._id !== customerId || auth.user.role == 'seller') return <NotFound />;

  return (
    <div className="container my-5">
      <div className="card shadow-sm shadow-sm">
        <div className="row">
          <div className="col-md-4">
            <div className="p-3">
              <img src={auth.user.avatar} alt={auth.user.email} />
              <h5 className="fw-bold mt-5">Details:</h5>
              <p className="mt-4">name: {auth.user.name}</p>
              <p>email: {auth.user.email}</p>
              <p>Address: {auth.user?.address}</p>
            </div>
          </div>
          <div className="col-md-8">
            <div className="p-3">
              <h5 className="fw-bold">Edit Your Details:</h5>
              <UserForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
