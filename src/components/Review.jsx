import React from "react";
import Rating from "./Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
function Review({ profilePic, userName, rating, review }) {
  return (
    <>
      <div>
        <hr className="border border-sucess border opacity-50"></hr>
        {profilePic ? (
          <img
            src={profilePic}
            class="rounded-circle"
            alt="Profile Pic"
            width="30"
            height="30"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} size="xl" />
        )}
        &nbsp;&nbsp;<b>{userName}</b>
        <div style={{ marginLeft: 30, marginRight: 90 }}>
          <Rating ratingValue={rating} />
          <p>{review}</p>
        </div>
      </div>
    </>
  );
}

export default Review;
