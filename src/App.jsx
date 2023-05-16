import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/wishlist";
import Cart from "./pages/cart";
import Orders from "./pages/orders";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Product from "./pages/product";

export const appName = import.meta.env.VITE_APP_NAME;

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/wishlist" element={<Wishlist />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/notifications" element={<Notifications />} />
          <Route exact path="/recommended-products" element={<Orders />} />
          <Route exact path="/popular-products" element={<Product productName={"product name here"} originalPrice={500}
            offerPrice={100} />} />
          <Route exact path="/new-products" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
