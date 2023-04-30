import React, { useState } from "react";
import "./Rating.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function Rating() {
  return (
    <div className="ratings">
      <FontAwesomeIcon icon={faStar} />
    </div>
  );
}

export default Rating;
