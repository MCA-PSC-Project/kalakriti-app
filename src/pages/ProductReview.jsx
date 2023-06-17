import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
import GiveRating from "../components/GiveRating";
import api from "../utils/api";
import Modal from "../components/Modal";

function ProductReview() {
  const { state } = useLocation();
  const { orderItemId, productItem } = state;
  console.log(orderItemId);
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState("");
  const [ratingGiven, setRatingGiven] = useState(false);
  const [review, setReview] = useState("");
  const [showModal, setShowModal] = useState(false);

  function handleRatingChange(rating, text) {
    console.log({ rating, text });
    setRating(rating);
    setRatingText(text);
    setRatingGiven(true);
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    // console.log({ id, value });
    if (id === "review") {
      setReview(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    api
      .post("/product-reviews", {
        order_item_id: orderItemId,
        rating: rating,
        review: review,
        media_list: [],
      })
      .then((response) => {
        if (response.data) {
          console.log("Product review added successfully");
          setShowModal(true);
        }
      })
      .catch((error) => {
        console.error("some error occured in adding product review");
        console.error(error);
        setShowModal(true);
      });
  };

  return (
    <>
      <NavBar />
      <h1>Feedback</h1>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text-left">
          <ProductMiniCard
            imgSrc={productItem.imgSrc}
            cardTitle={productItem.cardTitle}
            sellerName={productItem.sellerName}
          />
        </div>
      </div>
      <div className="row">
        <div className="mx-auto col-10 col-md-8 col-lg-6">
          <form
            className="needs-validation"
            noValidate=""
            //   onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row g-3">
              <div className="col-12">
                <label
                  htmlFor="rating"
                  className="form-label"
                  style={{ fontSize: "25px" }}
                >
                  Rating
                </label>
                <GiveRating onRatingChange={handleRatingChange} />
                <input
                  type="hidden"
                  className="form-control"
                  id="rating"
                  defaultValue={0}
                  value={rating}
                  required=""
                />
                <p>{ratingText}</p>
              </div>

              <div className="col-12"></div>
              <label
                htmlFor="review"
                className="form-label required"
                style={{ fontSize: "25px" }}
              >
                Review
              </label>
              <textarea
                className="form-control"
                placeholder="Add review for the product here"
                id="review"
                style={{ height: 400 }}
                defaultValue={""}
                disabled={!ratingGiven}
                onChange={(event) => handleInputChange(event)}
              />
            </div>
            <div className="col-6 m-4">
              <button
                type="button"
                className="btn btn-danger me-2"
                onClick={(e) => handleSubmit(e)}
              >
                Close
              </button>

              <button
                type="submit"
                className="btn btn-success"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
              {showModal && (
                <Modal
                  title="Message"
                  body="successful"
                  cancelButtonPresent={false}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function ProductMiniCard({ imgSrc, cardTitle, sellerName }) {
  return (
    <div className="card mb-3" style={{ maxWidth: 525 }}>
      <div className="row g-0">
        <div className="col-md-3">
          <img src={imgSrc} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">{cardTitle}</h2>
            <h6>
              sold by <b>{sellerName}</b>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductReview;
