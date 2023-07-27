import React from "react";
import { useParams } from "react-router-dom";

function OrderItemDetails() {
  const { orderItemId } = useParams();

  return <div>OrderItemDetails {orderItemId}</div>;
}

export default OrderItemDetails;
