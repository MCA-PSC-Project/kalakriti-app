import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarFilled } from "@fortawesome/free-solid-svg-icons";

function Rating({ ratingValue, ratingCount }) {
  const rating = parseFloat(ratingValue);
  let ratingInteger = Math.floor(rating);
  const ratingFractional = rating - ratingInteger;
  // console.log(ratingValue, rating, ratingInteger, ratingFractional);
  const elements = [];
  for (let i = 1; i <= ratingInteger; i++) {
    elements.push(
      <FontAwesomeIcon
        icon={faStarFilled}
        size="xl"
        style={{ color: "#ffff00" }}
      />
    );
  }
  if (ratingFractional > 0 && ratingFractional <= 0.5) {
    elements.push(
      <FontAwesomeIcon
        icon={faStarHalfStroke}
        size="xl"
        style={{ color: "#ffff00" }}
      />
    );
    ratingInteger += 1;
  } else if (ratingFractional > 0.5) {
    elements.push(
      <FontAwesomeIcon
        icon={faStarFilled}
        size="xl"
        style={{ color: "#ffff00" }}
      />
    );
    ratingInteger += 1;
  }
  // remaining stars
  for (let i = ratingInteger + 1; i <= 5; i++) {
    elements.push(<FontAwesomeIcon icon={faStar} size="xl" />);
  }
  return (
    <div className="ratings">
      {elements}&nbsp;{ratingCount ? "(" + ratingCount + ")" : null}
    </div>
  );
}

export default Rating;
