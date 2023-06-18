import React, { useState, useEffect } from "react";
import "./Settings.css";
import { BrowserRouter } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import profilePicSample from "../assets/profilePicSample.jpg";
import api from "../utils/api";
import Toast from "../components/Toast";
import { useDebugValue } from "react";
import AddressCard from "../components/AddressCard";


function Settings() {
  const [isActiveGeneral, setActiveGeneral] = useState(true);
  const [isActiveAddress, setActiveAddress] = useState(false);
  const [isActivePassword, setActivePassword] = useState(false);
  const [isActiveMobile, setActiveMobile] = useState(false);
  const [isActiveEmail, setActiveEmail] = useState(false);
  const [isActiveDP, setActiveDP] = useState(false);
  const [general, setGeneral] = useState([]);
  const [address, setAddress] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastProperties, setToastProperties] = useState({});

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState(null);
 

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "dob") {
      setDob(value);
    }
    if (id === "gender") {
      setGender(value);
    }
  };

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
      .get(`/customers/profile`)
      .then((response) => {
        setGeneral(response.data === null ? {} : response.data);
        console.log(response.data);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setDob(response.data.dob);
        setGender(response.data.gender);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    api
      .get(`/addresses`)
      .then((response) => {
        setAddress(response.data === null ? [] : response.data);
        console.log(response.data);
        // setFirstName(response.data.first_name);
        // setLastName(response.data.last_name);
        // setDob(response.data.dob);
        // setGender(response.data.gender);
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
                  My Addresses
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
                  <form>
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
                          onChange={(event) => handleInputChange(event)}
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
                          onChange={(event) => handleInputChange(event)}
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
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="gender">
                          Gender
                        </label>
                        <select
                          className="form-control"
                          id="gender"
                          onChange={(event) => handleInputChange(event)}
                        >
                          <option value="">Select Gender</option>
                          <option value="" selected>
                            {general.gender}
                          </option>
                          {general.gender !=="male"  &&   <option value="male">Male</option>}
                         {general.gender !=="female" && <option value="female">Female</option>}
                          {general.gender!=="other" && <option value="other">Other</option>}
                        </select>
                      </div>
                      <button
                        type="button"
                        style={{ marginTop: 20, marginLeft: 60 }}
                        className="btn btn-success"
                        onClick={() => {
                          console.log({ firstName, lastName, dob, gender });
                          api
                            .put("/customers/profile", {
                              first_name: firstName,
                              last_name: lastName,
                              dob: dob,
                              gender: gender,
                            })
                            .then((response) => {
                              console.log(response);
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
                              console.error(error);
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
                  </form>
                </div>

                <div
                  className={
                    isActiveAddress
                      ? "tab-pane fade active show"
                      : "tab-pane fade"
                  }
                  id="account-change-address"
               

                >{address && address.length > 0 ? (
                  address.map((add) => {
                    return (
              
                    <AddressCard
                    addressId={add.address_id}
                    customerName={general.first_name}
                    addressLine1={add.address_line1}
                    addressLine2={add.address_line2}
                    district={add.district}
                    city={add.city}
                    state={add.state}
                    country={add.country}
                    pincode={add.pincode}
                    landmark ={add.landmark}
                    />
                    );
                  })
                ) : (
                  <h1>No items in address</h1>
                )}

               
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
