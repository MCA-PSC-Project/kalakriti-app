import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Logo from "../assets/logo.jpeg";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

function Cart() {
  return (
    <>
      <NavBar />
      <h1>Cart</h1>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text-left">
          <CartHorizontalCard
            imgSrc={Logo}
            cardTitle="product"
            sellerName="seller_name"
            originalPrice="1000"
            offerPrice="500"
            minOrderQuantity={1}
            maxOrderQuantity={5}
            stockStatus={false}
          />
          <CartHorizontalCard
            imgSrc={Logo}
            cardTitle="product"
            sellerName="seller_name"
            originalPrice="1000"
            offerPrice="500"
            minOrderQuantity={5}
            maxOrderQuantity={10}
            stockStatus={true}
          />
          <CartHorizontalCard
            imgSrc={Logo}
            cardTitle="product"
            sellerName="seller_name"
            originalPrice="1000"
            offerPrice="500"
            minOrderQuantity={2}
            maxOrderQuantity={6}
            stockStatus={true}
          />
        </div>
      </div>
      <Footer />
      <div class="fixed-bottom" style={{ backgroundColor: "#FFF0F0" }}>
        <CartFooter itemsQuantity={3} subtotal={500} />
      </div>
    </>
  );
}

function CartHorizontalCard({
  imgSrc,
  cardTitle,
  sellerName,
  originalPrice,
  offerPrice,
  minOrderQuantity,
  maxOrderQuantity,
  stockStatus,
}) {
  const [quantity, setQuantity] = useState(minOrderQuantity);

  const elements = [];
  for (let i = minOrderQuantity; i <= maxOrderQuantity; i++) {
    elements.push(
      <li>
        <a className="dropdown-item" onClick={(e) => setQuantity(i)}>
          {i}
        </a>
      </li>
    );
  }

  return (
    <div className="card mb-3" style={{ maxWidth: 850 }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={imgSrc} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">{cardTitle}</h2>
            <h6>sold by {sellerName}</h6>
            {stockStatus ? (
              <h5 className="text-success">In Stock</h5>
            ) : (
              <h5 className="text-danger">Out Of Stock</h5>
            )}
            <p
              className="card-text"
              style={{ display: stockStatus ? null : "none" }}
            >
              <span>&#8377;</span>
              <del>{originalPrice}</del>&nbsp;
              <span>&#8377;</span>
              {offerPrice}
            </p>
            <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
              <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-outline-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  disabled={stockStatus ? null : "false"}
                >
                  Quantity: {quantity}
                </button>
                <ul className="dropdown-menu">{elements}</ul>
              </div>
              &nbsp;
              <button type="button" className="btn btn-outline-danger">
                Remove From Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartFooter({ itemsQuantity, subtotal }) {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-muted">
            <b>Subtotal</b>({itemsQuantity} items): &nbsp;
          </span>
          <span className="mb-3 mb-md-0 text-muted">
            <span>&#8377;</span>
            {subtotal}
          </span>
          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <Link to="/checkout">
                <button type="button" className="w-100 btn btn-success">
                  Proceed To Checkout
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
export default Cart;
