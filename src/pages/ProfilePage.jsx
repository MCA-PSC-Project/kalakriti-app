import React, { useState } from "react";
import "./ProfilePage.css";
import { BrowserRouter } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import profilePicSample from "../assets/profilePicSample.jpg";

function ProfilePage() {
  const [isActiveGeneral, setActiveGeneral] = useState(true);
  const [isActivePassword, setActivePassword] = useState(false);
  const [isActiveMobile, setActiveMobile] = useState(false);
  const [isActiveEmail, setActiveEmail] = useState(false);
  const [isActiveDP, setActiveDP] = useState(false);

  const ToggleGeneral = () => {
    setActiveGeneral(true);
    setActivePassword(false);
    setActiveMobile(false);
    setActiveEmail(false);
    setActiveDP(false);
  };
  const TogglePassword = () => {
    setActiveGeneral(false);
    setActivePassword(true);
    setActiveMobile(false);
    setActiveEmail(false);
    setActiveDP(false);
  };
  const ToggleMobile = () => {
    setActiveGeneral(false);
    setActivePassword(false);
    setActiveMobile(true);
    setActiveEmail(false);
    setActiveDP(false);
  };

  const ToggleEmail = () => {
    setActiveGeneral(false);
    setActivePassword(false);
    setActiveMobile(false);
    setActiveEmail(true);
    setActiveDP(false);
  };
  const ToggleDP = () => {
    setActiveGeneral(false);
    setActivePassword(false);
    setActiveMobile(false);
    setActiveEmail(false);
    setActiveDP(true);
  };

  return (
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
                      // defaultValue="nmaxwell"
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
                      // defaultValue="Nelle Maxwell"
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
                      // defaultValue="nmaxwell@mail.com"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="gender">
                      Gender
                    </label>
                    <select className="form-control">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
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
                  isActiveMobile ? "tab-pane fade active show" : "tab-pane fade"
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
                  isActiveEmail ? "tab-pane fade active show" : "tab-pane fade"
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
  );
}

export default ProfilePage;
