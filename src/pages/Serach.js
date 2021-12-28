import React, { useEffect, useState } from "react";
import Products from "../components/Global/Products/Products";
import SubHeader from "../components/Global/SubHeader/SubHeader";
import { getData } from "../utils/api";

export default function Serach() {
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const handleSearch = async (e) => {
    if (e.keyCode === "13") {
      console.log(e)
      setSearch(e.target.value);
    }
    setSearch(e.target.value);
  };

  const handleData = async () => {
    setLoading(true);
    const res = await getData(`search/${search}`);
    setProducts(res);
    setLoading(false);
  };

  return (
    <>
      <SubHeader name={`Search`} />
      <div className="container my-5">
        <div className="d-flex justify-content-center">
          <input
            type="text"
            placeholder="Search"
            className="form-control"
            style={{ maxWidth: "400px" }}
            onChange={(e) => handleSearch(e)}
            onKeyDown={(e) => handleSearch(e)}
          />
          <button className="btn btn-success text-white" onClick={handleData}>
            Search
          </button>
        </div>

        {!loading && products.length === 0 && (
          <p className="text-center my-5">...Nothing to show...</p>
        )}
        {loading ? (
          <p className="text-center my-5">...Loading...</p>
        ) : (
          <div className="container my-5">
            <div className="row">
              {products.map((i) => (
                <Products key={i._id} product={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
