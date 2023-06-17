import React from "react";

function Modal({ title, body, cancelButtonPresent }) {
  return (
    <div className="modal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>{body}</p>
          </div>
          <div className="modal-footer">
            {cancelButtonPresent && (
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            )}
            <button type="button" className="btn btn-primary">
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
