import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarFilled } from "@fortawesome/free-solid-svg-icons";

function StarIcon({ index, icon, color, setRating, setHoverRating }) {
  const handleMouseEnter = () => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = () => {
    setRating(index);
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

function GiveRating() {
  const [rating, setRating] = useState();
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div>
      <h1>Rating: </h1>
      {[1, 2, 3, 4, 5].map((index) => (
        <StarIcon
          key={index}
          index={index}
          icon={index <= (hoverRating || rating) ? faStarFilled : faStar}
          color={index <= (hoverRating || rating) ? "#ffff00" : "#000000"}
          setRating={setRating}
          setHoverRating={setHoverRating}
        />
      ))}
    </div>
  );
}

export default GiveRating;
