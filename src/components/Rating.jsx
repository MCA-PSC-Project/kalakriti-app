import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";

function Rating({ ratingValue }) {
  const rating = parseFloat(ratingValue);
  const ratingInteger = Math.floor(rating);
  const ratingFractional = rating - ratingInteger;
  console.log(ratingValue, rating, ratingInteger, ratingFractional);
  const elements = [];
  for (let i = 1; i <= ratingInteger; i++) {
    elements.push(
      <FontAwesomeIcon icon={faStar} size="xl" style={{ color: "#ffff00" }} />
    );
  }
  if (ratingFractional) {
    elements.push(
      <FontAwesomeIcon
        icon={faStarHalfStroke}
        size="xl"
        style={{ color: "#ffff00" }}
      />
    );
  }
  return <div className="ratings">{elements}</div>;
}

export default Rating;
