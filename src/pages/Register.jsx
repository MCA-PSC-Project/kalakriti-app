import Footer from "../components/Footer";
import Logo from "../assets/logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";

const schema = yup
  .object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    gender: yup.string().required("Gender is required"),
    email: yup
      .string()
      .required("Email is required")
      .matches(/\S+@\S+\.+\S+$/g, "This is not a valid email"),

    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Password should not be less than 8 digit, contain atleast one lowercase alphabet ,atleast one uppercase alphabet ,one digit(0-9) and one special character"
      ),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Mismatched passwords")
      .required("Please confirm your password"),

    dob: yup.date()
    .max( new Date(),"Please enter a valid date of birth").typeError("Date of birth is required"),

  })
  .required();

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) =>{ 
    console.log(values);
    alert("Form submitted!!!");
  };

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
          <h1>Register Here</h1>
          <FontAwesomeIcon
            icon={faCircleDown}
            shake
            size="2xl"
            style={{ color: "#43d2e5" }}
          />
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
                    {...register("firstName")}
                  />
                   {errors.firstName && (
                <span style={{ color: "red" }}>{errors.firstName.message}</span>
              )}
                  {/* <div className="invalid-feedback">
                    Valid first name is required.
                  </div> */}
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
                    {...register("lastName")}
                  />
                   {errors.lastName && (
                <span style={{ color: "red" }}>{errors.lastName.message}</span>
              )}
                  {/* <div className="invalid-feedback">
                    Valid last name is required.
                  </div> */}
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
                    {...register("email")}
                  />
                   {errors.email && (
                <span style={{ color: "red" }}>{errors.email.message}</span>
              )}
                  {/* <div className="invalid-feedback">
                    Valid email is required.
                  </div> */}
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
                    {...register("password")}
                  />
                   {errors.password && (
                <span style={{ color: "red" }}>{errors.password.message}</span>
              )}
                  {/* <div className="invalid-feedback">
                    Valid Password is required.
                  </div> */}
                </div>

                <div className="col-12">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    defaultValue=""
                    required=""
                    {...register("confirmPassword")}
                  />
                   {errors.confirmPassword && (
                <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
              )}
                  {/* <div className="invalid-feedback">
                    Valid Confirm Password is required.
                  </div> */}
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
                    {...register("dob")}
                  />
                   {errors.dob && (
                <span style={{ color: "red" }}>{errors.dob.message}</span>
              )}
                  {/* <div className="invalid-feedback">Valid dob is required.</div> */}
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
                    {...register("gender")}
                  </select>
                  {errors.gender && (
                <span style={{ color: "red" }}>{errors.gender.message}</span>
              )}
                  {/* <div className="invalid-feedback">Gender is required.</div> */}
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

                <div className="col-12">
                  <button
                    type="submit"
                    className="w-100 btn btn-lg btn-success"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
