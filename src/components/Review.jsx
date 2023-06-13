import React from "react";
import Rating from "./Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { convertToDateTime, formatDateTime } from "../utils/common";
function Review({
  profilePicSrc,
  userName,
  rating,
  review,
  added_at,
  updated_at,
}) {
  added_at = formatDateTime(convertToDateTime(added_at));
  if (updated_at) {
    updated_at = new Date(new Date(updated_at).getTime()).toISOString();
  }
  return (
    <>
      <div>
        <hr className="border border-sucess border opacity-50"></hr>
        {profilePicSrc ? (
          <img
            src={profilePicSrc}
            className="rounded-circle"
            alt="Profile Pic"
            width="30"
            height="30"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} size="xl" />
        )}
        &nbsp;&nbsp;<b>{userName}</b>
        <br />
        <span style={{ marginLeft: 30, marginRight: 90 }}>
          {updated_at ? updated_at + " edited" : added_at}
        </span>
        <div style={{ marginLeft: 30, marginRight: 90 }}>
          <Rating ratingValue={rating} />
          <p>{review}</p>
        </div>
      </div>
    </>
  );
}

export default Review;
