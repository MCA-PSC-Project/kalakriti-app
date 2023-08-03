import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Logo from "../assets/logo.jpeg";
import Rating from "../components/Rating";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Toast from "../components/Toast";
import Loading from "../components/loading/Loading"; // import the Loading component

function Wishlist() {
  const [isLoading, setIsLoading] = useState(true); // add a state variable to track the loading status
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

  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    api
      .get(`/wishlists`)
      .then((response) => {
        setWishlist(response.data === null ? [] : response.data);
        console.log(response.data);
        setIsLoading(false); // set isLoading to false when the data has been fetched
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // set isLoading to false even if there is an error
      });
  }, []);

  const handleDelete = (productItemId) => {
    api
      .delete(`/wishlists/${productItemId}`)
      .then((response) => {
        setWishlist(
          wishlist.filter((item) => item.product_item.id !== productItemId)
        );
        setShowToast(true);
        setToastProperties({
          toastType: "success",
          toastMessage: "Item successfully removed from wishlist",
        });
      })
      .catch((err) => {
        console.error(err);
        setShowToast(true);
        setToastProperties({
          toastType: "error",
          toastMessage: "some error occured in removing item from wishlist",
        });
      });
  };

  const handleAddToCart = (productItemId, minOrderQuantity) => {
    api
      .post("/carts", {
        product_item_id: productItemId,
        quantity: minOrderQuantity,
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("item added to cart successfully");
          setShowToast(true);
          setToastProperties({
            toastType: "success",
            toastMessage: "Item added to Cart successfully",
          });
        } else if (response.status === 200) {
          console.log("item already exists. Quantity increased +1");
          setShowToast(true);
          setToastProperties({
            toastType: "success",
            toastMessage: "Item already exists. Quantity increased +1",
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
      {isLoading ? ( // display the Loading component while the data is being fetched
        <Loading />
      ) : (
        <>
          <NavBar />
          <h1>Wishlist</h1>
          <div className="d-flex justify-content-center align-items-center">
            <div className="text-left">
              {wishlist && wishlist.length > 0 ? (
                wishlist.map((product) => {
                  return (
                    <WishlistHorizontalCard
                      key={product.product_id}
                      productId={product.product_id}
                      productItemId={product.product_item.id}
                      imgSrc={product.product_item.media.path}
                      cardTitle={product.product_name}
                      sellerName={product.seller.seller_name}
                      originalPrice={product.product_item.original_price}
                      offerPrice={product.product_item.offer_price}
                      average_rating={product.average_rating}
                      ratingCount={product.rating_count}
                      minOrderQuantity={product.min_order_quantity}
                      maxOrderQuantity={product.max_order_quantity}
                      quantityInStock={product.product_item.quantity_in_stock}
                      productVariantName={
                        product.product_item.product_variant_name
                      }
                      variant={product.product_item.variant}
                      variantValue={product.product_item.variant_value}
                      onDelete={() => handleDelete(product.product_item.id)}
                      onAddToCart={() =>
                        handleAddToCart(product.product_item.id, 1)
                      }
                    />
                  );
                })
              ) : (
                <h1>No item in wishlist</h1>
              )}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

function WishlistHorizontalCard({
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
  onDelete,
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
        <div className="col-md-4 col-sm-4">
          <img
            src={imgSrc}
            className="img-fluid rounded-start"
            alt="..."
            style={{ aspectRatio: "1 / 1" }}
          />
        </div>
        <div className="col-md-8 col-sm-8">
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
                disabled={!stockStatus}
                onClick={onAddToCart}
              >
                Add To Cart
              </button>

              <button
                type="button"
                className="btn btn-success me-2"
                disabled={!stockStatus}
                onClick={(event) => {
                  event.stopPropagation();
                  navigate("/checkout", {
                    state: [productItemId],
                  });
                }}
              >
                Buy Now
              </button>

              <button
                type="button"
                className="btn btn-danger me-2"
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete();
                }}
              >
                Remove From Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
