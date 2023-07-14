import React from "react";

function Alert({ alertType, message }) {
  return (
    <div className={"alert alert-" + alertType} role="alert">
      {message}
    </div>
  );
}

export default Alert;
