import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Global/Loading";
import Products from "../components/Global/Products/Products";
import SubHeader from "../components/Global/SubHeader/SubHeader";
import { getParticularStoreProduct } from "../redux/store/action";

export default function StoreDetails() {
  const store = useSelector((state) => state.store);
  const { particularStoreProduct, loading } = store;

  const { storeId, storeName } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getParticularStoreProduct(storeId));
  }, [dispatch]);

  if(loading) return <Loading/>
  return (
    <div>
      <SubHeader name={`${storeName}`} />
      <div className="container my-5">
        {/* Products */}
        <div className="row">
          {particularStoreProduct.map((i) => (
            <Products key={i._id} product={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
