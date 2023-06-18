import React, { useState, useEffect } from "react";
import Toast from "../components/Toast";
import api from "../utils/api";
function AddressCard(
  {addressId,
  customerName,
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
    };


    const handleInputChange = (event) => {
      const { id, value } = event.target;
  
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
    <div className="card-body">
      <h5 className="card-title">Address {addressId}</h5>
      <p className="card-text">
         <b>{customerName}</b><br/>
         {addressLine1}<br/>
         {addressLine2}<br/>
         {districtf}<br/>
         {cityf}<br/>
         {statef}<br/>
         {countryf}<br/>
         {pincodef} <br/>
         {landmarkf}
      
      </p>
  
         <button type="button" class="btn btn-danger" onClick={handleClick}>Edit</button>
            <div className={(disable) ? 'd-none' : 'card-body pb-2'} id="address-form">
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
                        address_line1:addL1,
                        address_line2:addL2,
                        district:district,
                        city:city,
                        state:state,
                        country:country,
                        pincode:pincode,
                        landmark:landmark,
                      
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
                  }} >Save</button>

                </div> 
   
      
    
    </div>
  </div>
  </>
);
}

export default AddressCard;