import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Global/Loading";
import Products from "../components/Global/Products/Products";
import SubHeader from "../components/Global/SubHeader/SubHeader";
import { getProducts } from "../redux/product/action";

export default function AllProducts() {
  const { products, loading } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if(loading) return <Loading />
  return (
    <>
      <SubHeader name={"All Products"} />
      <div className="container my-5">
        <div className="row">
          {products.map((i) => (
            <Products key={i._id} product={i} />
          ))}
        </div>
      </div>
    </>
  );
}
