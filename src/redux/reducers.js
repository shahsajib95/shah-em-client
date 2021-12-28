import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import notifyReducer from './notify/reducer';
import storeReducer from './store/reducer';
import productsReducer from './product/reducer';
import cartReducer from './cart/reducer';
import orderReducer from './order/reducer';

export default combineReducers({
    auth: authReducer,
    notify: notifyReducer,
    store: storeReducer,
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer
}) 