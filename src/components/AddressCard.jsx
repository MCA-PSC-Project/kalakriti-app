import React, { useState, useEffect } from "react";
import Toast from "../components/Toast";
import api from "../utils/api";
function AddressCard(
  {addressId,
  fullNamef,
  mobilef,
  addressLine1,
  addressLine2,
  districtf,
  cityf,
  statef,
  countryf,
  pincodef,
  landmarkf
  }) 

  {
    const [showToast, setShowToast] = useState(false);
    const [toastProperties, setToastProperties] = useState({});
    const [disable,setDisable] = useState(true);
    const [cardDisable,setCardDisable] = useState(false);

    const[fullName,setFullName] = useState(null);
    const [mobile,setMobile] = useState(null);
    const [addL1,setAddL1] =useState(null);
    const [addL2,setAddL2] = useState(null);
    const [district,setDistrict] = useState(null);
    const[city,setCity] = useState(null);
    const [state,setState] = useState(null);
    const [country,setCountry] = useState(null);
    const [pincode , setPincode] = useState(null);
    const [landmark,setLandmark] = useState(null);


    const handleClick =() =>{
            setDisable(!disable);
            setCardDisable(true);
    };


    const handleInputChange = (event) => {
      const { id, value } = event.target;
       if (id === "fullName") {
        setFullName(value);
      }
      if (id === "mobile") {
        setMobile(value);
      }
      if (id === "addL1") {
        setAddL1(value);
      }
      if (id === "addL2") {
        setAddL2(value);
      }
      if (id === "district") {
        setDistrict(value);
      }
      if (id === "city") {
        setCity(value);
      }
      if (id === "state") {
        setState(value);
      }
      if (id === "country") {
        setCountry(value);
      }
      if (id === "pincode") {
        setPincode(value);
      }
      if (id === "landmark") {
        setLandmark(value);
      }
    };


    useEffect(() => {
      if (showToast) {
        const timeoutId = setTimeout(() => {
          setShowToast(false);
          setToastProperties({});
        }, 2000);
  
        return () => clearTimeout(timeoutId);
      }
    }, [showToast]);


return (
  <>
  {showToast && (
    <Toast
      toastType={toastProperties.toastType}
      message={toastProperties.toastMessage}
      onClose={() => setShowToast(false)}
    />
  )}
  <div className="card" style={{ width: "40rem" , marginTop :30}}>
    <div className= {(cardDisable) ? 'd-none' : 'card-body pb-2'}>
      <h5 className="card-title">Address {addressId}</h5>
      <p className="card-text">
         <b>{fullNamef}</b><br/>
         {mobilef}<br/>
         {addressLine1}<br/>
         {addressLine2}<br/>
         {districtf}<br/>
         {cityf}<br/>
         {statef}<br/>
         {countryf}<br/>
         {pincodef} <br/>
         {landmarkf}
      
      </p>
      <hr />
         <button type="button" class="btn btn-danger" onClick={handleClick}>Edit</button>
         <button type="button" class="btn btn-danger">Remove</button>
    </div>
            <div className={(disable) ? 'd-none' : 'card-body pb-2]'} id="address-form">
            <div className="form-group">
                    <label className="form-label"htmlFor="district">Full Name</label>
                    <input type="text" className="form-control" id ="fullName" defaultValue={fullNamef}
                                              onChange={(event) => handleInputChange(event)}
                                              />
                </div>
                  <div className="form-group">
                    <label className="form-label"htmlFor="district">Mobile</label>
                    <input type="text" className="form-control" id ="mobile" defaultValue={mobilef}
                                              onChange={(event) => handleInputChange(event)}
                                              />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="addL1">Address Line 1</label>
                    <input type="text" className="form-control" id="addL1" defaultValue={addressLine1}
                                              onChange={(event) => handleInputChange(event)}
                                              />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="addL2">Address Line 2</label>
                    <input type="text" className="form-control" id="addL2" defaultValue={addressLine2} 
                                              onChange={(event) => handleInputChange(event)}
                                              />
                  </div>
                  <div className="form-group">
                    <label className="form-label"htmlFor="district">District</label>
                    <input type="text" className="form-control" id ="district" defaultValue={districtf}
                                              onChange={(event) => handleInputChange(event)}
                                              />
                  </div>
                  <div className="form-group">
                    <label className="form-label"htmlFor="district">City</label>
                    <input type="text" className="form-control" id ="city" defaultValue={cityf}
                                              onChange={(event) => handleInputChange(event)}
                                              />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="state">State</label>
                    <input type="text" className="form-control" id="state" defaultValue={statef}
                                              onChange={(event) => handleInputChange(event)}
                                              />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="country">Country</label>
                    <input type="text" className="form-control" id="country" defaultValue={countryf}
                                              onChange={(event) => handleInputChange(event)}
                                              />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="pincode">Pincode</label>
                    <input type="text" className="form-control" id="pincode" defaultValue={pincodef} 
                                              onChange={(event) => handleInputChange(event)}
                                              />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="landmark">Landmark</label>
                    <input type="text" className="form-control" id="landmark" defaultValue={landmarkf} 
                                              onChange={(event) => handleInputChange(event)}
                                              />
                  </div>
                  <button type="button" class="btn btn-success"
                  onClick={() => {
                    api
                      .put(`/addresses/${addressId}`, {
                        full_name:fullName || fullNamef,
                        mobile_no:mobile || mobilef,
                        address_line1:addL1 || addressLine1,
                        address_line2:addL2 || addressLine2,
                        district:district || districtf,
                        city:city || cityf,
                        state:state || statef,
                        country:country || countryf,
                        pincode:pincode || pincodef,
                        landmark:landmark || landmarkf,
                      
                      })
                      .then((response) => {
                        console.log(response);
                        if (response.data) {
                          console.log("profile updated successfully");
                          setShowToast(true);
                          setToastProperties({
                            toastType: "success",
                            toastMessage: "Profile Updated successfully",
                          });
                        }
                      })
                      .catch((error) => {
                        console.error(error);
                        setShowToast(true);
                        setToastProperties({
                          toastType: "error",
                          toastMessage:
                            "some error occured in updating profile",
                        });
                      });
                  }}
                   >Save</button>

                </div> 
   
      
    
    {/* </div> */}
  </div>
  </>
);
}

export default AddressCard;