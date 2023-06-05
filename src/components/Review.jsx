import React from "react";
import Rating from "./Rating";
import profilepicsample from "../assets/profilepicsample.jpeg";

function Review({ userName, rating, review }) {
  return (
    <>
      <div style={{ marginTop: 30, marginRight: 150 }}>
        <hr class="border border-sucess border opacity-50"></hr>
        <p>
          <img
            src={profilepicsample}
            class="rounded-circle"
            alt="Cinque Terre"
            width="30"
            height="30"
          ></img>
          &nbsp;&nbsp; &nbsp;{userName}
          <div style={{ marginLeft: 40, marginRight: 90 }}>
            <Rating ratingValue={rating} />
            {review}
          </div>
        </p>
      </div>
    </>
  );
}

export default Review;
