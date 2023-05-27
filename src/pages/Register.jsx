import Footer from "../components/Footer";
import Logo from "../assets/logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";




const Gender_options = [
  { text: "Male", value: "male" },
  { text: "Female", value: "female" },
  { text: "Others", value: "others" },
];

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
      <div>
        <div className="text-center">
          <img src={Logo} alt="KalaKriti" style={{ width: 100, height: 100 }} />
        </div>
        <div style={{ marginTop: 20, marginLeft: 400, marginRight: 400 }}>
          <h1 className="text-center" style={{ fontFamily: "Comic Sans MS" }}>
            KALAKRITi
          </h1>
        </div>
        <div style={{ marginTop: 20, marginLeft: 400, marginRight: 400 }}>
          <h2
            className="text-center"
            style={{ fontFamily: "Comic Sans MS", marginTop: 40 }}
          >
            REGISTer Here
            <FontAwesomeIcon
              icon={faCircleDown}
              shake
              size="2xl"
              style={{ color: "#43d2e5", marginLeft: 40 }}
            />
          </h2>
        </div>
        <div
          className="border border-top-0 border border-3"
          style={{ marginTop: 60, marginLeft: 400, marginRight: 400 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label
                htmlFor="firstName"
                className="fs-5 d-flex justify-content-center"
              >
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                {...register("firstName", { required: true })}
                id="firstName"
              />
              {errors.firstName && (
                <span style={{ color: "red" }}>{errors.firstName.message}</span>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="lastName"
                className="fs-5 d-flex justify-content-center"
              >
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                {...register("lastName")}
                id="lastName"
              />
              {errors.lastName && (
                <span style={{ color: "red" }}>{errors.lastName.message}</span>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="email"
                className="fs-5 d-flex justify-content-center"
              >
                Email
              </label>
              <input
                type="email"
                className="form-control"
                {...register("email")}
                id="email"
              />
              {errors.email && (
                <span style={{ color: "red" }}>{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="password"
                className="fs-5 d-flex justify-content-center"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                {...register("password")}
                id="password"
              />
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password.message}</span>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="confirmPassword"
                className="fs-5 d-flex justify-content-center"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                {...register("confirmPassword")}
                id="confirmPassword"
              />
              {errors.confirmPassword && (
                <span style={{ color: "red" }}>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="dob"
                className="fs-5 d-flex justify-content-center"
              >
                Date Of Birth
              </label>
              <input
                type="date"
                className="form-control"
                {...register("dob")}
                id="dob"
              />
               {errors.dob && <span style={{color:"red"}}>
              {errors.dob.message}</span>}
            </div>

            <div className="form-group">
              <label
                htmlFor="gender"
                className="fs-5 d-flex justify-content-center"
              >
                Gender
              </label>
              <select className="form-control" {...register("gender")}>
                <option value="">Select Gender</option>
                {Gender_options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span style={{ color: "red" }}>{errors.gender.message}</span>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="Image"
                className="fs-5 d-flex justify-content-center"
              >
                UPLOAD YOUR DISPLAY PICTURE
              </label>
              <input
                type="file"
                accept="image/* , /pdf"
                className="btn btn-outline-primary"
                id="choose-file"
                name="choose-file"
                //style={{ marginLeft: 40 }}
                // value={selectedFile}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="d-grid gap-2 d-md-block">
              <button
                onClick={(e) => handleSubmit(e)}
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: 20, marginLeft: 325, marginBottom: 20 }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Register;
