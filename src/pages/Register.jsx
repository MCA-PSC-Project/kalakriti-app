import Footer from "../components/Footer";
import Logo from "../assets/logo.jpeg";

function Register() {
  return (
    <>
      <div className="container">
        <div className="text-center">
          <img
            className="mb-4 mt-5"
            src={Logo}
            alt="Logo"
            style={{ width: 200, height: 200 }}
          />
          <h5>KalaKriti</h5>
          <h1>Register</h1>
        </div>
        <div class="row">
          <div class="mx-auto col-10 col-md-8 col-lg-6">
            <form className="needs-validation" noValidate="">
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First name"
                    defaultValue=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last name"
                    defaultValue=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    defaultValue=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Valid email is required.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    defaultValue=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Valid Password is required.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="confirm-password" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirm-password"
                    defaultValue=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Valid Confirm Password is required.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="dob" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    defaultValue=""
                    required=""
                  />
                  <div className="invalid-feedback">Valid dob is required.</div>
                </div>

                <div className="col-12">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select className="form-control">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="invalid-feedback">Gender is required.</div>
                </div>

                <div className="col-12">
                  <label htmlFor="dp" className="form-label">
                    UPLOAD YOUR DISPLAY PICTURE
                  </label>
                  <input
                    type="file"
                    accept="image/* , /pdf"
                    className="btn btn-outline-primary"
                    id="dp"
                    name="choose-file"
                    //style={{ marginLeft: 40 }}
                    // value={selectedFile}
                    // onChange={(e) => handleInputChange(e)}
                  />
                  <div className="invalid-feedback">
                    Valid image is required.
                  </div>
                </div>

                <button type="submit" className="w-100 btn btn-lg btn-success">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
