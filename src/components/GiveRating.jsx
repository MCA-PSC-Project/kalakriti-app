import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarFilled } from "@fortawesome/free-solid-svg-icons";

function GiveRating() {
  const elements = [];
  for (let i = 1; i <= 5; i++) {
    elements.push(
      <FontAwesomeIcon icon={faStar} size="xl" style={{ color: "#000000" }} />
    );
  }
  return (
    <div>
      <h1>Rating: </h1>
      {elements}
    </div>
  );
}

export default GiveRating;
