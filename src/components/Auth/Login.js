import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userLoggedIn } from "../../redux/auth/action";
import { notifyError, notifyLoading } from "../../redux/notify/action";
import { postData } from "../../utils/api";

export default function Login() {
  const auth = useSelector((state) => state.auth);

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (auth.user.email) {
      navigate(from);
    }
  }, [auth]);

  const initialState = {
    email: "",
    password: "",
  };

  const [userLogin, setUserLogin] = useState(initialState);

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(notifyLoading(true));
    const res = await postData("login", userLogin);
    dispatch(notifyLoading(false));
    if (res.user) {
      localStorage.setItem("access_token", res.token);
    }
    if (!res.user) return dispatch(notifyError(res.msg));
    if (res.user) {
      dispatch(userLoggedIn(res));
      navigate(from);
    }
  };

  return (
    <div className="bg-light p-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-5">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={handleChangeInput}
            name="email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={handleChangeInput}
            name="password"
          />
        </div>
        <button className="btn btn-success text-white px-5">
          Login
        </button>
      </form>
    </div>
  );
}
