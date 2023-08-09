import Home from "./pages/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Wishlist from "./pages/wishlist";
import Cart from "./pages/Cart";
import Orders from "./pages/orders";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";
import { SubCategories } from "./pages/Categories";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";
import AuthConsumer from "./hooks/useAuth";
import ProductReview from "./pages/ProductReview";
import ResetPassword from "./pages/reset/ResetPassword";
import LoginMobile from "./pages/auth/LoginMobile";
import { useState } from "react";
import LoginMotp from "./pages/auth/LoginMotp";
import ViewedProducts from "./pages/ViewedProducts";
import SearchResultsPage from "./pages/SearchResultsPage";
import ErrorPage from "./pages/error_page/ErrorPage";
import Payment from "./pages/Payment";
import OrderItemDetails from "./pages/OrderItemDetails";
import CategoryProducts from "./pages/CategoryProducts";
import CheckOutResult from "./pages/CheckOutResult";

export const appName = import.meta.env.VITE_APP_NAME;

function RequireAuth({ children }) {
  const { authed } = AuthConsumer();
  const location = useLocation();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

const App = () => {
  const [hasVisitedMobile, setHasVisitedMobile] = useState(false);
  const [hasVisitedCheckout, setHasVisitedCheckout] = useState(false);
  const [hasVisitedPayment, setHasVisitedPayment] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/login/mobile"
            element={<LoginMobile setHasVisitedMobile={setHasVisitedMobile} />}
          />
          <Route
            path="/login/motp"
            element={
              hasVisitedMobile ? <LoginMotp /> : <Navigate to="/login/mobile" />
            }
          />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/wishlist"
            element={
              <RequireAuth>
                <Wishlist />
              </RequireAuth>
            }
          />
          <Route path="/cart" element={<Cart />} />

          <Route
            path="/orders"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
          <Route
            path="/order-items/:orderItemId/details"
            element={<OrderItemDetails />}
          />

          <Route
            path="/product-reviews"
            element={
              <RequireAuth>
                <ProductReview />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          <Route
            path="/notifications"
            element={
              <RequireAuth>
                <Notifications />
              </RequireAuth>
            }
          />
          {/* <Route path="/recommended-products" element={<Orders />} />
          <Route path="/popular-products" element={<Orders />} />
          <Route path="/new-products" element={<Orders />} /> */}
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/categories/:categoryId/subcategories"
            element={<SubCategories />}
          />

          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <Checkout setHasVisitedCheckout={setHasVisitedCheckout} />
              </RequireAuth>
            }
          />
          <Route
            path="/payment"
            element={
              <RequireAuth>
                {hasVisitedCheckout ? (
                  <Payment setHasVisitedPayment={setHasVisitedPayment} />
                ) : (
                  <Navigate to="/checkout" />
                )}
              </RequireAuth>
            }
          />
          <Route
            path="/checkout-result"
            element={
              <RequireAuth>
                {hasVisitedPayment ? (
                  <CheckOutResult />
                ) : (
                  <Navigate to="/checkout" />
                )}
              </RequireAuth>
            }
          />

          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route
            path="/viewed-products"
            element={
              <RequireAuth>
                <ViewedProducts />
              </RequireAuth>
            }
          />
          <Route
            path="/categories/:categoryId"
            element={<CategoryProducts type="category" />}
          />
          <Route
            path="/subcategories/:subcategoryId"
            element={<CategoryProducts type="subcategory" />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
