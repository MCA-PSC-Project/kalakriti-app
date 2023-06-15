import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
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

export const appName = import.meta.env.VITE_APP_NAME;

function RequireAuth({ children }) {
  const { authed } = AuthConsumer();

  return authed === true ? children : <Navigate to="/login" replace />;
}

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
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
          <Route path="/recommended-products" element={<Orders />} />
          <Route path="/popular-products" element={<Orders />} />
          <Route path="/new-products" element={<Orders />} />
          <Route
            path="/products"
            element={<Product productId={3} isLoggedIn={false} />}
          />
          <Route path="/categories" element={<Categories />} />
          <Route path="/subcategories" element={<SubCategories />} />
          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
