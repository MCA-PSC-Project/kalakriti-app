import Footer from "../../components/Footer";
import Logo from "../../assets/logo.jpeg";
import { useEffect, useRef, useState } from "react";
import AuthService from "../../services/auth-service";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import AuthConsumer from "../../hooks/useAuth";
import api from "../../utils/api";
import "./LoginMotp.css";

function LoginMotp() {
  const { state } = useLocation();
  const { mobileNo } = state; // Read values passed on state
  const maskedMobileNo = "******" + mobileNo.slice(6);
  const inputs = useRef([]);

  useEffect(() => {
    inputs.current.forEach((input, i) => {
      input.addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
          input.value = "";
          if (i !== 0) inputs.current[i - 1].focus();
        } else {
          if (i === inputs.current.length - 1 && input.value !== "") {
            return true;
          } else if (event.keyCode > 47 && event.keyCode < 58) {
            input.value = event.key;
            if (i !== inputs.current.length - 1) inputs.current[i + 1].focus();
            event.preventDefault();
          } else if (event.keyCode > 64 && event.keyCode < 91) {
            input.value = String.fromCharCode(event.keyCode);
            if (i !== inputs.current.length - 1) inputs.current[i + 1].focus();
            event.preventDefault();
          }
        }
      });
    });
  }, []);

  return (
    <>
      <div className="container height-100 d-flex justify-content-center align-items-center">
        <div className="position-relative">
          <div className="card p-2 text-center">
            <h6>
              Please enter the one time password <br /> to verify your account
            </h6>
            <div>
              <span>A code has been sent to</span>{" "}
              <small>{maskedMobileNo}</small>
            </div>
            <div
              id="otp"
              className="inputs d-flex flex-row justify-content-center mt-2"
            >
              <input
                className="m-2 text-center form-control rounded"
                type="text"
                id="first"
                maxLength={1}
                ref={(el) => (inputs.current[0] = el)}
              />
              <input
                className="m-2 text-center form-control rounded"
                type="text"
                id="second"
                maxLength={1}
                ref={(el) => (inputs.current[1] = el)}
              />
              <input
                className="m-2 text-center form-control rounded"
                type="text"
                id="third"
                maxLength={1}
                ref={(el) => (inputs.current[2] = el)}
              />
              <input
                className="m-2 text-center form-control rounded"
                type="text"
                id="fourth"
                maxLength={1}
                ref={(el) => (inputs.current[3] = el)}
              />
              <input
                className="m-2 text-center form-control rounded"
                type="text"
                id="fifth"
                maxLength={1}
                ref={(el) => (inputs.current[4] = el)}
              />
              <input
                className="m-2 text-center form-control rounded"
                type="text"
                id="sixth"
                maxLength={1}
                ref={(el) => (inputs.current[5] = el)}
              />
            </div>
            <div className="mt-4">
              <button className="btn btn-danger px-4 validate">Validate</button>
            </div>
          </div>
          <div className="card-2">
            <div className="content d-flex justify-content-center align-items-center">
              <span>Didn't get the code</span>
              <a href="#" className="text-decoration-none ms-3">
                Resend(1/3)
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginMotp;
