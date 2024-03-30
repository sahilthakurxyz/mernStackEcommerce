import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./components/Home/Home";
import Banner from "./components/layout/Header/Banner";
import Products from "./products/productFeature/Products";
import ProductDetail from "./products/allProducts/ProductDetail";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userAction";

import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import ProfileUpdate from "./components/User/ProfileUpdate";
import UpdatePassword from "./components/User/UpdatePassword";
import ContactUS from "./components/layout/ContactUS.js";
import About from "./components/layout/About.js";
import ForgetPassword from "./components/User/ForgetPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./cartManagement/Cart";
import Shipping from "./cartManagement/Shipping";
import Header from "./components/layout/Header/Header";
import ConfrimOrder from "./cartManagement/ConfrimOrder";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./cartManagement/Payment";
import OrderSuccess from "./cartManagement/OrderSuccess";
import PaymentFailed from "./cartManagement/PaymentFailed";
import MyOrders from "./orderManagement/MyOrders";
import Footer from "./components/layout/Footer/Footer";
import OrderDetails from "./orderManagement/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import CreateProduct from "./components/admin/CreateProduct";
import OrderList from "./components/admin/OrderList.js";
import UpdateProduct from "./components/admin/UpdateProduct";
import UpdateOrder from "./components/admin/UpdateOrder";
import UpdateUser from "./components/admin/UpdateUser";
import NavMenu from "./components/layout/Header/NavMenu";
import UserList from "./components/admin/UserList";
import ProductReviews from "./components/admin/ProductReviews";
import NotFound from "./components/layout/NotFound";
import CreateImages from "./components/admin/CreateImages.js";
import { attachTokenToRequests, axiosInstance } from "./constants.js";
const App = () => {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");
  const getStripeApiKey = async () => {
    attachTokenToRequests();
    try {
      const { data } = await axiosInstance.get(
        `/api/ecommerce/v1/stripeApiKey`
      );
      setStripeApiKey(data?.stripeKey);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access error
        // Optionally, redirect the user to the login page or display an error message
      } else {
        // Handle other errors
        console.error("Error fetching Stripe API key:", error);
        // Optionally, display an error message to the user
      }
    }
  };

  const { user, auth, loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(loadUser());
    getStripeApiKey();
  }, [dispatch]);
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Fragment>
      {loading === false && (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <MainLayout>
                    <Banner />
                    <Home />
                  </MainLayout>
                </>
              }
            />
            <Route
              path="/product/:id"
              element={
                <>
                  <MainLayout>
                    <ProductDetail />
                  </MainLayout>
                </>
              }
            />
            <Route
              path="/products"
              element={
                <>
                  <MainLayout>
                    <Products />
                  </MainLayout>
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <MainLayout>
                    <ContactUS />
                  </MainLayout>
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <MainLayout>
                    <About />
                  </MainLayout>
                </>
              }
            />
            <Route
              path="/products/:keyword"
              element={
                <>
                  <MainLayout>
                    <Products />
                  </MainLayout>
                </>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route
              path="/update/profile"
              element={
                <ProtectedRoute auth={auth}>
                  <Route path="/update/profile" element={<ProfileUpdate />} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update/password"
              element={
                <ProtectedRoute auth={auth}>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/process/payment"
              element={
                <ProtectedRoute auth={auth}>
                  {stripeApiKey && (
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Payment />
                    </Elements>
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute auth={auth}>
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/shipping"
              element={
                <ProtectedRoute auth={auth}>
                  <Header /> <Shipping />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/confirm"
              element={
                <ProtectedRoute auth={auth}>
                  <Header /> <ConfrimOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/success"
              element={
                <ProtectedRoute auth={auth}>
                  <Header />
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment/failed"
              element={
                <ProtectedRoute auth={auth}>
                  <Header />
                  <PaymentFailed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute auth={auth}>
                  <Header />
                  <MyOrders />
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute auth={auth}>
                  <Header />
                  <OrderDetails />
                </ProtectedRoute>
              }
            />

            {Object.keys(user).length > 0 && (
              <Fragment>
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute
                      auth={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <MainLayout>
                        <Dashboard />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/products"
                  element={
                    <ProtectedRoute
                      auth={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <MainLayout>
                        <ProductList />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/create/product"
                  element={
                    <ProtectedRoute
                      auth={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <CreateProduct />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/update/product/:id"
                  element={
                    <ProtectedRoute
                      auth={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <UpdateProduct />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedRoute
                      auth={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <MainLayout>
                        <OrderList />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/update/order/:id"
                  element={
                    <ProtectedRoute
                      auth={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <Header />
                      <NavMenu />
                      <UpdateOrder />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute
                      auth={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <MainLayout>
                        <UserList />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/update/user/:id"
                  element={
                    <ProtectedRoute
                      auth={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <UpdateUser />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/reviews"
                  element={
                    <ProtectedRoute
                      auth={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <MainLayout>
                        <ProductReviews />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/create/images"
                  element={
                    <ProtectedRoute
                      auth={auth}
                      isAdmin={user.role === "admin" ? true : false}
                      adminRoute={true}
                    >
                      <Header />
                      <CreateImages />
                    </ProtectedRoute>
                  }
                />
              </Fragment>
            )}
            <Route path="/forget/password" element={<ForgetPassword />} />
            <Route path="/reset/password/:token" element={<ResetPassword />} />
            <Route
              path="/cart"
              element={
                <MainLayout>
                  <Cart />
                </MainLayout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </Fragment>
  );
};

export default App;
