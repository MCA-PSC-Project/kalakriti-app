import React from "react";
import Logo from "../assets/logo.jpeg";
import { useLocation } from "react-router-dom";
import api from "../utils/api";

function Payment() {
  const { state } = useLocation();
  const {
    totalOfferPrice,
    totalDeliveryCharge,
    totalTaxCharge,
    totalDiscount,
  } = state; // Read values passed on state

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await api.post(`/payment/order`);

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;
    const options = {
      // key: "rzp_test_r6FiJfddJh76SI", // Enter the Key ID generated from the Dashboard
      key: import.meta.env.VITE_PAYMENT_KEY, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "KalaKriti",
      description: "Test Transaction",
      image: { Logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await api.post(`/payment/success`, data);

        alert(result.data.msg);
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <>
      <div className="container">
        <div className="text-center">
          <img
            className="mb-4 mt-5"
            src={Logo}
            alt="Logo"
            style={{ width: 150, height: 150 }}
          />
          <h5>KalaKriti</h5>
        </div>
        {/* <h4 className="mb-3">Payment</h4> */}
        <div className="row">
          <div className="col-md-6 col-lg-6 mx-auto">
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
        <div className="row">
          <div className="col-md-7 col-lg-8 mt-4">
            <button
              className="w-100 btn btn-success btn-lg"
              type="button"
              onClick={() => {
                displayRazorpay();
              }}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;