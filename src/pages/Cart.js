import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "../components/Cart/Checkout";
import SubHeader from "../components/Global/SubHeader/SubHeader";
import { decrease, increase, removeFromCart } from "../redux/cart/action";
import { HiOutlineShoppingCart } from "react-icons/hi";
export default function Cart() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((a, b) => a + b.price * b.quantity, 0);

  if (cart.length === 0)
    return (
      <>
        <SubHeader name={`Cart`} />
        <div className="container my-5">
          <h2 className="text-center fw-bold">
            <HiOutlineShoppingCart />
            Cart is Empty
          </h2>
        </div>
      </>
    );

  return (
    <>
      <SubHeader name={`Cart`} />
      <div className="container my-5">
        <div className="row">
          {/* Product */}
          <div className="col-md-6">
            {cart.map((item) => (
              <div className="card shadow-sm m-3 p-3" key={item._id}>
                <div className="row">
                  <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <div>
                      <button
                        className="btn btn-sm bg-danger text-white text-center mb-3"
                        onClick={() => dispatch(removeFromCart(cart, item._id))}
                      >
                        Remove
                      </button>
                      <img src={item.images[0].url} alt="product" width="150" />
                      <p className="fw-bold text-center mt-2">{item.title}</p>
                    </div>
                  </div>
                  <div className="col-md-8 d-flex justify-content-between align-items-center">
                    <p className="m-3 text-danger fw-bold">${item.price}</p>
                    <button
                      className="btn bg-danger text-white"
                      onClick={() => dispatch(decrease(cart, item._id))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      style={{ maxWidth: "75px" }}
                      className="form-control text-center"
                      value={item.quantity}
                    />
                    <button
                      className="btn bg-danger text-white"
                      onClick={() => dispatch(increase(cart, item._id))}
                    >
                      +
                    </button>
                    <p className="m-3 text-success fw-bold">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout */}
          <div className="col-md-6">
            <Checkout total={total} />
          </div>
        </div>
      </div>
    </>
  );
}
