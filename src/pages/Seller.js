import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SellerForm from "../components/Seller/SellerForm";
import NotFound from "../components/Global/NotFound";
import SubHeader from "../components/Global/SubHeader/SubHeader";

export default function Seller() {
  const auth = useSelector((state) => state.auth);

  const { sellerId } = useParams();

  if (auth.user._id !== sellerId || auth.user.role == "customer")
    return <NotFound />;

  return (
    <>
      <SubHeader name={"Seller" + ' ' +auth.user.name }/>
      <div className="container my-5">
        <div className="card shadow-sm shadow-sm">
          <div className="row">
            <div className="col-md-4">
              <div className="p-3">
                <img src={auth.user.avatar} alt={auth.user.email} />
                <p className="mt-4">Name: {auth.user.name}</p>
                <p>Email: {auth.user.email}</p>
                <p>Store: {auth.user?.store}</p>
              </div>
            </div>
            <div className="col-md-8">
              <div className="p-3">
                <h5 className="fw-bold">Edit Your Details</h5>
                <SellerForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
