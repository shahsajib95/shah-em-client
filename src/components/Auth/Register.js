import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userLoggedIn } from "../../redux/auth/action";
import { notifyError, notifyLoading } from "../../redux/notify/action";
import { postData } from "../../utils/api";

export default function Register() {
  const auth = useSelector((state) => state.auth);


  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const initialState = {
    name: "",
    email: "",
    password: "",
    cf_password: "",
    role: "customer",
  };

  const [userRegister, setUserRegister] = useState(initialState);
  const { name, email, password, cf_password, role } = userRegister;

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !cf_password || !role)
      return dispatch(notifyError("Please add all the input fields"));

    if (!(password.length >= 6))
      return dispatch(notifyError("Password must be atleast 6 characters"));

    if (password !== cf_password)
      return dispatch(notifyError("Password Doesn't Match"));

    dispatch(notifyLoading(true));
    const res = await postData("register", userRegister);
    dispatch(notifyLoading(false));

      if (!res.user) return dispatch(notifyError(res.msg));
      if (res.user) {
        localStorage.setItem("access_token", res.token);
      dispatch(userLoggedIn({ user: res.user, token: res.token }));
      navigate(from);
    }

  };

  return (
    <div className="bg-light p-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-5">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            name="cf_password"
            className="form-control"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="exampleRadios1"
              value="customer"
              checked
              onChange={handleChangeInput}
            />
            <label className="form-check-label" htmlFor="exampleRadios1">
              Customer
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="exampleRadios2"
              value="seller"
              onChange={handleChangeInput}
            />
            <label className="form-check-label" htmlFor="exampleRadios2">
              Seller
            </label>
          </div>
        </div>
        <button className="btn btn-success text-white px-5">
          Register
        </button>
      </form>
    </div>
  );
}
