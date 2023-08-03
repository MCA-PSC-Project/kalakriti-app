import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import GiveRating from "../components/GiveRating";
import api from "../utils/api";
import Modal from "../components/Modal";
import Rating from "../components/Rating";

function ProductReview() {
  const { state } = useLocation();
  const { orderItemId, productId, productItem } = state;
  // console.log(orderItemId);
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState("");
  const [ratingGiven, setRatingGiven] = useState(false);
  const [review, setReview] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [modalProperties, setModalProperties] = useState({});
  const navigate = useNavigate();

  const [createMode, setCreateMode] = useState(true);
  const [updateMode, setUpdateMode] = useState(false);
  const [isEditButtonPresent, setIsEditButtonPresent] = useState(false);
  const [productReviewInitialResponse, setProductReviewInitialResponse] =
    useState({});
  useEffect(() => {
    api
      .get(`/product-review/${productId}`)
      .then((response) => {
        setProductReviewInitialResponse(
          response.data === null ? {} : response.data
        );
        if (response.data) {
          // edit button should be present only when there is reply of existing product rating and/or review
          setIsEditButtonPresent(true);
          setCreateMode(false);
        }
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
        setProductReviewInitialResponse({});
        setCreateMode(true);
      });
  }, []);

  function handleRatingChange(rating, text) {
    // console.log({ rating, text });
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
    if (createMode && !updateMode) {
      api
        .post(`/product-reviews`, {
          order_item_id: orderItemId,
          rating: rating,
          review: review,
          media_list: [],
        })
        .then((response) => {
          if (response.data) {
            console.log("Product review added successfully");
            setShowModal(true);
            setModalProperties({
              title: "Message",
              body: "Product review added successfully",
              cancelButtonPresent: false,
            });
          }
        })
        .catch((error) => {
          console.error("Some error occured in adding product review");
          console.error(error);
          setShowModal(true);
          setModalProperties({
            title: "Message",
            body: "Some error occured in adding product review",
            cancelButtonPresent: false,
          });
        });
    } else if (!createMode && updateMode) {
      api
        .put(`/product-reviews/${productReviewInitialResponse.review_id}`, {
          rating: rating || productReviewInitialResponse.rating,
          review: review || productReviewInitialResponse.review,
          media_list: [],
        })
        .then((response) => {
          if (response.data) {
            console.log("Product rating/review updated successfully");
            setShowModal(true);
            setModalProperties({
              title: "Message",
              body: "Product rating/review updated successfully",
              cancelButtonPresent: false,
            });
          }
        })
        .catch((error) => {
          console.error("Some error occured in updating product rating/review");
          console.error(error);
          setShowModal(true);
          setModalProperties({
            title: "Message",
            body: "Some error occured in adding product rating/review",
            cancelButtonPresent: false,
          });
        });
    }
  };

  const handleRemove = async () => {
    api
      .delete(`/product-reviews/${productReviewInitialResponse.review_id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("Product rating/review deleted successfully");
          setShowModal(true);
          setModalProperties({
            title: "Message",
            body: "Product rating/review deleted successfully",
            cancelButtonPresent: false,
          });
        }
      })
      .catch((error) => {
        console.error("Some error occured in deleting product rating/review");
        console.error(error);
        setShowModal(true);
        setModalProperties({
          title: "Message",
          body: "Some error occured in deleted product rating/review",
          cancelButtonPresent: false,
        });
      });
  };

  return (
    <>
      {/* {console.log({ productReviewInitialResponse })}; */}
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
                {createMode || updateMode ? (
                  <GiveRating
                    initialRating={
                      productReviewInitialResponse
                        ? productReviewInitialResponse?.rating
                        : 0
                    }
                    onRatingChange={handleRatingChange}
                  />
                ) : (
                  <Rating ratingValue={productReviewInitialResponse?.rating} />
                )}

                <input
                  type="hidden"
                  className="form-control"
                  id="rating"
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
                defaultValue={
                  productReviewInitialResponse
                    ? productReviewInitialResponse?.review
                    : ""
                }
                disabled={!updateMode && !ratingGiven}
                onChange={(event) => handleInputChange(event)}
              />
            </div>
            <div className="col-8 m-4">
              <button
                type="button"
                className="btn btn-secondary m-2"
                onClick={() => {
                  navigate("/orders");
                }}
              >
                Close
              </button>

              {isEditButtonPresent && (
                <button
                  type="button"
                  className="btn btn-warning m-2"
                  onClick={() => {
                    setUpdateMode(true);
                    setCreateMode(false);
                  }}
                  disabled={updateMode}
                >
                  Edit
                </button>
              )}

              {isEditButtonPresent && (
                <button
                  type="button"
                  className="btn btn-danger m-2"
                  data-bs-toggle="modal"
                  data-bs-target="#modal"
                  onClick={() => {
                    // setUpdateMode(true);
                    // setCreateMode(false);
                    handleRemove();
                  }}
                  disabled={updateMode}
                >
                  Remove
                </button>
              )}

              <button
                type="submit"
                className="btn btn-success m-2"
                data-bs-toggle="modal"
                data-bs-target="#modal"
                onClick={(event) => handleSubmit(event)}
                disabled={!ratingGiven && !updateMode}
              >
                Submit
              </button>

              {showModal && (
                <Modal
                  title={modalProperties.title}
                  body={modalProperties.body}
                  cancelButtonPresent={modalProperties.cancelButtonPresent}
                  onClose={() => {
                    setShowModal(false);
                    window.location.reload();
                  }}
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
