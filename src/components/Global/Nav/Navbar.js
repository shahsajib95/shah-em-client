import React from "react";
import {
  HiOutlineSearch,
  HiOutlineUserCircle,
  HiOutlineShoppingCart,
  HiOutlineLogout,
  HiUser,
  HiArchive,
  HiShoppingBag,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomLink from "../CustomLink";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const logOut = () => {
    localStorage.removeItem("access_token");
    window.location = "/register";
  };

  const { cart } = useSelector((state) => state.cart);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light py-3">
        <div className="container-fluid container">
          <Link className="navbar-brand" to="/">
            <span className="text-danger fw-bold">SHAH COMMERCE</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <CustomLink
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </CustomLink>
              </li>
              <li className="nav-item">
                <CustomLink className="nav-link" to="/all-products">
                  All Products
                </CustomLink>
              </li>
              <li className="nav-item">
                <CustomLink className="nav-link" to="/store">
                  Store
                </CustomLink>
              </li>
              <li className="nav-item">
                <CustomLink className="nav-link" to="/contact">
                  Contact
                </CustomLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <CustomLink className="nav-link" to="/search">
                  <HiOutlineSearch />
                </CustomLink>
              </li>
              {!auth.user.email ? (
                <li className="nav-item">
                  <CustomLink className="nav-link" to="/register">
                    <HiOutlineUserCircle />
                  </CustomLink>
                </li>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={auth.user.avatar}
                        alt={auth.user.name}
                        width="20px"
                        height="20px"
                      />
                      <span className="ms-3">{auth.user.name}</span>
                    </Link>
                    <ul
                      className="dropdown-menu shadow-sm"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/${auth.user.role}/${auth.user.name}/${auth.user._id}`}
                        >
                          <HiUser /> <span className="ms-3">My Profile</span>
                        </Link>
                      </li>
                      {auth.user.role === "customer" ? (
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/${auth.user.role}/${auth.user.name}/${auth.user._id}/orders`}
                          >
                            <HiArchive />{" "}
                            <span className="ms-3">My Orders</span>
                          </Link>
                        </li>
                      ) : (
                        <>
                          <Link
                            className="dropdown-item"
                            to={`/${auth.user.role}/${auth.user.name}/${auth.user._id}/store`}
                          >
                            <HiArchive /> <span className="ms-3">My Store</span>
                          </Link>
                          <Link
                            className="dropdown-item"
                            to={`/${auth.user.role}/${auth.user.name}/${auth.user._id}/store/orders`}
                          >
                            <HiShoppingBag />
                            <span className="ms-3">Store Orders</span>
                          </Link>
                        </>
                      )}
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={logOut}
                          style={{ cursor: "pointer" }}
                        >
                          <HiOutlineLogout />
                          <span className="ms-3">LogOut</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <span className="cartText">{cart.length}</span>
                  <HiOutlineShoppingCart />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
