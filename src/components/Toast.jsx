import React from "react";
import "./Toast.css";
function Toast({ toastType, message, onClose }) {
  const colorMapping = {
    error: "text-bg-danger",
    warning: "text-bg-warning",
    info: "text-bg-info",
    success: "text-bg-success",
  };
  console.log("Toast called");
  console.log("colorMapping.toastType=", colorMapping[toastType]);
  return (
    <div className="toast-container">
      <div
        className={
          "toast align-items-center border-0 show " + colorMapping[toastType]
        }
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}

export default Toast;
