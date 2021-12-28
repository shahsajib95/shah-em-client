import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { token } from "../../App";
import { userLoggedIn } from "../../redux/auth/action";
import { notifyError, notifyLoading } from "../../redux/notify/action";
import { getData, patchData } from "../../utils/api";

export default function UserForm() {
  const auth = useSelector((state) => state.auth);
  const initialState = {
    address: "",
  };
  const [userData, setUserData] = useState(initialState);
  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.address) return dispatch(notifyError("Please Add Address"));
    dispatch(notifyLoading(true));
    const res = await patchData("customer/edit", {
      address: userData.address,
      id: auth.user._id,
    });

    dispatch(notifyLoading(false));
    if (res.modifiedCount > 0) {
      const userData = await getData("accessUser", token);
      if (userData.user) return dispatch(userLoggedIn(userData));
      e.target.reset()
    }

  };
  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            name="address"
            onChange={handleChangeInput}
            rows="3"
          />
        </div>
        <button className="btn btn-success text-white mt-2">Change</button>
      </form>
    </div>
  );
}
