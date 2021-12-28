import moment from "moment";
import React, { useEffect, useState } from "react";
import { getData, patchData } from "../../../utils/api";

const selectValue = [
  { id: 1, value: "Accepted" },
  { id: 2, value: "On Way" },
  { id: 3, value: "Delivered" },
];

export default function Order({ i }) {
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    const get = async () => {
      const res = await getData(`user/${i.userId}`);
      setCustomer(res);
    };
    get();
  }, []);

  const updateOrder = async (orderId, storeOrderId, value) => {
    const res = await patchData("seller/order/accept", {
      orderId: orderId,
      storeOrderId: storeOrderId,
      status: value,
    });
    if (res.modifiedCount > 0) {
    }
  };

  return (
    <>
      <tr>
        <th scope="row">{moment(i.createdAt).format("DD-MM-YYYY")}</th>
        <td>
          Name: {customer.name} <br></br>Address: {customer.address}
        </td>
        <td>{i.title}</td>
        <td>${i.price}</td>
        <td>{i.quanity}</td>
        <td>${i.price * i.quanity}</td>
        <td>
          <select
            className="form-select"
            name="status"
            style={{ width: "150px" }}
            onChange={(e) => updateOrder(i.order, i._id, e.target.value)}
          >
            {selectValue.map((item) => (
              <>
                <option selected={i.status === item.value} value={item.value}>
                  {item.value}
                </option>
              </>
            ))}
          </select>
        </td>
      </tr>
    </>
  );
}
