import WishlistSvg from "../assets/Heart.svg";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../utils/api";
import Toast from "./Toast";
import { useEffect, useState } from "react";

function ProductCard({
  productId,
  productItemId,
  imgSrc,
  cardTitle,
  sellerName,
  originalPrice,
  offerPrice,
  average_rating,
  ratingCount,
  minOrderQuantity,
  quantityInStock,
}) {
  const navigate = useNavigate();
  const stockStatus = quantityInStock >= minOrderQuantity ? true : false;
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

  return (
    <>
      {showToast && (
        <Toast
          toastType={toastProperties.toastType}
          message={toastProperties.toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
      <div
        className="col-lg-3 col-md-6 col-sm-6 d-flex"
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
        <div
          className="card w-100 my-2 shadow-2-strong"
          style={{ cursor: "pointer" }}
        >
          <img
            src={imgSrc}
            className="card-img-top"
            style={{ aspectRatio: "1 / 1" }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{cardTitle}</h5>
            <h6>sold by {sellerName}</h6>
            {stockStatus ? (
              <h5 className="text-success">In Stock</h5>
            ) : (
              <h5 className="text-danger">Out Of Stock</h5>
            )}
            <Rating ratingValue={average_rating} ratingCount={ratingCount} />
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
              {/* Add to cart */}
              <button
                type="button"
                className="btn btn-warning me-2"
                disabled={!stockStatus}
                onClick={() => {
                  api
                    .post("/carts", {
                      product_item_id: productItemId,
                      quantity: minOrderQuantity,
                    })
                    .then((response) => {
                      if (response.data) {
                        console.log("item added to cart successfully");
                        setShowToast(true);
                        setToastProperties({
                          toastType: "success",
                          toastMessage: "Item added to Cart successfully",
                        });
                      }
                    })
                    .catch((error) => {
                      console.error("some error occured in adding to cart");
                      console.error(error);
                      setShowToast(true);
                      setToastProperties({
                        toastType: "error",
                        toastMessage: "some error occured in adding to cart",
                      });
                    });
                }}
              >
                Add to cart
              </button>
              <button
                type="button"
                className="btn btn-success me-2"
                disabled={!stockStatus}
                onClick={(event) => {
                  event.stopPropagation();
                  const productObject = {
                    productId,
                    productItemId,
                    imgSrc,
                    cardTitle,
                    originalPrice,
                    offerPrice,
                  };
                  navigate("/checkout", {
                    state: [productObject],
                  });
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
