import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

function ProductHorizontalCard({
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
  maxOrderQuantity,
  quantityInStock,
  productVariantName,
  variant,
  variantValue,
  onAddToCart,
}) {
  const navigate = useNavigate();
  const stockStatus = quantityInStock >= minOrderQuantity ? true : false;

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
          <img
            src={imgSrc}
            className="img-fluid rounded-start"
            alt="..."
            style={{ aspectRatio: "1 / 1" }}
          />
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
            <div className="card-text">
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
            </div>
            <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={onAddToCart}
              >
                Add To Cart
              </button>

              <button
                type="button"
                className="btn btn-success me-2"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate("/checkout", {
                    state: [productItemId],
                  });
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHorizontalCard;
