import { orderData, orderLoading } from "./reducer";
import {getData} from '../../utils/api'

export const getOrder = (userId) => async (dispatch) => {
    dispatch(loadingOrder(true));
    const res = await getData(`customer/order/${userId}`)
    dispatch(orderData(res));
    dispatch(loadingOrder(false));
};

export const loadingOrder = (data) => async (dispatch) => {
    dispatch(orderLoading(data));
  };
