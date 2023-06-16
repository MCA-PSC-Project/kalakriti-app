import React, { useState, useEffect } from "react";
import "./Settings.css";
import { BrowserRouter } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import profilePicSample from "../assets/profilePicSample.jpg";
import api from "../utils/api";
import authHeader from "../services/auth-header";
import Toast from "../components/Toast";

function Settings() {
  const [isActiveGeneral, setActiveGeneral] = useState(true);
  const [isActiveAddress, setActiveAddress] = useState(false);
  const [isActivePassword, setActivePassword] = useState(false);
  const [isActiveMobile, setActiveMobile] = useState(false);
  const [isActiveEmail, setActiveEmail] = useState(false);
  const [isActiveDP, setActiveDP] = useState(false);
  const [general, setGeneral] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastProperties, setToastProperties] = useState({});

  useEffect(() => {
    if (showToast) {
      const timeoutId = setTimeout(() => {
        setShowToast(false);
        setToastProperties({});
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [showToast]);

  useEffect(() => {
    api
      .get(`/customers/profile`,{ headers: authHeader() })
      .then((response) => {
        setGeneral(response.data === null ? {} : response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const ToggleGeneral = () => {
    setActiveGeneral(true);
    setActiveAddress(false);
    setActivePassword(false);
    setActiveMobile(false);
    setActiveEmail(false);
    setActiveDP(false);
  };
  const ToggleAddress = () => {
    setActiveGeneral(false);
    setActiveAddress(true);
    setActivePassword(false);
    setActiveMobile(false);
    setActiveEmail(false);
    setActiveDP(false);
  };
  const TogglePassword = () => {
    setActiveGeneral(false);
    setActiveAddress(false);
    setActivePassword(true);
    setActiveMobile(false);
    setActiveEmail(false);
    setActiveDP(false);
  };
  const ToggleMobile = () => {
    setActiveGeneral(false);
    setActiveAddress(false);
    setActivePassword(false);
    setActiveMobile(true);
    setActiveEmail(false);
    setActiveDP(false);
  };

  const ToggleEmail = () => {
    setActiveGeneral(false);
    setActiveAddress(false);
    setActivePassword(false);
    setActiveMobile(false);
    setActiveEmail(true);
    setActiveDP(false);
  };
  const ToggleDP = () => {
    setActiveGeneral(false);
    setActiveAddress(false);
    setActivePassword(false);
    setActiveMobile(false);
    setActiveEmail(false);
    setActiveDP(true);
  };

  return (
    <>
      {showToast && (
        <Toast
          toastType={toastProperties.toastType}
          message={toastProperties.toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="container light-style flex-grow-1 container-p-y">
        <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
        <div className="card overflow-hidden">
          <div className="row no-gutters row-bordered row-border-light">
            <div className="col-md-3 pt-0">
              <div className="list-group list-group-flush account-settings-links">
                <Link
                  smooth
                  className={
                    isActiveGeneral
                      ? "list-group-item list-group-item-action active"
                      : "list-group-item list-group-item-action"
                  }
                  data-toggle="list"
                  to="#account-general"
                  onClick={ToggleGeneral}
                >
                  General
                </Link>
                <Link
                  smooth
                  className={
                    isActiveAddress
                      ? "list-group-item list-group-item-action active"
                      : "list-group-item list-group-item-action"
                  }
                  data-toggle="list"
                  to="#account-change-address"
                  onClick={ToggleAddress}
                >
                  Change/Add Address
                </Link>
                <Link
                  className={
                    isActivePassword
                      ? "list-group-item list-group-item-action active"
                      : "list-group-item list-group-item-action"
                  }
                  data-toggle="list"
                  to="#account-change-password"
                  onClick={TogglePassword}
                >
                  Change Password
                </Link>
                <Link
                  className={
                    isActiveMobile
                      ? "list-group-item list-group-item-action active"
                      : "list-group-item list-group-item-action"
                  }
                  data-toggle="list"
                  to="#account-change-mobile"
                  onClick={ToggleMobile}
                >
                  Change/Add Mobile Number
                </Link>
                <Link
                  className={
                    isActiveEmail
                      ? "list-group-item list-group-item-action active"
                      : "list-group-item list-group-item-action"
                  }
                  data-toggle="list"
                  to="#account-change-email"
                  onClick={ToggleEmail}
                >
                  Change Email ID
                </Link>
                <Link
                  className={
                    isActiveDP
                      ? "list-group-item list-group-item-action active"
                      : "list-group-item list-group-item-action"
                  }
                  data-toggle="list"
                  to="#account-change-dp"
                  onClick={ToggleDP}
                >
                  Change/Add Profile picture
                </Link>
              </div>
            </div>
            <div className="col-md-9" style={{ backgroundColor: "beige" }}>
              <div className="tab-content">
                <div
                  className={
                    isActiveGeneral
                      ? "tab-pane fade active show"
                      : "tab-pane fade"
                  }
                  id="account-general"
                >
                  <hr className="border-light m-0" />
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label" htmlFor="firstName">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        className="form-control mb-1"
                        defaultValue={general.first_name}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="lastName">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        className="form-control"
                        defaultValue={general.last_name}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="dob">
                        Date of Birth
                      </label>
                      <input
                        id="dob"
                        type="date"
                        className="form-control mb-1"
                        defaultValue={general.dob}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="gender">
                        Gender
                      </label>
                      <select className="form-control" id="gender">
                        <option value="">Select Gender</option>
                        <option value="" selected>
                          {general.gender}
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      style={{ marginTop: 20, marginLeft: 60 }}
                      className="btn btn-success"
                      onClick={() => {
                        api
                          .put("/customers/profile", {
                            first_name: firstName,
                            last_name: lastName,
                            dob: dob,
                            gender: gender,
                          })
                          .then((response) => {
                            if (response.data) {
                              console.log("profile updated successfully");
                              setShowToast(true);
                              setToastProperties({
                                toastType: "success",
                                toastMessage: "Profile Updated successfully",
                              });
                            }
                          })
                          .catch((error) => {
                            console.error(
                              "some error occured in updating profile"
                            );
                            setShowToast(true);
                            setToastProperties({
                              toastType: "error",
                              toastMessage:
                                "some error occured in updating profile",
                            });
                          });
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
                  <div
                    className={
                      isActiveAddress
                        ? "tab-pane fade active show"
                        : "tab-pane fade"
                    }
                    id="account-change-address"
                  >
                    <div className="card-body pb-2">
                      <div className="form-group">
                        <label className="form-label">Address Line 1</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Address Line 2</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">District</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">State</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Country</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Pincode</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Landmark</label>
                        <input type="text" className="form-control" />
                      </div>
                      
                      <button
                        type="button"
                        style={{ marginTop: 20, marginLeft: 60 }}
                        className="btn btn-success"
                      >
                        Update
                      </button>
                    </div>
                  </div>
               
                <div
                  className={
                    isActivePassword
                      ? "tab-pane fade active show"
                      : "tab-pane fade"
                  }
                  id="account-change-password"
                >
                  <div className="card-body pb-2">
                    <div className="form-group">
                      <label className="form-label">Current password</label>
                      <input type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">New password</label>
                      <input type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Repeat new password</label>
                      <input type="password" className="form-control" />
                    </div>
                    <button
                      type="button"
                      style={{ marginTop: 20, marginLeft: 60 }}
                      className="btn btn-success"
                    >
                      Update
                    </button>
                  </div>
                </div>

                <div
                  className={
                    isActiveMobile
                      ? "tab-pane fade active show"
                      : "tab-pane fade"
                  }
                  id="account-change-mobile"
                >
                  <div className="card-body pb-2">
                    <div className="form-group">
                      <label className="form-label" html for="mobile">
                        Mobile Number
                      </label>
                      <input id="mobile" type="text" className="form-control" />
                      <label className="form-label" html for="otp">
                        Enter OTP
                      </label>
                      <input id="otp" type="text" className="form-control" />
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginTop: 20, marginLeft: 20 }}
                      >
                        Get OTP
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        style={{ marginTop: 20, marginLeft: 20 }}
                        disabled
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    isActiveEmail
                      ? "tab-pane fade active show"
                      : "tab-pane fade"
                  }
                  id="account-change-email"
                >
                  <div className="card-body pb-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        Email Id
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    <button
                      type="button"
                      style={{ marginTop: 20, marginLeft: 60 }}
                      className="btn btn-success"
                    >
                      Update
                    </button>
                  </div>
                </div>
                <div
                  className={
                    isActiveDP ? "tab-pane fade active show" : "tab-pane fade"
                  }
                  id="account-change-dp"
                >
                  <p>
                    {" "}
                    <img
                      src={profilePicSample}
                      class="rounded-circle"
                      alt="Cinque Terre"
                      width="200"
                      height="200"
                    ></img>
                    <br />
                    <button
                      type="button"
                      style={{ marginTop: 20, marginLeft: 60 }}
                      className="btn btn-success"
                    >
                      Update
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
