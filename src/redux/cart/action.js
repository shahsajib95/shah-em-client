import { cartData, cartLoading, addCToCartData } from "./reducer";
import { getData } from "../../utils/api";
import { notifyError, notifySuccess } from "../notify/action";

export const AddToCart = (cart, product) => async (dispatch) => {
  if(product?.inStock === 0)
  return dispatch(notifyError("Product is out of stock")) 

  const check = cart.every((item) => {
    return item._id !== product._id;
  });

  if (!check)
    return dispatch(notifyError("Product is already added to cart")); 

  dispatch(loadCart([...cart, {...product, quantity: 1}]));
  return dispatch(notifySuccess("Product is added to cart")); 
};
export const loadingCart = (data) => async (dispatch) => {
  dispatch(cartLoading(data));
};

export const increase = (data, id) => async (dispatch) => {
  const newData = [...data];
  
  const prod = newData.find((i) => i._id === id);

  if(prod?.inStock === 0)
  return dispatch(notifyError("Product is out of stock")) 

  
  const filtered = newData.filter((i) => i._id !== id);
  filtered.splice(newData.indexOf(prod), 0, { ...prod, quantity: prod.quantity + 1 }); 
  
  return dispatch(loadCart(filtered));
};
export const decrease = (data, id) => async (dispatch) => {
  const newData = [...data];

  const prod = newData.find((i) => i._id === id);
  const filtered = newData.filter((i) => i._id !== id);
  filtered.splice(newData.indexOf(prod), 0, { ...prod, quantity: prod.quantity <= 1 ? 1 : prod.quantity - 1 });

  dispatch(loadCart(filtered));
};

export const removeFromCart = (data, id) => async (dispatch) => {
  const newData = [...data];
  const filtered = newData.filter((i) => i._id !== id);

  localStorage.setItem("shah_cart", JSON.stringify(filtered));
  dispatch(loadCart(filtered));
};

export const updateItem = (data, id, post, type) => {
  const newData = data.map(item => (item._id === id ? post : item))
  return ({ type, payload: newData})
}

export const loadCart = (data) => async (dispatch) => {
  localStorage.setItem("shah_cart", JSON.stringify(data));
  dispatch(addCToCartData(data))
 
}