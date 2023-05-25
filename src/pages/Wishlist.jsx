import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Logo from "../assets/logo.jpeg";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

function Wishlist() {
  return (
    <>
      <NavBar />
      <h1>Wishlist</h1>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text-left">
          <WishlistHorizontalCard
            imgSrc={Logo}
            cardTitle="product"
            sellerName="seller_name"
            originalPrice="1000"
            offerPrice="500"
            average_rating={4.5}
            ratingCount={5}
          />
          <WishlistHorizontalCard
            imgSrc={Logo}
            cardTitle="product"
            sellerName="seller_name"
            originalPrice="1000"
            offerPrice="500"
            average_rating={4.5}
            ratingCount={5}
          />
          <WishlistHorizontalCard
            imgSrc={Logo}
            cardTitle="product"
            sellerName="seller_name"
            originalPrice="1000"
            offerPrice="500"
            average_rating={4.5}
            ratingCount={5}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

function WishlistHorizontalCard({
  imgSrc,
  cardTitle,
  sellerName,
  originalPrice,
  offerPrice,
  average_rating,
  ratingCount,
}) {
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
              <Rating ratingValue={average_rating} ratingCount={ratingCount} />
              <p className="card-text">
                <span>&#8377;</span>
                <del>{originalPrice}</del>&nbsp;
                <span>&#8377;</span>
                {offerPrice}
              </p>
            </p>
            <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
              <Link
                to=""
                className="btn border px-2 shadow-0 me-1"
                title="Add to cart"
              >
                <button type="button" className="btn btn-outline-primary">
                  Add To Cart
                </button>
              </Link>
              <Link
                to=""
                className="btn border px-2 shadow-0 me-1"
                title="Remove From Wishlist"
              >
                <button type="button" className="btn btn-outline-danger">
                  Remove From Wishlist
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
