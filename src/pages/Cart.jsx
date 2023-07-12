import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Logo from "../assets/logo.jpeg";
import Rating from "../components/Rating";
import { Link, useNavigate } from "react-router-dom";
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
      total += parseFloat(item.product_item.offer_price) * item.quantity;
    });
    return total;
  }

  useEffect(() => {
    api
      .get(`/carts`)
      .then((response) => {
        if (response.status === 200) {
          setCartItemsList(response.data === null ? [] : response.data);
          setTotalOfferPrice(calculateTotalOfferPrice(response.data));
          console.log(response.data);
          // console.log("cartItemsList= ", cartItemsList);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setTotalOfferPrice(calculateTotalOfferPrice(cartItemsList));
  }, [cartItemsList]);

  const handleDelete = (productItemId) => {
    api
      .delete(`/carts/${productItemId}`)
      .then((response) => {
        if (response.status === 200) {
          setCartItemsList(
            cartItemsList.filter(
              (item) => item.product_item.id !== productItemId
            )
          );
          setShowToast(true);
          setToastProperties({
            toastType: "success",
            toastMessage: "Item successfully removed from cart",
          });
        }
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

  const handleQuantityChange = (productItemId, selectedQuantity) => {
    setCartItemsList(
      cartItemsList.map((item) => {
        if (item.product_item.id === productItemId) {
          console.log("replaced");
          return { ...item, quantity: selectedQuantity };
        }
        return item;
      })
    );
  };

  const handleShowToast = (toastType, toastMessage) => {
    setShowToast(true);
    setToastProperties({ toastType, toastMessage });
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
                <CartItemHorizontalCard
                  key={cartItem.product_id}
                  cartId={cartItem.cart_id}
                  productId={cartItem.product_id}
                  productItemId={cartItem.product_item.id}
                  imgSrc={cartItem.product_item.media.path}
                  cardTitle={cartItem.product_name}
                  sellerName={cartItem.seller.seller_name}
                  originalPrice={cartItem.product_item.original_price}
                  offerPrice={cartItem.product_item.offer_price}
                  minOrderQuantity={cartItem.min_order_quantity}
                  maxOrderQuantity={cartItem.max_order_quantity}
                  // quantity previously selected
                  quantity={cartItem.quantity}
                  stockStatus={
                    cartItem.product_item.quantity_in_stock >=
                    cartItem.min_order_quantity
                      ? true
                      : false
                  }
                  productVariantName={
                    cartItem.product_item.product_variant_name
                  }
                  onDelete={() => handleDelete(cartItem.product_item.id)}
                  onQuantityChange={(productItemId, selectedQuantity) =>
                    handleQuantityChange(productItemId, selectedQuantity)
                  }
                  onShowToast={handleShowToast}
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

function CartItemHorizontalCard({
  cartId,
  productId,
  productItemId,
  imgSrc,
  cardTitle,
  sellerName,
  originalPrice,
  offerPrice,
  minOrderQuantity,
  maxOrderQuantity,
  quantity,
  stockStatus,
  productVariantName,
  onDelete,
  onQuantityChange,
  onShowToast,
}) {
  const navigate = useNavigate();
  const [quantitySelected, setQuantitySelected] = useState(
    quantity ? quantity : minOrderQuantity
  );

  const elements = [];
  for (let i = minOrderQuantity; i <= maxOrderQuantity; i++) {
    elements.push(
      <li>
        <a
          className="dropdown-item"
          onClick={(event) => {
            event.stopPropagation();
            api
              .patch(`/carts/${productItemId}`, {
                quantity: i,
              })
              .then((response) => {
                if (response.status === 200) {
                  onShowToast("success", "Item quantity successfully updated");
                  setQuantitySelected(i);
                  onQuantityChange(productItemId, i);
                }
              })
              .catch((err) => {
                console.error(err);
                onShowToast("error", "Some error occured in updating quantity");
              });
          }}
        >
          {i}
        </a>
      </li>
    );
  }

  return (
    <div
      className="card mb-3"
      style={{ maxWidth: 1000, cursor: "pointer" }}
      onClick={(event) => {
        // Check if clicked element is button like "Add to cart"
        if (event.target.closest(".btn")) {
          // Do not navigate if clicked element is button like "Add to cart"
          // console.log("button click event");
          return;
        }

        // Navigate to product page
        navigate(`/products/${productId}`);
      }}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img src={imgSrc} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">{cardTitle}</h2>
            <h6>sold by {sellerName}</h6>
            <h6>Variant name:- {productVariantName}</h6>
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
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete();
                }}
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
