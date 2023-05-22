import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import HorizontalCard from "../components/HorizontalCard";
import Logo from "../assets/logo.jpeg";

function Wishlist() {
  return (
    <>
      <NavBar />
      <h1>Wishlist</h1>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text-left">
          <HorizontalCard
            imgSrc={Logo}
            cardTitle="product"
            sellerName="seller_name"
            originalPrice="1000"
            offerPrice="500"
            average_rating={4.5}
            ratingCount={5}
          />
          <HorizontalCard
            imgSrc={Logo}
            cardTitle="product"
            sellerName="seller_name"
            originalPrice="1000"
            offerPrice="500"
            average_rating={4.5}
            ratingCount={5}
          />
          <HorizontalCard
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

export default Wishlist;
