import React from "react";
import "./Toast.css";
function Toast({ showToast, message, onClose }) {
  console.log("Toast called");
  return (
    <div className="toast-container">
      <div
        className={
          showToast
            ? "toast align-items-center text-bg-primary border-0 show"
            : "toast align-items-center text-bg-primary border-0"
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
