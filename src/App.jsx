import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/wishlist";
import Cart from "./pages/cart";
import Orders from "./pages/orders";

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
          <Route exact path="/recommended-products" element={<Orders />} />
          <Route exact path="/popular-products" element={<Orders />} />
          <Route exact path="/new-products" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
