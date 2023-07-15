import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Logo from "../assets/logo.jpeg";

const validationSchema = Yup.object().shape({
  nameOnCard: Yup.string().when("paymentMethod", {
    is: (value) => value === "credit" || value === "debit",
    then: Yup.string().required("Name on card is required"),
  }),
  cardNumber: Yup.string().when("paymentMethod", {
    is: (value) => value === "credit" || value === "debit",
    then: Yup.string()
      .required("Card number is required")
      .matches(/^[0-9]{16}$/, "Card number must be 16 digits"),
  }),
  expirationDate: Yup.string().when("paymentMethod", {
    is: (value) => value === "credit" || value === "debit",
    then: Yup.string()
      .required("Expiration date is required")
      .matches(
        /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
        "Expiration date must be in the format MM/YY"
      ),
  }),
  cvv: Yup.string().when("paymentMethod", {
    is: (value) => value === "credit" || value === "debit",
    then: Yup.string()
      .required("CVV is required")
      .matches(/^[0-9]{3}$/, "CVV must be 3 digits"),
  }),
});

function PaymentForm() {
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;
  const paymentMethod = watch("paymentMethod");

  const onSubmit = (data) => {
    console.log(data);
  };

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
        <h4 className="mb-3">Payment</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-3">
            <div className="form-check">
              <input
                {...register("paymentMethod")}
                id="POD"
                type="radio"
                className="form-check-input"
                value="POD"
                defaultChecked=""
              />
              <label className="form-check-label" htmlFor="POD">
                Pay On Delivery
              </label>
            </div>
            <div className="form-check">
              <input
                {...register("paymentMethod")}
                id="credit"
                type="radio"
                className="form-check-input"
                value="credit"
              />
              <label className="form-check-label" htmlFor="credit">
                Credit card
              </label>
            </div>
            <div className="form-check">
              <input
                {...register("paymentMethod")}
                id="debit"
                type="radio"
                className="form-check-input"
                value="debit"
              />
              <label className="form-check-label" htmlFor="debit">
                Debit card
              </label>
            </div>
            <div className="form-check">
              <input
                {...register("paymentMethod")}
                id="paypal"
                type="radio"
                className="form-check-input"
                value="paypal"
              />
              <label className="form-check-label" htmlFor="paypal">
                PayPal
              </label>
            </div>
          </div>

          {(paymentMethod === "credit" || paymentMethod === "debit") && (
            <>
              <div className="row gy-3">
                <div className="col-md-4">
                  <label htmlFor="cc-name" className="form-label">
                    Name on card
                  </label>
                  <input
                    {...register("nameOnCard")}
                    type="text"
                    className={`form-control ${
                      errors.nameOnCard ? "is-invalid" : ""
                    }`}
                    id="cc-name"
                    placeholder=""
                  />
                  <small className="text-body-secondary">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">
                    {errors.nameOnCard?.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label htmlFor="cc-number" className="form-label">
                    Card number
                  </label>
                  <input
                    {...register("cardNumber")}
                    type="text"
                    className={`form-control ${
                      errors.cardNumber ? "is-invalid" : ""
                    }`}
                    id="cc-number"
                    placeholder=""
                  />
                  <div className="invalid-feedback">
                    {errors.cardNumber?.message}
                  </div>
                </div>
                <div className="col-md-2">
                  <label htmlFor="cc-expiration" className="form-label">
                    Expiration
                  </label>
                  <input
                    {...register("expirationDate")}
                    type="text"
                    className={`form-control ${
                      errors.expirationDate ? "is-invalid" : ""
                    }`}
                    id="cc-expiration"
                    placeholder=""
                  />
                  <div className="invalid-feedback">
                    {errors.expirationDate?.message}
                  </div>
                </div>
                <div className="col-md-2">
                  <label htmlFor="cc-cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    {...register("cvv")}
                    type="password"
                    className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
                    id="cc-cvv"
                    placeholder=""
                  />
                  <div className="invalid-feedback">{errors.cvv?.message}</div>
                </div>
              </div>
            </>
          )}

          <hr className="my-4" />
          <button className="w-100 btn btn-primary btn-lg" type="submit">
            Pay
          </button>
        </form>
      </div>
    </>
  );
}

export default PaymentForm;
