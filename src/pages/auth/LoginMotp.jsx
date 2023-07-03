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
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loginUnsuccessful, setLoginUnsuccessful] = useState(false);
  const { loginMotp } = AuthConsumer();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     inputs.current.forEach((input, index) => {
  //       input.addEventListener("keydown", function (event) {
  //         if (event.key === "Backspace") {
  //           input.value = "";
  //           if (index !== 0) inputs.current[index - 1].focus();
  //         } else {
  //           if (index === inputs.current.length - 1 && input.value !== "") {
  //             return true;
  //           } else if (event.keyCode > 47 && event.keyCode < 58) {
  //             input.value = event.key;
  //             if (index !== inputs.current.length - 1)
  //               inputs.current[index + 1].focus();
  //             event.preventDefault();
  //           } else if (event.keyCode > 64 && event.keyCode < 91) {
  //             input.value = String.fromCharCode(event.keyCode);
  //             if (index !== inputs.current.length - 1)
  //               inputs.current[index + 1].focus();
  //             event.preventDefault();
  //           }
  //         }
  //       });
  //     });

  //     inputs.current.forEach((input) => {
  //       input.addEventListener("input", () => {
  //         const isAllFilled = inputs.current.every(
  //           (input) => input.value.trim() !== ""
  //         );
  //         setIsButtonDisabled(!isAllFilled);
  //       });
  //     });
  //   }, []);

  function setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, "value").set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(
      prototype,
      "value"
    ).set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else {
      valueSetter.call(element, value);
    }

    element.dispatchEvent(new Event("input", { bubbles: true }));
  }

  useEffect(() => {
    inputs.current.forEach((input, index) => {
      input.addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
          setNativeValue(input, "");
          if (index !== 0) inputs.current[index - 1].focus();
        } else {
          if (index === inputs.current.length - 1 && input.value !== "") {
            return true;
          } else if (event.keyCode > 47 && event.keyCode < 58) {
            setNativeValue(input, event.key);
            if (index !== inputs.current.length - 1)
              inputs.current[index + 1].focus();
            event.preventDefault();
          } else if (event.keyCode > 64 && event.keyCode < 91) {
            setNativeValue(input, String.fromCharCode(event.keyCode));
            if (index !== inputs.current.length - 1)
              inputs.current[index + 1].focus();
            event.preventDefault();
          }
        }
      });

      input.addEventListener("input", () => {
        const isAllFilled = inputs.current.every(
          (input) => input.value.trim() !== ""
        );
        setIsButtonDisabled(!isAllFilled);
      });
    });
  }, []);

  const { login } = AuthConsumer();

  const handleMotpLogin = async (event) => {
    event.preventDefault();
    let motp = "";
    inputs.current.forEach((input) => {
      motp += input.value;
    });
    console.log("input motp= ", motp);
    const success = await loginMotp(mobileNo, motp);
    if (success) {
      // Login was successful
      // navigate("/");
      navigate(state?.path || "/");
    } else {
      // Login failed
      console.log("Login failed");
      setLoginUnsuccessful(true);
    }
  };

  return (
    <>
      <div className="container height-100 d-flex justify-content-center align-items-center">
        <div className="position-relative">
          <div className="card p-2 text-center">
            {loginUnsuccessful && (
              <div className="alert alert-danger" role="alert">
                Login unsuccessful!!
              </div>
            )}
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
              <button
                className="btn btn-danger px-4 validate"
                disabled={isButtonDisabled}
                onClick={handleMotpLogin}
              >
                Login
              </button>
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
