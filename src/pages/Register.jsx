import Footer from "../components/Footer";
import Logo from "../assets/logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [errorDOB, setErrorDOB] = useState("");
  const [errorGender, setErrorGender] = useState("");
  const [errorFile, setErrorFile] = useState("");


  let flag= true;
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
    if (id === "dob") {
      setDob(value);
    }
    // if (id === "choose-file"){
    //   setSelectedFile(value);
    // }

    setGender(value);
  };

  const handleFirstName =(e) =>{
      if(firstName==""){
        setErrorFirstName("First Name can't be null !!");
        flag=false;
        return;
    }
    else {
        console.log(firstName);
    }
    handleLastName();
  };

  const handleLastName =(e) =>{
      if(lastName===""){
         setErrorLastName("Last Name can't be null !!");
        flag=false;
        return;
    }
    else {
        console.log(lastName);
    }
  };

  const handleEmail =(e) =>{
    if(email===""){
      setErrorEmail("Email can't be null !!");
       flag=false;
       return;
   }
   else if(email.match(/\S+@\S+\.+\S+/)){
    console.log(email);
   }
   else{
       setErrorEmail("Please enter a valid email !!");
       flag=false;
       return;
   }

  };

  const handlePassword =(e) =>{
      if(password ===""){
         setErrorPassword("Password can't be null !!");
        flag=false;
        return;
    }
    else if(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/))
    {
         console.log(password);
    }
    else{
        setErrorPassword("Password should not be less than 8 digit, contain atleast one lowercase alphabet ,atleast one uppercase alphabet ,one digit(0-9) and one special character");
        flag=false;
        return;
    }
  };

  const handleConfirmPassword =(e) =>{
     if(confirmPassword ===""){
      setErrorConfirmPassword("Confirm your password !!");
      flag=false;
      return;
    }
    else if(confirmPassword != password )
    {
      setErrorConfirmPassword("Password and confirm password does not match");
      flag=false;
      return;
    }
   else{
    console.log(confirmPassword);
   }
  };

  const handleDob =(e) =>{
     let current_date=new Date();
     let date=new Date(dob);
    
     let a=current_date.getTime();
     let b=date.getTime();
      if(dob===""){
           setErrorDOB("Enter your Date Of Birth ."); 
          flag=false;
          return;
      }
      else  if(b> a)
      {
         setErrorDOB("Enter valid Date Of Birth !!");
          flag=false;
          return;
      }
     else{
        console.log(dob);
     }
  };

  const handleGender =(e) =>{
       if(gender==""){
        setErrorGender("Select any one option !!");
        flag=false;
        return;
    }
    else {
        console.log(gender);
    }
  };

  const reset =(e) =>{
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setDob("");
    setGender("");
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFirstName();
    handleLastName();
    handleEmail();
    handlePassword();
    handleConfirmPassword();
    handleDob();
    handleGender();

    if(flag){
      alert("form filled");
      reset();
    }
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
          <form className="data-bitwarden-watching={1}">
            <div>
              <label
                htmlFor="FirstName"
                className="fs-5 d-flex justify-content-center"
              >
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                style={{ marginLeft: 40, marginRight: 40 }}
                value={firstName}
                onChange={(e) => handleInputChange(e)}
                id="firstName"
          
              />
              <p class="text-danger" style={{ marginLeft: 40, marginRight: 40}}>{errorFirstName}</p>
            </div>
            <div>
              <label
                htmlFor="LastName"
                className="fs-5 d-flex justify-content-center"
              >
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                style={{ marginLeft: 40, marginRight: 40 }}
                value={lastName}
                onChange={(e) => handleInputChange(e)}
                id="lastName"
              />
              <p class="text-danger" style={{ marginLeft: 40, marginRight: 40}}>{errorLastName}</p>
            </div>
            <div>
              <label
                htmlFor="Email"
                className="fs-5 d-flex justify-content-center"
              >
                Email
              </label>
              <input
                type="email"
                className="form-control"
                style={{ marginLeft: 40, marginRight: 40 }}
                value={email}
                onChange={(e) => handleInputChange(e)}
                id="email"
              />
              <p class="text-danger" style={{ marginLeft: 40, marginRight: 40}}>{errorEmail}</p>
            </div>
            <div>
              <label
                htmlFor="Password"
                className="fs-5 d-flex justify-content-center"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                style={{ marginLeft: 40, marginRight: 40 }}
                value={password}
                onChange={(e) => handleInputChange(e)}
                id="password"
              />
              <p class="text-danger" style={{ marginLeft: 40, marginRight: 40}}>{errorPassword}</p>
            </div>
            <div>
              <label
                htmlFor="CPassword"
                className="fs-5 d-flex justify-content-center"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                style={{ marginLeft: 40, marginRight: 40 }}
                value={confirmPassword}
                onChange={(e) => handleInputChange(e)}
                id="confirmPassword"
              />
              <p class="text-danger" style={{ marginLeft: 40, marginRight: 40}}>{errorConfirmPassword}</p>
            </div>
            <div>
              <label
                htmlFor="DOB"
                className="fs-5 d-flex justify-content-center"
              >
                Date Of Birth
              </label>
              <input
                type="date"
                className="form-control"
                style={{ marginLeft: 40, marginRight: 40 }}
                value={dob}
                onChange={(e) => handleInputChange(e)}
                id="dob"
              />
               <p class="text-danger" style={{ marginLeft: 40, marginRight: 40}}>{errorDOB}</p>
            </div>

            <div>
              <label
                htmlFor="Gender"
                className="fs-5 d-flex justify-content-center"
              >
                Gender
              </label>
              <div style={{ marginLeft: 20 }}>
                <input
                  type="radio"
                  name="Gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => handleInputChange(e)}
                  style={{ width: 15, height: 15 }}
                />
                
                <label htmlFor="male">
                  <input
                    type="text"
                    value={"MALE"}
                    className="form-control"
                    style={{ marginLeft: 10 }}
                    size={27}
                    disabled
                  />
                </label>
                <input
                  type="radio"
                  name="Gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => handleInputChange(e)}
                  style={{ marginLeft: 100, width: 15, height: 15 }}
                />
                
                <label htmlFor="female">
                  <input
                    type="text"
                    value={"FEMALE"}
                    className="form-control"
                    style={{ marginLeft: 10 }}
                    size={27}
                    disabled
                  />
                </label>
                <p class="text-danger" style={{ marginLeft: 40, marginRight: 40}}>{errorGender}</p>
              </div>
            </div>

            <div>
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
                style={{ marginLeft: 40 }}
                value={selectedFile}
                onChange={(e) => handleInputChange(e)}
              />
               <p class="text-danger" style={{ marginLeft: 40, marginRight: 40}}>{errorFile}</p>
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
