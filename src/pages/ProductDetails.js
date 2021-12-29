import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Global/Loading";
import parse from "html-react-parser";
import { getData } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, decrease, increase } from "../redux/cart/action";
import SubHeader from "../components/Global/SubHeader/SubHeader";

export default function ProductDetails() {
  const { productId } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProductDetails = async () => {
      const res = await getData(`product/${productId}`);
      setProduct(res[0]);
      setLoading(false);
    };
    getProductDetails();
  }, [productId]);

  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const handleCart = (product) => {
    dispatch(AddToCart(cart, product));
  };

  const [tab, setTab] = useState(0);
  const isActive = (index) => {
    if (tab === index) return " active";
    return "";
  };

  if (loading) return <Loading />;
  return (
    <>
      <SubHeader name="Product Details" />
      <div className="container my-5">
        <div className="row shadow-sm">
          <div className="col-md-6">
            <img
              src={product.images[tab].url}
              alt={product.images[tab].url}
              className="d-block img-thumbnail rounded mt-4 w-100"
            />

            <div className="row mx-0 my-3" style={{ cursor: "pointer" }}>
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={img.url}
                  className={`img-thumbnail rounded ${isActive(index)}`}
                  style={{ height: "80px", width: "20%" }}
                  onClick={() => setTab(index)}
                />
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-5">
              <h2>{product.title}</h2>
              <Link
                to={`/store/${product.user.store.replace(/\s/g, "-")}/${
                  product.user._id
                }`}
              >
                <p className="fw-bold text-primary">{product.user.store}</p>
              </Link>

              <p>
                Price:{" "}
                <span className="fw-bold text-danger">${product.price}</span>
              </p>
              <p>
                InStock:{" "}
                <span className="fw-bold text-secondary">
                  {product.inStock}
                </span>
              </p>

              <p className="product-description">
                {parse(product.description)}
              </p>

              <button
                className="btn bg-danger text-white mt-3"
                onClick={() => handleCart(product)}
              >
                Add to Cart
              </button>

              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
