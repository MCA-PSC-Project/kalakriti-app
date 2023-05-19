import WishlistSvg from "../assets/Heart.svg";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartCirclePlus,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";

function Card({
  imgSrc,
  cardTitle,
  originalPrice,
  offerPrice,
  average_rating,
  ratingCount,
}) {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
      <div className="card w-100 my-2 shadow-2-strong">
        <img
          src={imgSrc}
          className="card-img-top"
          style={{ aspectRatio: "1 / 1" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{cardTitle}</h5>
          <Rating ratingValue={average_rating} />
          ({ratingCount})
          <p className="card-text">
            <span>&#8377;</span>
            <del>{originalPrice}</del>&nbsp;
            <span>&#8377;</span>
            {offerPrice}
          </p>
          <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
            <Link
              to=""
              className="btn border px-2 shadow-0 me-1"
              title="Add to cart"
            >
              {/* Add to cart */}
              <FontAwesomeIcon
                icon={faCartPlus}
                size="xl"
                style={{ color: "#006eff" }}
              />
            </Link>
            <Link
              to=""
              // className="btn btn-light border px-2 pt-2 icon-hover"
              className="btn border px-2 pt-2 icon-hover"
              title="Add to wishlist"
            >
              {/* <i className="fas fa-heart fa-lg text-secondary px-1" /> */}

              {/* <img src={WishlistSvg} alt="Wishlist" /> */}
              <FontAwesomeIcon
                icon={faHeartCirclePlus}
                size="xl"
                style={{ color: "#ff0000" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
