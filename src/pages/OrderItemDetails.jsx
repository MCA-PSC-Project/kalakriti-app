import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Loading from "../components/loading/Loading";
import api from "../utils/api";

function OrderItemDetails() {
  const { orderItemId } = useParams();
  const [isLoading, setIsLoading] = useState(true); // add a state variable to track the loading status
  const [orderItem, setOrderItem] = useState({});

  useEffect(() => {
    api
      .get(`/order-item/${orderItemId}`)
      .then((response) => {
        if (response.status === 200) {
          setOrderItem(response.data === null ? {} : response.data);
          console.log(response.data);
          setIsLoading(false); // set isLoading to false when the data has been fetched
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // set isLoading to false when the data has been fetched
      });
  }, []);

  return (
    <>
      {isLoading ? ( // display the Loading component while the data is being fetched
        <Loading />
      ) : (
        <>
          <NavBar />
          <h1>Order Items Details</h1>
        </>
      )}
    </>
  );
}

export default OrderItemDetails;
