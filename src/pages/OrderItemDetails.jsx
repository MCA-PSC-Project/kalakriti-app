import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Loading from "../components/loading/Loading";
import api from "../utils/api";
// import "./OrderItemDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

function OrderItemDetails() {
  const { orderItemId } = useParams();
  const [isLoading, setIsLoading] = useState(true); // add a state variable to track the loading status
  const [orderItem, setOrderItem] = useState({});

  useEffect(() => {
    api
      .get(`/order-items/${orderItemId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setOrderItem(response.data === null ? {} : response.data);
          setIsLoading(false); // set isLoading to false when the data has been fetched
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // set isLoading to false when the data has been fetched
      });
  }, []);

  return (
    <>
      {isLoading ? ( // display the Loading component while the data is being fetched
        <Loading />
      ) : (
        <>
          <NavBar />
          <h1>Order Item Details</h1>
          {orderItem && (
            <>
              <OrderItemProductHorizontalCard
                key={orderItem.id}
                imgSrc={orderItem.media.path}
                cardTitle={orderItem.product_name}
                offerPrice={orderItem.offer_price}
                quantity={orderItem.quantity}
              />
              <h2>Order Item Status: {orderItem.order_item_status}</h2>
              <h2>Payment status: {orderItem.payment?.payment_status}</h2>
              {orderItem.payment.payment_mode && (
                <h2>Payment mode: {orderItem.payment.payment_mode}</h2>
              )}
              <OrderSummary
                key={orderItem.id}
                totalOfferPrice={
                  parseFloat(orderItem.offer_price) *
                  parseInt(orderItem.quantity)
                }
                totalDiscount={parseFloat(orderItem.discount)}
                totalTaxCharge={parseFloat(orderItem.tax)}
                totalDeliveryCharge={parseFloat(orderItem.delivery_charge ?? 0)}
              />
              <AddressCard
                key={orderItem.shipping_address.id}
                addressId={orderItem.shipping_address.id}
                fullNamef={orderItem.shipping_address.full_name}
                mobilef={orderItem.shipping_address.mobile}
                addressLine1={orderItem.shipping_address.address_line1}
                addressLine2={orderItem.shipping_address.address_line2}
                cityf={orderItem.shipping_address.city}
                districtf={orderItem.shipping_address.district}
                statef={orderItem.shipping_address.state}
                countryf={orderItem.shipping_address.country}
                pincodef={orderItem.shipping_address.pincode}
                landmarkf={orderItem.shipping_address?.landmark}
              />
            </>
          )}
          <Footer />
        </>
      )}
    </>
  );
}

function OrderItemProductHorizontalCard({
  imgSrc,
  cardTitle,
  offerPrice,
  quantity,
}) {
  return (
    <div className="card mb-3" style={{ maxWidth: 750 }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={imgSrc}
            className="img-fluid rounded-start"
            alt="..."
            style={{ aspectRatio: "1 / 1" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">{cardTitle}</h2>
            <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
              Sold Price : <span>&#8377;</span>
              {offerPrice}
            </div>
            <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
              Quantity Ordered: {quantity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderSummary({
  totalOfferPrice,
  totalDiscount,
  totalTaxCharge,
  totalDeliveryCharge,
}) {
  return (
    <>
      <div className="container">
        <div className="text-center">
          <div className="row">
            <div className="col-md-6 col-lg-6 mx-auto">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Order Summary</span>
                {/* <span className="badge bg-primary rounded-pill">3</span> */}
              </h4>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Product item(s)</h6>
                    <small className="text-body-secondary">Subtotal</small>
                  </div>
                  <span className="text-body-secondary">
                    <span>&#8377;</span>
                    {totalOfferPrice}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Delivery</h6>
                    <small className="text-body-secondary">Subtotal</small>
                  </div>
                  <span className="text-body-secondary">
                    <span>+&#8377;</span>
                    {totalDeliveryCharge}
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Tax</h6>
                    <small className="text-body-secondary">Subtotal</small>
                  </div>
                  <span className="text-body-secondary">
                    <span>+&#8377;</span>
                    {totalTaxCharge}
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Discount applied</h6>
                    <small className="text-body-secondary">Subtotal</small>
                  </div>
                  <span className="text-body-secondary">
                    <span>-&#8377;</span>
                    {totalDiscount}
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
                    {totalOfferPrice +
                      totalDeliveryCharge +
                      totalTaxCharge -
                      totalDiscount}
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
          </div>
        </div>
      </div>
    </>
  );
}

function AddressCard({
  addressId,
  fullNamef,
  mobilef,
  addressLine1,
  addressLine2,
  districtf,
  cityf,
  statef,
  countryf,
  pincodef,
  landmarkf,
}) {
  return (
    <>
      <div className="card" style={{ width: "40rem", marginTop: 30 }}>
        <div className={"card-body pb-2"}>
          <h5 className="card-title">Shipping Address {addressId}</h5>
          <p className="card-text">
            <b>{fullNamef}</b>
            <br />
            {mobilef}
            <br />
            {addressLine1}
            <br />
            {addressLine2}
            <br />
            {districtf}
            <br />
            {cityf}
            <br />
            {statef}
            <br />
            {countryf}
            <br />
            {pincodef} <br />
            {landmarkf}
          </p>
          <hr />
        </div>
      </div>
    </>
  );
}

function Section() {
  return (
    <section className="vh-100" style={{ backgroundColor: "#8c9eff" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-stepper text-black"
              style={{ borderRadius: 16 }}
            >
              <div className="card-body p-5">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  {/* <div>
                <h5 className="mb-0">
                  INVOICE{"{"}" "{"}"}
                  <span className="text-primary font-weight-bold">
                    #Y34XDHR
                  </span>
                </h5>
              </div> */}
                  {/* <div className="text-end">
                <p className="mb-0">
                  Expected Arrival <span>01/12/19</span>
                </p>
                <p className="mb-0">
                  USPS{"{"}" "{"}"}
                  <span className="font-weight-bold">
                    234094567242423422898
                  </span>
                </p>
              </div> */}
                </div>
                <ul
                  id="progressbar-2"
                  className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2"
                >
                  <li className="step0 active text-center" id="step1" />
                  <li className="step0 active text-center" id="step2" />
                  <li className="step0 active text-center" id="step3" />
                  <li className="step0 active text-center" id="step4" />
                  <li className="step0 text-muted text-end" id="step5" />
                </ul>
                <div className="d-flex justify-content-between">
                  <div className="d-lg-flex align-items-center">
                    <i className="fas fa-clipboard-list fa-3x me-lg-4 mb-3 mb-lg-0" />
                    <div>
                      <p className="fw-bold mb-1">Placed</p>
                      {/* <p className="fw-bold mb-0"></p> */}
                    </div>
                  </div>
                  <div className="d-lg-flex align-items-center">
                    {/* <i className="fas fa-box-open fa-3x me-lg-4 mb-3 mb-lg-0" /> */}
                    <div>
                      <p className="fw-bold mb-1">Confirmed</p>
                      {/* <p className="fw-bold mb-0"></p> */}
                    </div>
                  </div>
                  <div className="d-lg-flex align-items-center">
                    {/* <i className="fas fa-shipping-fast fa-3x me-lg-4 mb-3 mb-lg-0" /> */}
                    <FontAwesomeIcon
                      icon={faTruckFast}
                      fade
                      size="2xl"
                      style={{ color: "#263d9c" }}
                    />
                    <div>
                      <p className="fw-bold mb-1">Shipped</p>
                      {/* <p className="fw-bold mb-0"></p> */}
                    </div>
                  </div>
                  <div className="d-lg-flex align-items-center">
                    <i className="fas fa-home fa-3x me-lg-4 mb-3 mb-lg-0" />
                    <div>
                      <p className="fw-bold mb-1">Out For Delivery</p>
                      {/* <p className="fw-bold mb-0"></p> */}
                    </div>
                  </div>
                  <div className="d-lg-flex align-items-center">
                    <i className="fas fa-home fa-3x me-lg-4 mb-3 mb-lg-0" />
                    <div>
                      <p className="fw-bold mb-1">Delivered</p>
                      {/* <p className="fw-bold mb-0"></p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderItemDetails;
