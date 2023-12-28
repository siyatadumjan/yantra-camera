import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components";
import {
  ForgotPassword,
  Home,
  Login,
  Register,
  ActivationEmail,
  ResetPassword,
  NotFound,
  PrivateRoute,
  UserDashboard,
  Profile,
  Myorders,
  AdminDashboard,
  HomeAdmin,
  EditUser,
  AddProduct,
  AllProducts,
  Shop,
  ProductDetail,
  CheckoutPayment,
  OrderDetails,
  OrderList,
  ProcessOrder,
  Contact,
} from "./pages";
import { refreshToken } from "./redux/actions/userActions";
import { useDispatch } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import { useSelector } from "react-redux";
import "./styles/styles.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  const user = useSelector((state) => state?.userLogin?.userInfo);
  return (
    <ToastProvider placement="top-right">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="register"
          element={user?.access_token ? <Navigate to="/" /> : <Register />}
        />
        <Route path="login" element={<Login />} />
        <Route path="contact" element={<Contact />} />

        <Route
          path="/forgotpassword"
          element={
            user?.access_token ? <Navigate to="/" /> : <ForgotPassword />
          }
        ></Route>

        <Route path="/user/reset/:token" element={<ResetPassword />} />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPayment />
            </PrivateRoute>
          }
        />

        <Route
          path="/active/:activation_token"
          element={
            user?.access_token ? <Navigate to="/" /> : <ActivationEmail />
          }
        />

        <Route path="shop" element={<Shop />} />
        <Route path="/product/:productId" element={<ProductDetail />} />

        {user?.access_token && user?.user?.role === 0 && (
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<Profile />} />
            <Route path="myorders" element={<Myorders />} />
            <Route path="order/:orderId" element={<OrderDetails />} />
          </Route>
        )}

        {user?.access_token && user?.user?.role === 1 && (
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<HomeAdmin />} />
            <Route path="users" element={<Profile />} />
            <Route path="edit_user/:id" element={<EditUser />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="edit/:productId" element={<AddProduct />} />

            <Route path="products" element={<AllProducts />} />

            <Route path="orders" element={<OrderList />} />
            <Route path="admin/order/:id" element={<ProcessOrder />} />
          </Route>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
