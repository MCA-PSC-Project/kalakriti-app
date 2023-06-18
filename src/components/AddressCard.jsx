import React, { useState, useEffect } from "react";
import Toast from "../components/Toast";
import api from "../utils/api";
function AddressCard(
  {addressId,
  customerName,
  addressLine1,
  addressLine2,district,city,
  state,
  country,
  pincode,
  landmark
  }) 


  {
    const [showToast, setShowToast] = useState(false);
    const [toastProperties, setToastProperties] = useState({});
    const [disable,setDisable] = useState(true);
    const handleClick =() =>{
            setDisable(!disable);
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
         {district}<br/>
         {city}<br/>
         {state}<br/>
         {country}<br/>
         {pincode} <br/>
         {landmark}
      
      </p>
  
         <button type="button" class="btn btn-danger" onClick={handleClick}>Edit</button>
            <div className={(disable) ? 'd-none' : 'card-body pb-2'} id="address-form">
                  <div className="form-group">
                    <label className="form-label" htmlFor="addL1">Address Line 1</label>
                    <input type="text" className="form-control" id="addL1" defaultValue={addressLine1}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="addL2">Address Line 2</label>
                    <input type="text" className="form-control" id="addL2" defaultValue={addressLine2} />
                  </div>
                  <div className="form-group">
                    <label className="form-label"htmlFor="district">District</label>
                    <input type="text" className="form-control" id ="district" defaultValue={district}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="state">State</label>
                    <input type="text" className="form-control" id="state" defaultValue={state}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="country">Country</label>
                    <input type="text" className="form-control" id="country" defaultValue={country}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="pincode">Pincode</label>
                    <input type="text" className="form-control" id="pincode" defaultValue={pincode} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="landmark">Landmark</label>
                    <input type="text" className="form-control" id="landmark" defaultValue={landmark} />
                  </div>
                  <button type="button" class="btn btn-success"
                  onClick={() => {
                    // console.log({ firstName, lastName, dob, gender });
                    api
                      .put("/addresses/{address.address_id}", {
                      
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