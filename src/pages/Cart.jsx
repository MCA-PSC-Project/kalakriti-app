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
      <div>Cart</div>
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
          />
          <CartHorizontalCard
            imgSrc={Logo}
            cardTitle="product"
            sellerName="seller_name"
            originalPrice="1000"
            offerPrice="500"
            minOrderQuantity={5}
            maxOrderQuantity={10}
          />
          <CartHorizontalCard
            imgSrc={Logo}
            cardTitle="product"
            sellerName="seller_name"
            originalPrice="1000"
            offerPrice="500"
            minOrderQuantity={2}
            maxOrderQuantity={6}
          />
        </div>
      </div>
      <Footer />
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
            <h6>by {sellerName}</h6>
            <p className="card-text">
              <span>&#8377;</span>
              <del>{originalPrice}</del>&nbsp;
              <span>&#8377;</span>
              {offerPrice}
            </p>
            <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
              <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Quantity: {quantity}
                </button>
                <ul className="dropdown-menu">{elements}</ul>
              </div>

              <button type="button" class="btn btn-outline-danger">
                Remove From Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
