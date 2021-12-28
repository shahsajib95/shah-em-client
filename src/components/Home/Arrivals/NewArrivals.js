import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/product/action";
import Products from "../../Global/Products/Products";

export default function NewArrivals() {
  const { products, loading } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div>
      {loading && <h1 className="text-center my-5">...Loading...</h1>}
      <div className="row">
        {products.slice(0, 12).map((i) => (
          <Products key={i._id} product={i} />
        ))}
      </div>
    </div>
  );
}
