import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubHeader from "../components/Global/SubHeader/SubHeader";
import moment from "moment";
import { getData } from "../utils/api";
import Loading from "../components/Global/Loading";

export default function Store() {
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState([]);

  useEffect(() => {
    const getStores = async () => {
      const res = await getData(`store`);
      setStore(res);
      setLoading(false);
    };
    getStores();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <SubHeader name={`Store`} />
      <div className="container my-5">
        <div className="row">
          {store.map((i) => (
            <div
              className="col-md-4 d-flex justify-content-center"
              key={i._id}
            >
              <Link to={`/store/${i.store.replace(/\s/g, "-")}/${i._id}`}>
                <div className="card shadow-sm p-5 m-3">
                  <img
                    src={i.storeAvatar}
                    alt="image"
                    className="rounded-circle"
                    height="200px"
                    width="200px"
                  />
                  <p className="text-center mt-3 fw-bold">{i.store}</p>
                  <small className="text-center text-secondary fw-bold">
                    {moment(i.createdAt).fromNow()}
                  </small>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
