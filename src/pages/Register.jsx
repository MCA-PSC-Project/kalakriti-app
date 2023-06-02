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
                    Full name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Full name"
                    defaultValue=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Valid full name is required.
                  </div>
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
                  />
                  <datalist id="countries-data-list-options">
                    <option value="India"></option>
                  </datalist>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
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
                  />
                  <datalist id="states-data-list-options">
                    <option value="Bihar"></option>
                    <option value="Jharkhand"></option>
                  </datalist>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
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
                  />
                  <datalist id="cities-data-list-options">
                    <option value="Patna"></option>
                  </datalist>

                  <div className="invalid-feedback">
                    Please provide a valid City.
                  </div>
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
                  />
                </div>
              </div>
              <hr className="my-4" />
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="same-address"
                />
                <label className="form-check-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="save-info"
                />
                <label className="form-check-label" htmlFor="save-info">
                  Save this information for next time
                </label>
              </div>
              <button type="submit" className="w-100 btn btn-lg btn-success">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
