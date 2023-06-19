import React from "react";

function Modal({ title, body, cancelButtonPresent, onClose }) {
  // console.log("modal called");
  // console.log({ title, body, cancelButtonPresent });
  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="modal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  onClose();
                  window.location.reload();
                }}
              />
            </div>
            <div className="modal-body">{body}</div>
            <div className="modal-footer">
              {cancelButtonPresent && (
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={onClose}
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  onClose();
                  window.location.reload();
                }}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
