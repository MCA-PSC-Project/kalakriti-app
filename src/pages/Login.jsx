import Footer from "../components/Footer";
import Logo from "../assets/logo.jpeg";
import "./Login.css";
import { useState } from "react";
import { login } from "../services/auth-service";

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ email, password });
    // const signin = async (email, password) => {
    //   const response = await login(email, password);
    //   console.log(response);
    // };
    try {
      const response = await login({ email, password });
      // if (result.data) {
      //   // navigate("/profile");
      // }
        console.log(response.data);
    } catch (error) {
      console.log(error.data.message);
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
          <h2 className="h2 mb-2 fw-normal">Please sign in</h2>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              onChange={(event) => handleInputChange(event)}
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={(event) => handleInputChange(event)}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" defaultValue="remember-me" /> Remember me
            </label>
          </div>
          <input
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            value="Login"
            onClick={(event) => handleSubmit(event)}
          />
        </form>
      </main>
      {/* <div className="fixed-bottom"> */}
      <Footer />
      {/* </div> */}
    </div>
  );
}

export default Login;
