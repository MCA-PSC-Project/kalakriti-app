import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Logo from "../assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { convertToDateTime, formatDateTime } from "../utils/common";
import Loading from "../components/loading/Loading"; // import the Loading component

function Orders() {
  const [isLoading, setIsLoading] = useState(true); // add a state variable to track the loading status
  const [ordersList, setOrdersList] = useState([]);
  useEffect(() => {
    api
      .get(`/customer-orders`)
      .then((response) => {
        if (response.status === 200) {
          setOrdersList(response.data === null ? [] : response.data);
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
          <h1>Orders</h1>
          <div className="d-flex justify-content-center align-items-center">
            <div className="text-left">
              {ordersList && ordersList.length > 0 ? (
                ordersList.map((order) => {
                  const orderedAt = formatDateTime(
                    convertToDateTime(order.added_at)
                  );
                  return (
                    <OrdersHorizontalCard
                      key={order.order_id + "-" + order.order_item_id}
                      orderId={order.order_id + "-" + order.order_item_id}
                      orderItemId={order.order_item_id}
                      productId={order.product_id}
                      productItemId={order.product_item_id}
                      imgSrc={order.media.path}
                      cardTitle={order.product_name}
                      sellerName={order.seller.seller_name}
                      orderedAt={orderedAt}
                      orderStatus={order.order_item_status}
                    />
                  );
                })
              ) : (
                <h1>No item in orders</h1>
              )}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

function OrdersHorizontalCard({
  imgSrc,
  cardTitle,
  sellerName,
  orderId,
  orderItemId,
  productId,
  productItemId,
  orderedAt,
  orderStatus,
}) {
  const navigate = useNavigate();
  return (
    <div className="card mb-3" style={{ maxWidth: 1000 }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={imgSrc}
            className="img-fluid rounded-start"
            alt="..."
            style={{ aspectRatio: "1 / 1" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item me-5">
                Order #
                <br />
                <strong>{orderId}</strong>
              </li>
              <li className="nav-item me-5">
                Order Placed
                <br />
                <strong>{orderedAt}</strong>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link" href="#">
                  Get Invoice
                </a>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link" href="#">
                  Track package
                </a>
              </li>
            </ul>
          </div>

          <div className="card-body">
            <h2 className="card-title">{cardTitle}</h2>
            <h6>sold by {sellerName}</h6>
            <p className="card-text">
              Order Status: <span className="text-info">{orderStatus}</span>
            </p>
            <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
              <button
                type="button"
                className="btn btn-success me-2"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate("/checkout", {
                    state: [productItemId],
                  });
                }}
              >
                Buy Again
              </button>

              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={() => {
                  navigate("/product-reviews", {
                    state: {
                      orderItemId: orderItemId,
                      productId: productId,
                      productItem: { imgSrc, cardTitle, sellerName },
                    },
                  });
                }}
              >
                Rate/Review Product
              </button>

              <button
                type="button"
                className="btn btn-warning me-2"
                onClick={() => {
                  navigate(`/order-items/${orderItemId}/details`);
                }}
              >
                View Order Item Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
