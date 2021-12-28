import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Global/Loading";
import NotFound from "../components/Global/NotFound";
import Products from "../components/Global/Products/Products";
import SubHeader from "../components/Global/SubHeader/SubHeader";
import ModalAddProduct from "../components/Seller/ModalAddProduct";
import { getParticularStoreProduct } from "../redux/store/action";

export default function SellerStore() {
  const auth = useSelector((state) => state.auth);
  const store = useSelector((state) => state.store);
  const { particularStoreProduct, loading } = store;
  const { sellerId } = useParams();

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getParticularStoreProduct(sellerId));
  }, [dispatch]);
 

  if (auth.user._id !== sellerId || auth.user.role == "customer")
    return <NotFound />;

  if (loading) return <Loading />;
  return (
    <div>
      <SubHeader name={`${auth.user.store}`} />
      <div className="container my-5">
        <div className="text-center my-3">
          <button className="btn btn-success text-white" onClick={handleShow}>
            Add Product
          </button>
        </div>
        {/* Products */}
        {particularStoreProduct.length === 0 && (
          <h3 className="text-center my-5">No Products In Your Store</h3>
        )}
        <div className="row">
          {particularStoreProduct.map((i) => (
            <Products key={i._id} product={i} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ModalAddProduct show={show} handleShow={handleShow} />
    </div>
  );
}
