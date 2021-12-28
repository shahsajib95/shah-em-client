import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { token } from "../../App";
import { userLoggedIn } from "../../redux/auth/action";
import { notifyError, notifyLoading } from "../../redux/notify/action";
import { getData, patchData } from "../../utils/api";
import { checkImage, imageUpload } from "../../utils/imageFile";

export default function SellerForm() {
  const auth = useSelector((state) => state.auth);
  const initialState = {
    store: "",
  };
  const [userData, setUserData] = useState(initialState);
  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const [file, setFile] = useState(null);

  const handleFile = async (e) => {
    const imageCheck = await checkImage(e.target.files[0]);
    if (imageCheck) return dispatch(notifyError(imageCheck));
    setFile(e.target.files[0]);
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(notifyLoading(true));

    const photo = await imageUpload(file);
    const res = await patchData("seller/edit", {
      store: userData.store ? userData.store : auth.user.store,
      id: auth.user._id,
      storeAvatar: photo.url ? photo.url  : auth.user.storeAvatar,
    });
    
    dispatch(notifyLoading(false));
    console.log(res);
    if (res.modifiedCount > 0) {
      const userData = await getData("accessUser", token);
      if (userData.user) return dispatch(userLoggedIn(userData));
      e.target.reset();
    }
    if (res.user) return dispatch(userLoggedIn(res));
  };
  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Store Name</label>
          <input
            type="text"
            name="store"
            className="form-control"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Store Image</label>
          <input class="form-control" type="file" onChange={handleFile} />
        </div>
        <button className="btn btn-success text-white mt-2">Change</button>
      </form>
    </div>
  );
}
