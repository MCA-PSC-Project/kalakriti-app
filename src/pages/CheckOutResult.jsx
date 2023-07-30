import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CheckOutResult() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { result } = state; // Read values passed on state

  const handleGoHome = () => {
    navigate("/");
  };

  window.onpopstate = () => {
    navigate("/");
  };

  return (
    <>
      {/* <div>CheckOutResult</div>; */}
      {result === "success" ? (
        <h1 style={{ color: "green" }}>Order Placed Successfully!!</h1>
      ) : (
        <h1 style={{ color: "red" }}>Order Placing Failed!!</h1>
      )}
      <button type="button" className="btn btn-primary" onClick={handleGoHome}>
        Go to home
      </button>
    </>
  );
}

export default CheckOutResult;
