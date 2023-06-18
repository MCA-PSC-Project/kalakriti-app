import WishlistSvg from "../assets/Heart.svg";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../utils/api";
import Toast from "./Toast";
import { useEffect, useState } from "react";

function Card({
  productId,
  productItemId,
  imgSrc,
  cardTitle,
  originalPrice,
  offerPrice,
  average_rating,
  ratingCount,
  minOrderQuantity,
}) {
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
      <Link
        to={`/products/${productId}`}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
          <div className="card w-100 my-2 shadow-2-strong">
            <img
              src={imgSrc}
              className="card-img-top"
              style={{ aspectRatio: "1 / 1" }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{cardTitle}</h5>
              <Rating ratingValue={average_rating} ratingCount={ratingCount} />
              <p className="card-text">
                <span>
                  <del>&#8377;{originalPrice}</del>
                </span>
                &nbsp;
                <span>
                  <b>&#8377;{offerPrice}</b>
                </span>
              </p>
              <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                {/* Add to cart */}
                <button
                  type="button"
                  className="btn btn-warning me-2"
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
                <button type="button" className="btn btn-success me-2">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
