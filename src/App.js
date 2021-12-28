import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Global/Nav/Navbar";
import Home from "./pages";
import NotFound from "./components/Global/NotFound";
import NewArrivals from "./components/Home/Arrivals/NewArrivals";
import BestSellers from "./components/Home/Arrivals/BestSellers";
import AllProducts from "./pages/AllProducts";
import Auth from "./pages/Auth";
import Notify from "./components/Global/Notify";
import { getData } from "./utils/api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadingUser, userLoggedIn } from "./redux/auth/action";
import { notifyLoading } from "./redux/notify/action";
import Customer from "./pages/Customer";
import Seller from "./pages/Seller";
import SellerStore from "./pages/SellerStore";
import CustomerOrder from "./pages/CustomerOrder";
import Cart from "./pages/Cart";
import Serach from "./pages/Serach";
import Top from "./components/Home/Top";
import Store from "./pages/Store";
import SellerStoreOrders from "./pages/SellerStoreOrders";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Global/Footer/Footer";
import Contact from "./pages/Contact";
import StoreDetails from "./pages/StoreDetails";
import PrivateRoute from "./components/Global/PrivateRoute";
import { addCToCartData } from "./redux/cart/reducer";
export const token = localStorage.getItem("access_token");

function App() {
  const token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        dispatch(loadingUser(true))
        dispatch(notifyLoading(true));
        const res = await getData("accessUser", token);
        if (!res.user) {
          localStorage.removeItem("access_token");
        }
        dispatch(notifyLoading(false));
        if (res.user) return dispatch(userLoggedIn(res));
        dispatch(loadingUser(false))
      };
      getUser();
    }
  }, []);
  const cartInfo = JSON.parse(localStorage.getItem("shah_cart"));
  useEffect(() => {
    if (cartInfo) {
      dispatch(addCToCartData(cartInfo));
    }
  }, [cartInfo]);

  return (
    <BrowserRouter>
      <Notify />
      <Top />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="store" element={<Store />} />
        <Route path="store/:storeName/:storeId" element={<StoreDetails />} />

        <Route path="search" element={<Serach />} />

        <Route
          path="cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        {/* User */}
        <Route
          path="customer/:cutomerName/:customerId"
          element={<Customer />}
        />
        <Route
          path="customer/:name/:customerId/orders"
          element={<CustomerOrder />}
        />

        <Route path="seller/:sellerName/:sellerId" element={<Seller />} />
        <Route
          path="seller/:sellerName/:sellerId/store"
          element={<SellerStore />}
        />
        <Route
          path="seller/:sellerName/:sellerId/store/orders"
          element={<SellerStoreOrders />}
        />

        <Route path="register" element={<Auth />} />

        <Route path="all-products" element={<AllProducts />} />
        <Route
          path="product/:productName/:productId"
          element={<ProductDetails />}
        />

        <Route path="contact" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
