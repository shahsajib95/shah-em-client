import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AddToCart, increase } from "../../../redux/cart/action";

export default function Products({ product }) {
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const handleCart = (product) => {
    dispatch(AddToCart(cart, product));
  };
  return (
    <div className="col-md-4 border">
      <div className="card  product  p-4">
        <img src={product.images[0].url} alt="prodImg" className="w-100"/>
        <small className="text-secondary text-center fw-light mt-3">
          <Link
            to={`store/${product.user.store.replace(/\s/g, "-")}/${
              product.user._id
            }`}
          >
            {product.user.store}
          </Link>
        </small>
        <h6 className="text-center">
          <span className="fw-bold text-secondary">{product.category}</span>
        </h6>
        <Link to={`/product/${product.title}/${product._id}`}>
          <h6 className="fw-bold text-center my-2">{product.title}</h6>
        </Link>
        <h6 className="text-danger text-center">
          Price: <span className="fw-bold">${product.price}</span>
        </h6>

        <div className="text-center">
          {/* <Link to={`/product/${product.title}/${product._id}`}>
            <button className="btn btn-success text-white">Details</button>
          </Link> */}
          <button
            className="btn btn-danger text-white mt-3"
            onClick={() => handleCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
