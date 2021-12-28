import { productsData, productsLoading } from "./reducer";
import {getData} from '../../utils/api'

export const getProducts = () => async (dispatch) => {
    dispatch(productsLoading(true));
    const res = await getData('products')
    dispatch(productsData(res));
    dispatch(productsLoading(false));
};

export const loadingProducts = (data) => async (dispatch) => {
    dispatch(productsLoading(data));
  };
