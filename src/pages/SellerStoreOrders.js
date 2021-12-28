import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Global/Loading";
import NotFound from "../components/Global/NotFound";
import SubHeader from "../components/Global/SubHeader/SubHeader";
import Order from "../components/Seller/Store/Order";
import { getData, patchData } from "../utils/api";

export default function SellerStoreOrders() {
  const auth = useSelector((state) => state.auth);

  const { sellerId } = useParams();

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const getOrder = async () => {
    const res = await getData(`seller/order/${sellerId}`);
    setOrders(res);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getOrder();
  }, []);

  const totalRevenue = orders.reduce((a, b) => a + b.price * b.quanity, 0);
  if (auth.user._id !== sellerId || auth.user.role == "customer")
    return <NotFound />;

  if (loading) return <Loading />;

  return (
    <>
      <SubHeader name={`Your ${auth.user.store} Orders`} />
      <div className="container my-5">
        {orders.length === 0 ? (
          <h3 className="text-center">No Orders Yet!</h3>
        ) : (
          <>
            <h2 className="text-center">Total Revenue: ${totalRevenue}</h2>
            <div className="table-responsive my-5">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Customer Name & Address</th>
                    <th scope="col">Products</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quanity</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((i) => (
                    <Order key={i._id} i={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
