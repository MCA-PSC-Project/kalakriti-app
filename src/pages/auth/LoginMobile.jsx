import Footer from "../../components/Footer";
import Logo from "../../assets/logo.jpeg";
import "./Login.css";
import { useEffect, useRef, useState } from "react";
import AuthService from "../../services/auth-service";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import AuthConsumer from "../../hooks/useAuth";
import api from "../../utils/api";

function LoginMobile({ setHasVisitedMobile }) {
  useEffect(() => {
    setHasVisitedMobile(true);
  }, [setHasVisitedMobile]);

  const mobileRef = useRef(null);
  // const [mobileNumber, setMobileNumber] = useState(null);
  const [loginUnsuccessful, setLoginUnsuccessful] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  // const { login } = useAuth();
  const { login } = AuthConsumer();

  const handleLogin = async (event) => {
    event.preventDefault();
    // setMobileNumber(mobileRef.current.value);
    const mobileNumber = mobileRef.current.value;
    const success = await login(mobileNumber);
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
    <div className="text-center">
      <main className="form-signin">
        <form>
          <img
            className="mb-4 mt-5"
            src={Logo}
            alt="Logo"
            style={{ width: 200, height: 200 }}
          />
          <h3 className="h3 mb-3 fw-normal">KalaKriti</h3>
          <h2 className="h2 mb-2 fw-normal">Please login</h2>
          {loginUnsuccessful && (
            <div className="alert alert-danger" role="alert">
              Login unsuccessful!!
            </div>
          )}
          <div className="form-floating">
            <input
              type="tel"
              className="form-control"
              id="mobile"
              placeholder=""
              ref={mobileRef}
            />
            <label htmlFor="mobile">Enter Mobile Number</label>
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" defaultValue="remember-me" /> Remember me
            </label>
          </div>
          <div className="form-floating">
            <input
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              value="Send OTP"
              onClick={(event) => {
                event.preventDefault();
                // setMobileNumber(mobileRef.current.value);
                const mobileNo = mobileRef.current.value;
                api
                  .post(`/auth/motp`, {
                    mobile_no: mobileNo,
                  })
                  .then((response) => {
                    if (response.status === 200) {
                      console.log(`Otp sent successfully`);
                      navigate("/login/motp", {
                        state: { mobileNo: mobileNo },
                      });
                    }
                  })
                  .catch((error) => {
                    console.error("Some error occured ");
                    console.error(error);
                  });
              }}
            />
          </div>
          <div className="mb-3">
            <Link to="/login">Login using Email</Link>
          </div>
          <div className="mb-3">
            <Link to="/register">Don't have an account? Register</Link>
          </div>
        </form>
      </main>
      {/* <div className="fixed-bottom"> */}
      <Footer />
      {/* </div> */}
    </div>
  );
}

export default LoginMobile;
