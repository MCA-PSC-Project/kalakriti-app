import React, { useState, useEffect } from "react";
import "./Settings.css";
import addAddress from "../assets/addAddress.png";
import { HashLink as Link } from "react-router-hash-link";
import profilePicSample from "../assets/profilePicSample.jpg";
import api from "../utils/api";
import Toast from "../components/Toast";
import Modal from "../components/Modal";
import AddressCard from "../components/AddressCard";
import AuthConsumer from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [isActiveGeneral, setActiveGeneral] = useState(true);
  const [isActiveAddress, setActiveAddress] = useState(false);
  const [isActivePassword, setActivePassword] = useState(false);
  const [isActiveMobile, setActiveMobile] = useState(false);
  const [isActiveEmail, setActiveEmail] = useState(false);
  const [isActiveDP, setActiveDP] = useState(false);
  const [general, setGeneral] = useState([]);
  const [addresses, setAddress] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastProperties, setToastProperties] = useState({});

  const [showModal, setShowModal] = useState(true);
  const [modalProperties, setModalProperties] = useState({});

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState(null);
  const [newEmail, setNewEmail] = useState(null);

  const [isAddAddress, setAddAddress] = useState(true);
  const [isAddressForm, setAddressForm] = useState(false);

  const handleAddAddress = () => {
    setAddAddress(false);
    setAddressForm(true);
  };

  const [fullName, setFullName] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [addL1, setAddL1] = useState(null);
  const [addL2, setAddL2] = useState(null);
  const [district, setDistrict] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [landmark, setLandmark] = useState(null);
  const [selectedImage, setSelectedImage] = useState(profilePicSample);
  const [dpUpdateMode, setDpUpdateMode] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const { logout } = AuthConsumer();
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setSelectedImage(img);
      setImageURL(URL.createObjectURL(img));
      setDpUpdateMode(true);
    }
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    console.log("formdata= ", formData);
    api
      .post(`/uploads/image`, formData, config)
      .then((response) => {
        if (response.status === 201) {
          // console.log("image selected");
          console.log("response=", response.data);
          const mediaId = response.data.id;
          api
            .patch(`/customers/profile`, {
              dp_id: mediaId,
            })
            .then((response) => {
              if (response.status === 200) {
                console.log("dp successfully updated");
                setShowModal(true);
                setModalProperties({
                  title: "Message",
                  body: "dp successfully updated",
                  cancelButtonPresent: false,
                  onClose: () => {
                    setShowModal(false);
                    window.location.reload();
                  },
                });
              }
            })
            .catch((error) => {
              console.error("Some error occured ");
              console.error(error);
              setShowModal(true);
              setModalProperties({
                title: "Message",
                body: "Some error occured in updating dp",
                cancelButtonPresent: false,
                onClose: () => {
                  setShowModal(false);
                  window.location.reload();
                },
              });
            });
        }
      })
      .catch((error) => {
        console.error("Some error occured ");
        console.error(error);
        setShowModal(true);
        setModalProperties({
          title: "Message",
          body: "Some error occured in updating dp",
          cancelButtonPresent: false,
        });
      });
  };

  const handleInputChangeAddress = (event) => {
    const { id, value } = event.target;
    if (id === "fullName") {
      setFullName(value);
    }
    if (id === "mobile") {
      setMobile(value);
    }
    if (id === "addL1") {
      setAddL1(value);
    }
    if (id === "addL2") {
      setAddL2(value);
    }
    if (id === "district") {
      setDistrict(value);
    }
    if (id === "city") {
      setCity(value);
    }
    if (id === "state") {
      setState(value);
    }
    if (id === "country") {
      setCountry(value);
    }
    if (id === "pincode") {
      setPincode(value);
    }
    if (id === "landmark") {
      setLandmark(value);
    }
  };

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
        setEmail(response.data.email);
        setSelectedImage(response.data.dp?.path);
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
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const addNewAddress = () => {
    api
      .post(`/addresses`, {
        full_name: fullName,
        mobile_no: mobile,
        address_line1: addL1,
        address_line2: addL2,
        district: district,
        city: city,
        state: state,
        country: country,
        pincode: pincode,
        landmark: landmark,
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("Address added successfully");
          setShowModal(true);
          setModalProperties({
            title: "Message",
            body: "Address added successfully",
            cancelButtonPresent: false,
          });
        }
      })
      .catch((error) => {
        console.error("Some error occured in adding address");
        console.error(error);
        setShowModal(true);
        setModalProperties({
          title: "Message",
          body: "Some error occured in adding address",
          cancelButtonPresent: false,
        });
      });
  };
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

  const handleModalClose = () => {
    if (modalProperties.onClose) {
      modalProperties.onClose();
    } else {
      // setShowModal(false);
    }
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
      {showModal && (
        <Modal
          title={modalProperties.title}
          body={modalProperties.body}
          cancelButtonPresent={modalProperties.cancelButtonPresent}
          onClose={handleModalClose}
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
                          {general.gender !== "male" && (
                            <option value="male">Male</option>
                          )}
                          {general.gender !== "female" && (
                            <option value="female">Female</option>
                          )}
                          {general.gender !== "other" && (
                            <option value="other">Other</option>
                          )}
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
                >
                  <div
                    className="card"
                    style={{ width: "40rem", marginTop: 30 }}
                  >
                    <div className={isAddAddress ? "card-body pb-2" : "d-none"}>
                      <h5 className="card-title">Add Address</h5>
                      <hr />
                      <p className="card-text">
                        <button
                          type="button"
                          onClick={() => {
                            handleAddAddress();
                          }}
                        >
                          {" "}
                          <img
                            src={addAddress}
                            style={{ height: 80, width: 80 }}
                          ></img>
                        </button>
                      </p>
                    </div>
                  </div>

                  <div
                    className={isAddressForm ? "card-body pb-2" : "d-none"}
                    id="address-form"
                    style={{ backgroundColor: "beige" }}
                  >
                    <div className="form-group">
                      <label className="form-label" htmlFor="district">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        onChange={(event) => handleInputChangeAddress(event)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="district">
                        Mobile
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="mobile"
                        onChange={(event) => handleInputChangeAddress(event)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="addL1">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addL1"
                        onChange={(event) => handleInputChangeAddress(event)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="addL2">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addL2"
                        onChange={(event) => handleInputChangeAddress(event)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="district">
                        District
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="district"
                        onChange={(event) => handleInputChangeAddress(event)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="district">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        onChange={(event) => handleInputChangeAddress(event)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="state">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        onChange={(event) => handleInputChangeAddress(event)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="country">
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        onChange={(event) => handleInputChangeAddress(event)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="pincode">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pincode"
                        onChange={(event) => handleInputChangeAddress(event)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="landmark">
                        Landmark
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="landmark"
                        onChange={(event) => handleInputChangeAddress(event)}
                      />
                    </div>
                    <button
                      type="button"
                      class="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#modal"
                      onClick={() => {
                        setAddAddress(true);
                        setAddressForm(false);
                        addNewAddress();
                      }}
                    >
                      Save
                    </button>{" "}
                    &nbsp; &nbsp;
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => {
                        setAddAddress(true);
                        setAddressForm(false);
                      }}
                    >
                      Close
                    </button>
                  </div>

                  {addresses && addresses.length > 0 ? (
                    addresses.map((address) => {
                      return (
                        <AddressCard
                          addressId={address.address_id}
                          fullNamef={address.full_name}
                          mobilef={address.mobile_no}
                          addressLine1={address.address_line1}
                          addressLine2={address.address_line2}
                          districtf={address.district}
                          cityf={address.city}
                          statef={address.state}
                          countryf={address.country}
                          pincodef={address.pincode}
                          landmarkf={address.landmark}
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
                      <label className="form-label" htmlFor="currentPassword">
                        Current password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="currentPassword"
                        onChange={(event) => {
                          setCurrentPassword(event.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="newPassword">
                        New password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        onChange={(event) => {
                          setNewPassword(event.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label
                        className="form-label"
                        htmlFor="confirmNewPassword"
                      >
                        Confirm new password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmNewPassword"
                        onChange={(event) => {
                          setConfirmNewPassword(event.target.value);
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      style={{ marginTop: 20, marginLeft: 60 }}
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#modal"
                      onClick={() => {
                        // TODO: add validation here
                        if (newPassword !== confirmNewPassword) {
                          setShowModal(true);
                          setModalProperties({
                            title: "Message",
                            body: "new password and confirm new password did not match",
                            cancelButtonPresent: false,
                          });
                          return;
                        }
                        api
                          .post(`/reset-password/logged-in`, {
                            current_password: currentPassword,
                            new_password: newPassword,
                          })
                          .then((response) => {
                            if (response.status === 200) {
                              console.log(response.data);
                              setShowModal(true);
                              setModalProperties({
                                title: "Message",
                                body: response.data.message,
                                cancelButtonPresent: false,
                                onClose: () => {
                                  setShowModal(false);
                                  console.log("logging out");
                                  logout();
                                  navigate("/login");
                                },
                              });
                            }
                          })
                          .catch((error) => {
                            console.error("Some error occured ");
                            console.error(error);
                            setShowModal(true);
                            setModalProperties({
                              title: "Message",
                              body:
                                error?.response?.data?.message ||
                                "Some error occured in resetting password",
                              cancelButtonPresent: false,
                            });
                          });
                      }}
                    >
                      Reset Password
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
                        Enter New Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter email here"
                        onChange={(event) => {
                          setNewEmail(event.target.value);
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      style={{ marginTop: 20, marginLeft: 60 }}
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#modal"
                      onClick={() => {
                        api
                          .post(`/reset-email/request`, {
                            email: newEmail,
                          })
                          .then((response) => {
                            if (response.status === 201) {
                              console.log(
                                `Link to reset email sent to ${newEmail} sent successfully!`
                              );
                              setShowModal(true);
                              setModalProperties({
                                title: "Message",
                                body: `Link to reset email sent to ${newEmail} sent successfully!`,
                                cancelButtonPresent: false,
                              });
                            }
                          })
                          .catch((error) => {
                            console.error("Some error occured ");
                            console.error(error);
                            setShowModal(true);
                            setModalProperties({
                              title: "Message",
                              body: "Some error occured in sending link to reset email",
                              cancelButtonPresent: false,
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
                    isActiveDP ? "tab-pane fade active show" : "tab-pane fade"
                  }
                  id="account-change-dp"
                >
                  <p>
                    {selectedImage && (
                      <img
                        src={imageURL ?? selectedImage}
                        class="rounded-circle"
                        alt="preview"
                        width="200"
                        height="200"
                      />
                    )}
                    <br />
                    <input
                      accept="image/*"
                      type="file"
                      id="select-image"
                      onChange={handleImageChange}
                    />
                    <br />
                    <button
                      type="button"
                      style={{ marginTop: 20, marginLeft: 60 }}
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#modal"
                      disabled={!dpUpdateMode}
                      onClick={handleImageUpload}
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
