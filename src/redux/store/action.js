import { storeLoading, particularStoreProduct } from "./reducer";
import {getData} from '../../utils/api'


export const getParticularStoreProduct = (storeId) => async (dispatch) => {
    dispatch(loadingStore(true))
    const res = await getData(`/product/getStoreProduct/${storeId}`)
    dispatch(particularStoreProduct(res));
    dispatch(loadingStore(false))
};

export const loadingStore = (data) => async (dispatch) => {
    dispatch(storeLoading(data));
  };
