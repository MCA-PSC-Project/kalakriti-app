import Footer from "../components/Footer";
import Logo from "../assets/logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthService from "../services/auth-service";

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

    dob: yup
      .date()
      .max(new Date(), "Please enter a valid date of birth")
      .typeError("Date of birth is required"),

    // dp: yup.string().required("Please provide a profile picture"),
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

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const bodyContent = JSON.stringify({
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        dob: new Date(data.dob).toISOString(),
        gender: data.gender,
      });
      const response = await AuthService.register(bodyContent);
      // if (result.data) {
      //   // navigate("/profile");
      // }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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
        <div className="row">
          <div className="mx-auto col-10 col-md-8 col-lg-6">
            <form
              className="needs-validation"
              noValidate=""
              onSubmit={handleSubmit(onSubmit)}
            >
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
                    <span style={{ color: "red" }}>
                      {errors.firstName.message}
                    </span>
                  )}
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
                    <span style={{ color: "red" }}>
                      {errors.lastName.message}
                    </span>
                  )}
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
                    <span style={{ color: "red" }}>
                      {errors.password.message}
                    </span>
                  )}
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
                    <span style={{ color: "red" }}>
                      {errors.confirmPassword.message}
                    </span>
                  )}
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
                </div>

                <div className="col-12">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select className="form-control" {...register("gender")}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <span style={{ color: "red" }}>
                      {errors.gender.message}
                    </span>
                  )}
                </div>

                <div className="col-12">
                  <label htmlFor="dp" className="form-label">
                    UPLOAD YOUR PROFILE PICTURE (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/* , /pdf"
                    className="btn btn-outline-primary"
                    id="dp"
                    name="choose-file"
                  />
                  <br />
                  {errors.dp && (
                    <span style={{ color: "red" }}>{errors.dp.message}</span>
                  )}
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="w-100 btn btn-lg btn-success"
                    onClick={(e) => handleSubmit(e)}
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
