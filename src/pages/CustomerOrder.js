import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Global/Loading";
import NotFound from "../components/Global/NotFound";
import SubHeader from "../components/Global/SubHeader/SubHeader";
import { getOrder } from "../redux/order/action";

export default function CustomerOrder() {
  const auth = useSelector((state) => state.auth);

  const { customerId } = useParams();

  const { order, loading } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(customerId));
  }, [customerId]);

  console.log(order);

  if (auth.user._id !== customerId || auth.user.role == "seller")
    return <NotFound />;

  if (loading) return <Loading />;
  return (
    <>
      <SubHeader name={`Your Orders`} />
      <div className="container my-5">
        {order.length === 0 ? (
          <h3 className="text-center">No Orders Yet!</h3>
        ) : (
          <div className="table-responsive my-5">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Products</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quanity</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {order.map((i) => (
                  <tr>
                    <th scope="row">
                      {moment(i.createdAt).format("DD-MM-YYYY")}
                    </th>
                    <td>{i.title}</td>
                    <td>${i.price}</td>
                    <td>{i.quanity}</td>
                    <td>${i.price * i.quanity}</td>
                    <td>{i.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
