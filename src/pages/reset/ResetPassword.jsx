import React, { useState } from "react";
import api from "../../utils/api";
import Modal from "../../components/Modal";

function ResetPassword() {
  const [email, setEmail] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [modalProperties, setModalProperties] = useState({});

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    if (id === "email") {
      setEmail(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .post(`/reset-password/request`, {
        user_type: "customer",
        email: email,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          console.log("reset password link sent to email ", email);
          setShowModal(true);
          setModalProperties({
            title: "Message",
            body: "Reset password link sent to email successfully",
            cancelButtonPresent: false,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        setShowModal(true);
        setModalProperties({
          title: "Message",
          body: "Some error occured in sending reset password link to email",
          cancelButtonPresent: false,
        });
      });
  };

  return (
    <>
      {showModal && (
        <Modal
          title={modalProperties.title}
          body={modalProperties.body}
          cancelButtonPresent={modalProperties.cancelButtonPresent}
          onClose={() => setShowModal(false)}
        />
      )}
      <h1>Reset Password</h1>
      <div className="row">
        <div className="mx-auto col-10 col-md-8 col-lg-6">
          <form className="needs-validation" noValidate="">
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Enter email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email here"
                  defaultValue=""
                  required=""
                  onChange={(event) => handleInputChange(event)}
                />
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={(event) => handleSubmit(event)}
                >
                  Send reset password link
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
