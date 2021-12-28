import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifyLoading } from "../../redux/notify/action";
import { postData } from "../../utils/api";
import { imagesUpload } from "../../utils/imageFile";
import { category } from "../../utils/category";
import { getParticularStoreProduct } from "../../redux/store/action";
import { getProducts } from "../../redux/product/action";

export default function ModalAddProduct({ handleShow, show }) {
  const auth = useSelector((state) => state.auth);

  const initialState = {
    title: "",
    description: "",
    category: "",
    inStock: "",
    price: "",
  };
  const [productData, setProductData] = useState(initialState);
  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const [images, setImages] = useState([]);

  const handleUploadInput = (e) => {
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0)
      return dispatch(notifyError("Files does not exist."));

    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return (err = "The largest image size is 1mb");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "Image format is incorrect.");

      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });

    if (err) dispatch(notifyError(err));

    const imgCount = images.length;
    if (imgCount + newImages.length > 5)
      return dispatch(notifyError("Select up to 5 images."));
    setImages([...images, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !productData.title ||
      !productData.description ||
      !productData.category ||
      !productData.price ||
      !images[0] ||
      !productData.inStock
    )
      return dispatch(notifyError("Please Add All the Details with Images"));

    dispatch(notifyLoading(true));
    const photo = await imagesUpload(images);
    const res = await postData("seller/addProduct", {
      user: auth.user._id,
      ...productData,
      images: photo,
    });
    if(res.title){
      dispatch(getParticularStoreProduct(auth.user._id));
      dispatch(getProducts());
    }
    dispatch(notifyLoading(false));
    handleShow()
  };
  return (
    <Modal show={show} onHide={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Add product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Product Description</label>
            <textarea
              type="text"
              name="description"
              className="form-control"
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Product Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Product Stock</label>
            <input
              type="number"
              name="inStock"
              className="form-control"
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="category"
              onChange={handleChangeInput}
            >
              <option selected>Select Category</option>
              {category.map((i) => (
                <option value={i.name}>{i.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Product Images</label>
            <input
              multiple
              className="form-control"
              type="file"
              onChange={handleUploadInput}
            />
          </div>

          <div className="row img-up mx-0">
            {images.map((img, index) => (
              <div key={index} className="col-md-4">
                <span
                  onClick={() => deleteImage(index)}
                  style={{ cursor: "pointer" }}
                >
                  X Remove
                </span>
                <img
                  src={img.url ? img.url : URL.createObjectURL(img)}
                  width="100px"
                  height="100px"
                  alt=""
                  className="img-thumbnail rounded"
                />
              </div>
            ))}
          </div>
          <button className="btn btn-success text-white mt-2">Upload</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
