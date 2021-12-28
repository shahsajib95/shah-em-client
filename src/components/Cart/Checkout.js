import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import ProcessPayment from "../Payment/ProcessPayment";
import { postData } from "../../utils/api";
import { addCToCartData } from "../../redux/cart/reducer";
import { notifyError, notifyLoading } from "../../redux/notify/action";

export default function Checkout({ total }) {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const shipping = 60;
  const allTotal = total + shipping + (total / 100) * 20;

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePaymentSuccess = async (paymentId) => {
    dispatch(notifyLoading(true));
    const res = await postData("customer/order", {
      user: user._id,
      address: user.address,
      cart,
      total: allTotal,
      paymentId: paymentId,
      dateOfPayment: new Date().toISOString(),
    });
    dispatch(notifyLoading(false));
    if (res.msg) return dispatch(notifyError(res.msg));
    if (res.user) {
      dispatch(addCToCartData([]));
      localStorage.removeItem("shah_cart");
      navigate(`/customer/${user.name}/${user._id}/orders`);
    }
  };

  return (
    <div className="card shadow-sm p-5">
      <p className="fw-bold">Sub Total: ${total}</p>
      <p className="fw-bold">Tax: ${(total / 100) * 20}</p>
      <p className="fw-bold">Shippping: $60</p>
      <p className="fw-bold">Total: ${allTotal}</p>

      {user.address ? (
        <>
          <p>Shipping Address:</p>
          <p> {user.address}</p>
          <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
        </>
      ) : (
        <Link to={`/customer/${user.name}/${user._id}`}>
          <button className="btn btn-success">
            Please Add Address
          </button>
        </Link>
      )}
    </div>
  );
}
