import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Logo from "../assets/logo.jpeg";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import authHeader from "../services/auth-header";
import api from "../utils/api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    api
      .get(`/wishlists`, { headers: authHeader() })
      .then((response) => {
        setWishlist(response.data === null ? [] : response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      <NavBar />
      <h1>Wishlist</h1>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text-left">
          {wishlist.map((wish) => {
            return (
              <WishlistHorizontalCard
                key={wish.product_id}
                imgSrc={wish.product_item.media.path}
                cardTitle={wish.product_name}
                sellerName={wish.seller.seller_name}
                originalPrice={wish.product_item.originalPrice}
                offerPrice={wish.product_item.offerPrice}
                average_rating={wish.average_rating}
                ratingCount={wish.rating_count}
                stockStatus={false}
              />
            );
          })}
          {/* <WishlistHorizontalCard
            imgSrc={Logo}
            cardTitle="product"
            sellerName="seller_name"
            originalPrice="1000"
            offerPrice="500"
            average_rating={4.5}
            ratingCount={5}
            stockStatus={false}
          />
          <WishlistHorizontalCard
            imgSrc={Logo}
            cardTitle="product"
            sellerName="seller_name"
            originalPrice="1000"
            offerPrice="500"
            average_rating={4.5}
            ratingCount={5}
            stockStatus={true}
          />
          <WishlistHorizontalCard
            imgSrc={Logo}
            cardTitle="product"
            sellerName="seller_name"
            originalPrice="1000"
            offerPrice="500"
            average_rating={4.5}
            ratingCount={5}
            stockStatus={true}
          /> */}
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
  stockStatus,
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
            <h6>sold by {sellerName}</h6>
            {stockStatus ? (
              <h5 className="text-success">In Stock</h5>
            ) : (
              <h5 className="text-danger">Out Of Stock</h5>
            )}
            <p className="card-text">
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
