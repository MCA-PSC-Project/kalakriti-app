import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarFilled } from "@fortawesome/free-solid-svg-icons";

function StarIcon({
  index,
  icon,
  color,
  setRating,
  setHoverRating,
  onRatingChange,
}) {
  const handleMouseEnter = () => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = () => {
    setRating(index);
    let text;
    switch (index) {
      case 1:
        text = "Poor";
        break;
      case 2:
        text = "Not good";
        break;
      case 3:
        text = "Satisfactory";
        break;
      case 4:
        text = "Very good";
        break;
      case 5:
        text = "Excellent";
        break;
      default:
        break;
    }
    onRatingChange(index, text);
  };

  return (
    <>
      <FontAwesomeIcon
        icon={icon}
        size="xl"
        style={{ color: color }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
    </>
  );
}

function GiveRating({ onRatingChange }) {
  const [rating, setRating] = useState();
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => (
        <StarIcon
          key={index}
          index={index}
          icon={index <= (hoverRating || rating) ? faStarFilled : faStar}
          color={index <= (hoverRating || rating) ? "#ffff00" : "#000000"}
          setRating={setRating}
          setHoverRating={setHoverRating}
          onRatingChange={onRatingChange}
        />
      ))}
    </div>
  );
}

export default GiveRating;
