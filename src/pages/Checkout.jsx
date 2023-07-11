import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/logo.jpeg";
import Footer from "../components/Footer";
import AddressCard from "../components/AddressCard";
import api from "../utils/api";
import { useLocation } from "react-router-dom";

function Checkout() {
  const { state } = useLocation();
  const products = [...state];

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    api
      .get(`/addresses`)
      .then((response) => {
        setAddresses(response.data === null ? [] : response.data);
        if (response.data && response.data.length > 0) {
          setSelectedAddress(response.data[0]);
        }
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleSelectedAddressIndex(index) {
    if (index >= 0 && index < addresses.length) {
      // console.log("addresses[index]=", addresses[index]);
      setSelectedAddress(addresses[index]);
    }
  }

  function handleSelectedAddress(addressObject) {
    setSelectedAddress(addressObject);
  }

  return (
    <>
      <div className="container">
        <main>
          <div className="py-5 text-center">
            <img
              className="d-block mx-auto mb-4"
              src={Logo}
              alt="KalaKriti logo"
              style={{ width: 150, height: 150 }}
            />
            <h2>Checkout Form</h2>
            {/* <p className="lead">
              Below is an example form built entirely with Bootstrap’s form
              controls. Each required form group has a validation state that can
              be triggered by attempting to submit the form without completing
              it.
            </p> */}
          </div>

          <div className="row">
            <div className="col-md-12">
              <h3>Selected Products</h3>
              {products &&
                products.length > 0 &&
                products.map((product) => {
                  return (
                    <CheckoutProductHorizontalCard
                      key={product.productId}
                      imgSrc={product.imgSrc}
                      cardTitle={product.cardTitle}
                      sellerName={product.sellerName}
                      originalPrice={product.originalPrice}
                      offerPrice={product.offerPrice}
                      stockStatus={product.stockStatus}
                      // minOrderQuantity={product.minOrderQuantity}
                      // maxOrderQuantity={product.maxOrderQuantity}
                      //  quantity={}
                      //  stockStatus={
                      //    cartItem.product_item.quantity_in_stock >=
                      //    cartItem.min_order_quantity
                      //      ? true
                      //      : false
                      //  }
                    />
                  );
                })}
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <h2>Shipping Address</h2>
              <h5>Saved addresses:</h5>
              <div className="form-check">
                {selectedAddress ? (
                  <AddressCard
                    addressId={selectedAddress.address_id}
                    fullNamef={selectedAddress.full_name}
                    mobilef={selectedAddress.mobile_no}
                    addressLine1={selectedAddress.address_line1}
                    addressLine2={selectedAddress.address_line2}
                    districtf={selectedAddress.district}
                    cityf={selectedAddress.city}
                    statef={selectedAddress.state}
                    countryf={selectedAddress.country}
                    pincodef={selectedAddress.pincode}
                    landmarkf={selectedAddress.landmark}
                  />
                ) : (
                  <h1>No saved address</h1>
                )}
              </div>
              {addresses && addresses.length > 0 && (
                <button
                  type="button"
                  className="btn btn-large btn-outline-warning me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#saved-addresses-modal"
                >
                  Select another from saved addresses
                </button>
              )}
              <SavedAdressesModal
                addresses={addresses}
                onSelectedIndex={handleSelectedAddressIndex}
              />

              <button
                type="button"
                className="btn btn-large btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#add-address-modal"
              >
                Add new address
              </button>
              <AddAddressModal onSelectedAddress={handleSelectedAddress} />
            </div>
          </div>

          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Order Summary</span>
                {/* <span className="badge bg-primary rounded-pill">3</span> */}
              </h4>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Product items</h6>
                    <small className="text-body-secondary">Subtotal</small>
                  </div>
                  <span className="text-body-secondary">
                    <span>&#8377;</span>
                    500
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Delivery</h6>
                    <small className="text-body-secondary">Subtotal</small>
                  </div>
                  <span className="text-body-secondary">
                    <span>&#8377;</span>
                    40
                  </span>
                </li>

                {/* <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
                  <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span className="text-success">−$5</span>
                </li> */}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (INR)</span>
                  <strong>
                    <span>&#8377;</span>
                    540
                  </strong>
                </li>
              </ul>
              {/* <form className="card p-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Promo code"
                  />
                  <button type="submit" className="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </form> */}
            </div>
            <div className="col-md-7 col-lg-8">
              {/* <h4 className="mb-3">Billing address</h4> */}
              {/* <AddressFormOld/> */}
              <PaymentForm />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

function CheckoutProductHorizontalCard({
  imgSrc,
  cardTitle,
  sellerName,
  originalPrice,
  offerPrice,
  minOrderQuantity,
  maxOrderQuantity,
  quantity,
  stockStatus,
}) {
  const [quantitySelected, setQuantitySelected] = useState(
    quantity ? quantity : minOrderQuantity
  );

  // const elements = [];
  // for (let i = minOrderQuantity; i <= maxOrderQuantity; i++) {
  //   elements.push(
  //     <li>
  //       <a className="dropdown-item" onClick={(e) => setQuantitySelected(i)}>
  //         {i}
  //       </a>
  //     </li>
  //   );
  // }

  return (
    <div className="card mb-3" style={{ maxWidth: 750 }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={imgSrc} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">{cardTitle}</h2>
            <h6>sold by {sellerName}</h6>
            {stockStatus ? (
              <h5 className="text-success">In Stock</h5>
            ) : (
              <h5 className="text-danger">Out Of Stock</h5>
            )}
            <p
              className="card-text"
              style={{ display: stockStatus ? null : "none" }}
            >
              <span>&#8377;</span>
              <del>{originalPrice}</del>&nbsp;
              <span>&#8377;</span>
              {offerPrice}
            </p>
            <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
              Quantity: {quantitySelected}
              {/* <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-outline-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  disabled={!stockStatus}
                >
                  Quantity: {quantitySelected}
                </button>
                <ul className="dropdown-menu">{elements}</ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SavedAdressesModal({ addresses, onSelectedIndex }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  function handleRadioChange(event) {
    setSelectedIndex(event.target.value);
  }

  function handleOkClick() {
    onSelectedIndex(selectedIndex);
  }

  return (
    <>
      {/* Vertically centered scrollable modal */}
      <div
        className="modal fade"
        id="saved-addresses-modal"
        tabIndex={-1}
        aria-labelledby="saved-addresses-modal-scrollable-title"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="saved-addresses-modal-scrollable-title"
              >
                Select Address:
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="form-check">
                {addresses && addresses.length > 0 ? (
                  addresses.map((address, index) => {
                    return (
                      <>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id={address.address_id}
                          value={index}
                          onChange={handleRadioChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={address.address_id}
                        >
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
                        </label>
                      </>
                    );
                  })
                ) : (
                  <h1>No items in address</h1>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={handleOkClick}
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

function AddAddressModal({ onSelectedAddress }) {
  return (
    <>
      {/* Vertically centered scrollable modal */}
      <div
        className="modal fade"
        id="add-address-modal"
        tabIndex={-1}
        aria-labelledby="add-address-modal-scrollable-title"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="add-address-modal-scrollable-title"
              >
                Add New Address
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <AddressForm
                onSelectedAddress={(addressObject) => {
                  onSelectedAddress(addressObject);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// function OldAddressForm() {
//   return (
//     <form className="needs-validation" noValidate="">
//       <div className="row g-3">
//         <div className="col-12">
//           <label htmlFor="firstName" className="form-label">
//             Full name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="fullName"
//             placeholder="Full name"
//             defaultValue=""
//             required=""
//           />
//           <div className="invalid-feedback">Valid full name is required.</div>
//         </div>

//         <div className="col-12">
//           <label htmlFor="mobile_no" className="form-label">
//             Mobile No.
//           </label>
//           <input
//             type="tel"
//             className="form-control"
//             id="mobile_no"
//             placeholder="Mobile number"
//             defaultValue=""
//             required=""
//             pattern=""
//           />
//           <div className="invalid-feedback">
//             Valid mobile number is required.
//           </div>
//         </div>

//         <div className="col-12">
//           <label htmlFor="address-line-1" className="form-label">
//             Address line 1
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="address-line-1"
//             placeholder="Flat, House no., Building, Company, Apartment"
//             required=""
//           />
//           <div className="invalid-feedback">
//             Please enter your address line 1.
//           </div>
//         </div>

//         <div className="col-12">
//           <label htmlFor="address-line-2" className="form-label">
//             Address Line 2
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="address-line-2"
//             placeholder="Area, Street, Sector, Village"
//           />
//           <div className="invalid-feedback">
//             Please enter your address line 2.
//           </div>
//         </div>

//         <div className="col-md-5">
//           <label htmlFor="country" className="form-label">
//             Country
//           </label>
//           <input
//             className="form-control"
//             list="countries-data-list-options"
//             id="country"
//             required=""
//           />
//           <datalist id="countries-data-list-options">
//             <option value="India"></option>
//           </datalist>
//           <div className="invalid-feedback">Please select a valid country.</div>
//         </div>

//         <div className="col-md-4">
//           <label htmlFor="state" className="form-label">
//             State
//           </label>
//           <input
//             className="form-control"
//             list="states-data-list-options"
//             id="state"
//             required=""
//           />
//           <datalist id="states-data-list-options">
//             <option value="Bihar"></option>
//             <option value="Jharkhand"></option>
//           </datalist>
//           <div className="invalid-feedback">Please provide a valid state.</div>
//         </div>

//         <div className="col-md-4">
//           <label htmlFor="district" className="form-label">
//             District
//           </label>
//           <input
//             className="form-control"
//             list="districts-data-list-options"
//             id="district"
//             required=""
//           />
//           <datalist id="districts-data-list-options">
//             <option value="Patna"></option>
//           </datalist>
//           <div className="invalid-feedback">
//             Please provide a valid District.
//           </div>
//         </div>

//         <div className="col-md-4">
//           <label htmlFor="city" className="form-label">
//             City
//           </label>
//           <input
//             className="form-control"
//             list="cities-data-list-options"
//             id="city"
//             required=""
//           />
//           <datalist id="cities-data-list-options">
//             <option value="Patna"></option>
//           </datalist>

//           <div className="invalid-feedback">Please provide a valid City.</div>
//         </div>
//         <div className="col-md-3">
//           <label htmlFor="pincode" className="form-label">
//             Pincode
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="pincode"
//             placeholder="6-digit [0-9] pincode"
//             required=""
//           />
//           <div className="invalid-feedback">Pincode required.</div>
//         </div>
//         <div className="col-12">
//           <label htmlFor="landmark" className="form-label">
//             Landmark
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="landmark"
//             placeholder="E.g. Near Shiv Temple"
//           />
//         </div>
//       </div>
//       <hr className="my-4" />
//       <div className="form-check">
//         <input type="checkbox" className="form-check-input" id="same-address" />
//         <label className="form-check-label" htmlFor="same-address">
//           Shipping address is the same as my billing address
//         </label>
//       </div>
//       <div className="form-check">
//         <input type="checkbox" className="form-check-input" id="save-info" />
//         <label className="form-check-label" htmlFor="save-info">
//           Save this information for next time
//         </label>
//       </div>
//       <div className="modal-footer">
//         <button
//           type="button"
//           className="btn btn-danger"
//           data-bs-dismiss="modal"
//         >
//           Close
//         </button>
//         <button
//           type="button"
//           className="btn btn-success"
//           data-bs-dismiss="modal"
//           onClick={() => {
//             api
//               .post(`/addresses`, {
//                 full_name: fullName,
//                 mobile_no: mobile,
//                 address_line1: addL1,
//                 address_line2: addL2,
//                 district: district,
//                 city: city,
//                 state: state,
//                 country: country,
//                 pincode: pincode,
//                 landmark: landmark,
//               })
//               .then((response) => {
//                 if (response.status === 201) {
//                   console.log("Address added successfully");
//                   // setShowModal(true);
//                   // setModalProperties({
//                   //   title: "Message",
//                   //   body: "Address added successfully",
//                   //   cancelButtonPresent: false,
//                   // });
//                 }
//               })
//               .catch((error) => {
//                 console.error("Some error occured in adding address");
//                 console.error(error);
//                 // setShowModal(true);
//                 // setModalProperties({
//                 //   title: "Message",
//                 //   body: "Some error occured in adding address",
//                 //   cancelButtonPresent: false,
//                 // });
//               });
//           }}
//         >
//           Save changes
//         </button>
//       </div>
//     </form>
//   );
// }

function AddressForm({ onSelectedAddress }) {
  const fullNameRef = useRef();
  const mobileRef = useRef();
  const addressLine1Ref = useRef();
  const addressLine2Ref = useRef();
  const districtRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();
  const pincodeRef = useRef();
  const landmarkRef = useRef();

  return (
    <form className="needs-validation" noValidate="">
      <div className="row g-3">
        <div className="col-12">
          <label htmlFor="firstName" className="form-label">
            Full name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            placeholder="Full name"
            defaultValue=""
            required=""
            ref={fullNameRef}
          />
          <div className="invalid-feedback">Valid full name is required.</div>
        </div>
        <div className="col-12">
          <label htmlFor="mobile_no" className="form-label">
            Mobile No.
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobile_no"
            placeholder="Mobile number"
            defaultValue=""
            required=""
            pattern=""
            ref={mobileRef}
          />
          <div className="invalid-feedback">
            Valid mobile number is required.
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="address-line-1" className="form-label">
            Address line 1
          </label>
          <input
            type="text"
            className="form-control"
            id="address-line-1"
            placeholder="Flat, House no., Building, Company, Apartment"
            required=""
            ref={addressLine1Ref}
          />
          <div className="invalid-feedback">
            Please enter your address line 1.
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="address-line-2" className="form-label">
            Address Line 2
          </label>
          <input
            type="text"
            className="form-control"
            id="address-line-2"
            placeholder="Area, Street, Sector, Village"
            ref={addressLine2Ref}
          />
          <div className="invalid-feedback">
            Please enter your address line 2.
          </div>
        </div>
        <div className="col-md-5">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input
            className="form-control"
            list="countries-data-list-options"
            id="country"
            required=""
            ref={countryRef}
          />
          <datalist id="countries-data-list-options">
            <option value="India"></option>
          </datalist>
          <div className="invalid-feedback">Please select a valid country.</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <input
            className="form-control"
            list="states-data-list-options"
            id="state"
            required=""
            ref={stateRef}
          />
          <datalist id="states-data-list-options">
            <option value="Bihar"></option>
            <option value="Jharkhand"></option>
          </datalist>
          <div className="invalid-feedback">Please provide a valid state.</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="district" className="form-label">
            District
          </label>
          <input
            className="form-control"
            list="districts-data-list-options"
            id="district"
            required=""
            ref={districtRef}
          />
          <datalist id="districts-data-list-options">
            <option value="Patna"></option>
          </datalist>
          <div className="invalid-feedback">
            Please provide a valid District.
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            className="form-control"
            list="cities-data-list-options"
            id="city"
            required=""
            ref={cityRef}
          />
          <datalist id="cities-data-list-options">
            <option value="Patna"></option>
          </datalist>
          <div className="invalid-feedback">Please provide a valid City.</div>
        </div>
        <div className="col-md-3">
          <label htmlFor="pincode" className="form-label">
            Pincode
          </label>
          <input
            type="text"
            className="form-control"
            id="pincode"
            placeholder="6-digit [0-9] pincode"
            required=""
            ref={pincodeRef}
          />
          <div className="invalid-feedback">Pincode required.</div>
        </div>
        <div className="col-12">
          <label htmlFor="landmark" className="form-label">
            Landmark
          </label>
          <input
            type="text"
            className="form-control"
            id="landmark"
            placeholder="E.g. Near Shiv Temple"
            ref={landmarkRef}
          />
        </div>
      </div>
      <hr className="my-4" />
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="same-address" />
        <label className="form-check-label" htmlFor="same-address">
          Shipping address is the same as my billing address
        </label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="save-info" />
        <label className="form-check-label" htmlFor="save-info">
          Save this information for next time
        </label>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-danger"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-success"
          data-bs-dismiss="modal"
          onClick={() => {
            const addressObject = {
              full_name: fullNameRef.current.value,
              mobile_no: mobileRef.current.value,
              address_line1: addressLine1Ref.current.value,
              address_line2: addressLine2Ref.current.value,
              district: districtRef.current.value,
              city: cityRef.current.value,
              state: stateRef.current.value,
              country: countryRef.current.value,
              pincode: pincodeRef.current.value,
              landmark: landmarkRef.current.value,
            };
            api
              .post(`/addresses`, addressObject)
              .then((response) => {
                if (response.status === 201) {
                  console.log("Address added successfully");
                  onSelectedAddress(addressObject);
                  // setShowModal(true);
                  // setModalProperties({
                  //   title: "Message",
                  //   body: "Address added successfully",
                  //   cancelButtonPresent: false,
                  // });
                }
              })
              .catch((error) => {
                console.error("Some error occured in adding address");
                console.error(error);
                // setShowModal(true);
                // setModalProperties({
                //   title: "Message",
                //   body: "Some error occured in adding address",
                //   cancelButtonPresent: false,
                // });
              });
          }}
        >
          Save changes
        </button>
      </div>
    </form>
  );
}

function PaymentForm() {
  return (
    <>
      <hr className="my-4" />
      <form className="needs-validation" noValidate="">
        <h4 className="mb-3">Payment</h4>
        <div className="my-3">
          <div className="form-check">
            <input
              id="POD"
              name="paymentMethod"
              type="radio"
              className="form-check-input"
              defaultChecked=""
              required=""
            />
            <label className="form-check-label" htmlFor="POD">
              Pay On Delivery
            </label>
          </div>
          <div className="form-check">
            <input
              id="credit"
              name="paymentMethod"
              type="radio"
              className="form-check-input"
              required=""
            />
            <label className="form-check-label" htmlFor="credit">
              Credit card
            </label>
          </div>
          <div className="form-check">
            <input
              id="debit"
              name="paymentMethod"
              type="radio"
              className="form-check-input"
              required=""
            />
            <label className="form-check-label" htmlFor="debit">
              Debit card
            </label>
          </div>
          <div className="form-check">
            <input
              id="paypal"
              name="paymentMethod"
              type="radio"
              className="form-check-input"
              required=""
            />
            <label className="form-check-label" htmlFor="paypal">
              PayPal
            </label>
          </div>
        </div>
        <div className="row gy-3">
          <div className="col-md-6">
            <label htmlFor="cc-name" className="form-label">
              Name on card
            </label>
            <input
              type="text"
              className="form-control"
              id="cc-name"
              placeholder=""
              required=""
            />
            <small className="text-body-secondary">
              Full name as displayed on card
            </small>
            <div className="invalid-feedback">Name on card is required</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="cc-number" className="form-label">
              Credit card number
            </label>
            <input
              type="text"
              className="form-control"
              id="cc-number"
              placeholder=""
              required=""
            />
            <div className="invalid-feedback">
              Credit card number is required
            </div>
          </div>
          <div className="col-md-3">
            <label htmlFor="cc-expiration" className="form-label">
              Expiration
            </label>
            <input
              type="text"
              className="form-control"
              id="cc-expiration"
              placeholder=""
              required=""
            />
            <div className="invalid-feedback">Expiration date required</div>
          </div>
          <div className="col-md-3">
            <label htmlFor="cc-cvv" className="form-label">
              CVV
            </label>
            <input
              type="text"
              className="form-control"
              id="cc-cvv"
              placeholder=""
              required=""
            />
            <div className="invalid-feedback">Security code required</div>
          </div>
        </div>
        <hr className="my-4" />
        <button className="w-100 btn btn-primary btn-lg" type="submit">
          Continue to checkout
        </button>
      </form>
    </>
  );
}
// function AddressFormOld() {
//   return (
//     <form className="needs-validation" noValidate="">
//       <div className="row g-3">
//         <div className="col-sm-6">
//           <label htmlFor="firstName" className="form-label">
//             First name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="firstName"
//             placeholder=""
//             defaultValue=""
//             required=""
//           />
//           <div className="invalid-feedback">Valid first name is required.</div>
//         </div>
//         <div className="col-sm-6">
//           <label htmlFor="lastName" className="form-label">
//             Last name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="lastName"
//             placeholder=""
//             defaultValue=""
//             required=""
//           />
//           <div className="invalid-feedback">Valid last name is required.</div>
//         </div>
//         <div className="col-12">
//           <label htmlFor="username" className="form-label">
//             Username
//           </label>
//           <div className="input-group has-validation">
//             <span className="input-group-text">@</span>
//             <input
//               type="text"
//               className="form-control"
//               id="username"
//               placeholder="Username"
//               required=""
//             />
//             <div className="invalid-feedback">Your username is required.</div>
//           </div>
//         </div>
//         <div className="col-12">
//           <label htmlFor="email" className="form-label">
//             Email <span className="text-body-secondary">(Optional)</span>
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             placeholder="you@example.com"
//           />
//           <div className="invalid-feedback">
//             Please enter a valid email address for shipping updates.
//           </div>
//         </div>
//         <div className="col-12">
//           <label htmlFor="address" className="form-label">
//             Address
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="address"
//             placeholder="Flat, House no., Building, Company, Apartment"
//             required=""
//           />
//           <div className="invalid-feedback">
//             Please enter your shipping address.
//           </div>
//         </div>
//         <div className="col-12">
//           <label htmlFor="address2" className="form-label">
//             Address 2 <span className="text-body-secondary">(Optional)</span>
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="address2"
//             placeholder="Area, Street, Sector, Village"
//           />
//         </div>
//         <div className="col-md-5">
//           <label htmlFor="country" className="form-label">
//             Country
//           </label>
//           <select className="form-select" id="country" required="">
//             <option value="Patna"></option>
//             <option value="Patna"></option>
//           </select>
//           <div className="invalid-feedback">Please select a valid country.</div>
//         </div>
//         <div className="col-md-4">
//           <label htmlFor="state" className="form-label">
//             State
//           </label>
//           <select className="form-select" id="state" required="">
//             <option value="Patna"></option>
//             <option value="Patna"></option>
//           </select>
//           <div className="invalid-feedback">Please provide a valid state.</div>
//         </div>
//         <div className="col-md-3">
//           <label htmlFor="zip" className="form-label">
//             Zip
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="zip"
//             placeholder=""
//             required=""
//           />
//           <div className="invalid-feedback">Zip code required.</div>
//         </div>
//       </div>
//       <hr className="my-4" />
//       <div className="form-check">
//         <input type="checkbox" className="form-check-input" id="same-address" />
//         <label className="form-check-label" htmlFor="same-address">
//           Shipping address is the same as my billing address
//         </label>
//       </div>
//       <div className="form-check">
//         <input type="checkbox" className="form-check-input" id="save-info" />
//         <label className="form-check-label" htmlFor="save-info">
//           Save this information for next time
//         </label>
//       </div>
//       <hr className="my-4" />
//       <h4 className="mb-3">Payment</h4>
//       <div className="my-3">
//         <div className="form-check">
//           <input
//             id="credit"
//             name="paymentMethod"
//             type="radio"
//             className="form-check-input"
//             defaultChecked=""
//             required=""
//           />
//           <label className="form-check-label" htmlFor="credit">
//             Credit card
//           </label>
//         </div>
//         <div className="form-check">
//           <input
//             id="debit"
//             name="paymentMethod"
//             type="radio"
//             className="form-check-input"
//             required=""
//           />
//           <label className="form-check-label" htmlFor="debit">
//             Debit card
//           </label>
//         </div>
//         <div className="form-check">
//           <input
//             id="paypal"
//             name="paymentMethod"
//             type="radio"
//             className="form-check-input"
//             required=""
//           />
//           <label className="form-check-label" htmlFor="paypal">
//             PayPal
//           </label>
//         </div>
//       </div>
//       <div className="row gy-3">
//         <div className="col-md-6">
//           <label htmlFor="cc-name" className="form-label">
//             Name on card
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="cc-name"
//             placeholder=""
//             required=""
//           />
//           <small className="text-body-secondary">
//             Full name as displayed on card
//           </small>
//           <div className="invalid-feedback">Name on card is required</div>
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="cc-number" className="form-label">
//             Credit card number
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="cc-number"
//             placeholder=""
//             required=""
//           />
//           <div className="invalid-feedback">Credit card number is required</div>
//         </div>
//         <div className="col-md-3">
//           <label htmlFor="cc-expiration" className="form-label">
//             Expiration
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="cc-expiration"
//             placeholder=""
//             required=""
//           />
//           <div className="invalid-feedback">Expiration date required</div>
//         </div>
//         <div className="col-md-3">
//           <label htmlFor="cc-cvv" className="form-label">
//             CVV
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="cc-cvv"
//             placeholder=""
//             required=""
//           />
//           <div className="invalid-feedback">Security code required</div>
//         </div>
//       </div>
//       <hr className="my-4" />
//       <button className="w-100 btn btn-primary btn-lg" type="submit">
//         Continue to checkout
//       </button>
//     </form>
//   );
// }

export default Checkout;
