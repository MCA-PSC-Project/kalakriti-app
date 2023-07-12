import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Logo from "../assets/logo.jpeg";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import api from "../utils/api";
import Toast from "../components/Toast";

function Cart() {
  const [showToast, setShowToast] = useState(false);
  const [toastProperties, setToastProperties] = useState({});

  useEffect(() => {
    if (showToast) {
      const timeoutId = setTimeout(() => {
        setShowToast(false);
        setToastProperties({});
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [showToast]);

  const [cartItemsList, setCartItemsList] = useState([]);
  const [totalOfferPrice, setTotalOfferPrice] = useState(0);

  function calculateTotalOfferPrice(data) {
    let total = 0;
    data.forEach((item) => {
      total += parseFloat(item.product_item.offer_price);
    });
    return total;
  }

  useEffect(() => {
    api
      .get(`/carts`)
      .then((response) => {
        setCartItemsList(response.data === null ? [] : response.data);
        setTotalOfferPrice(calculateTotalOfferPrice(response.data));
        console.log(response.data);
        // console.log("cartItemsList= ", cartItemsList);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = (productItemId) => {
    api
      .delete(`/carts/${productItemId}`)
      .then((response) => {
        setCartItemsList(
          cartItemsList.filter((item) => item.product_item.id !== productItemId)
        );
        setShowToast(true);
        setToastProperties({
          toastType: "success",
          toastMessage: "Item successfully removed from cart",
        });
      })
      .catch((err) => {
        console.error(err);
        setShowToast(true);
        setToastProperties({
          toastType: "error",
          toastMessage: "some error occured in removing item from cart",
        });
      });
  };

  return (
    <>
      {showToast && (
        <Toast
          toastType={toastProperties.toastType}
          message={toastProperties.toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
      <NavBar />
      <h1>Cart</h1>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text-left">
          {cartItemsList && cartItemsList.length > 0 ? (
            cartItemsList.map((cartItem) => {
              return (
                <CartHorizontalCard
                  key={cartItem.product_id}
                  imgSrc={cartItem.product_item.media.path}
                  cardTitle={cartItem.product_name}
                  sellerName={cartItem.seller.seller_name}
                  originalPrice={cartItem.product_item.original_price}
                  offerPrice={cartItem.product_item.offer_price}
                  minOrderQuantity={cartItem.min_order_quantity}
                  maxOrderQuantity={cartItem.max_order_quantity}
                  quantity={cartItem.quantity}
                  stockStatus={
                    cartItem.product_item.quantity_in_stock >=
                    cartItem.min_order_quantity
                      ? true
                      : false
                  }
                  onDelete={() => handleDelete(cartItem.product_item.id)}
                />
              );
            })
          ) : (
            <h1>Cart Empty</h1>
          )}
        </div>
      </div>
      <Footer />
      <div className="fixed-bottom" style={{ backgroundColor: "#FFF0F0" }}>
        <CartFooter
          itemsQuantity={cartItemsList.length}
          subtotal={totalOfferPrice}
        />
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
  quantity,
  stockStatus,
  onDelete,
}) {
  const [quantitySelected, setQuantitySelected] = useState(
    quantity ? quantity : minOrderQuantity
  );

  const elements = [];
  for (let i = minOrderQuantity; i <= maxOrderQuantity; i++) {
    elements.push(
      <li>
        <a className="dropdown-item" onClick={(e) => setQuantitySelected(i)}>
          {i}
        </a>
      </li>
    );
  }

  return (
    <div className="card mb-3" style={{ maxWidth: 1000 }}>
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
                  disabled={!stockStatus}
                >
                  Quantity: {quantitySelected}
                </button>
                <ul className="dropdown-menu">{elements}</ul>
              </div>
              &nbsp;
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={onDelete}
              >
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
            <b>Subtotal</b>({itemsQuantity} items): <span>&#8377;</span>
            {subtotal}
          </span>
          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <Link to="/checkout">
                <button
                  type="button"
                  className="btn btn-large btn-success"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate("/checkout", {
                      state: [productItemId],
                    });
                  }}
                >
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
