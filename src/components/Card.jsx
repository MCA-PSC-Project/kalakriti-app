import WishlistSvg from "../assets/Heart.svg";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import authHeader from "../services/auth-header";
import api from "../utils/api";
import Toast from "./Toast";
import { useEffect, useState } from "react";

function Card({
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
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    if (showToast) {
      const timeoutId = setTimeout(() => {
        setShowToast(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [showToast]);

  return (
    <>
      {showToast && (
        <Toast
          toastType={toastType}
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
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
              <Link
                to=""
                className="btn border px-2 pt-2 icon-hover"
                title="Add to cart"
              >
                {/* Add to cart */}
                <button
                  className="btn btn-warning"
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
                          setToastMessage("Item added to Cart successfully");
                          setToastType("success");
                        }
                      })
                      .catch((error) => {
                        console.error("some error occured in adding to cart");
                        setShowToast(true);
                        setToastMessage("some error occured in adding to cart");
                        setToastType("error");
                      });
                  }}
                >
                  Add to cart
                </button>
              </Link>
              <Link
                to=""
                // className="btn btn-light border px-2 pt-2 icon-hover"
                className="btn border px-2 pt-2 icon-hover"
                title="Buy Now"
              >
                <button className="btn btn-success">Buy Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
