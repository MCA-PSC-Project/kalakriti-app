import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Logo from "../assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { convertToDateTime, formatDateTime } from "../utils/common";

function Orders() {
  const [ordersList, setOrdersList] = useState([]);
  useEffect(() => {
    api
      .get(`/customer-orders`)
      .then((response) => {
        setOrdersList(response.data === null ? [] : response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <NavBar />
      <h1>Orders</h1>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text-left">
          {ordersList.map((order) => {
            const orderedAt = formatDateTime(convertToDateTime(order.added_at));
            return (
              <OrdersHorizontalCard
                key={order.order_id + "-" + order.order_item_id}
                orderId={order.order_id + "-" + order.order_item_id}
                orderItemId={order.order_item_id}
                productId={order.product_id}
                imgSrc={order.media.path}
                cardTitle={order.product_name}
                sellerName={order.seller.seller_name}
                orderedAt={orderedAt}
                orderStatus={order.order_item_status}
              />
            );
          })}
          {/* <OrdersHorizontalCard
            imgSrc={Logo}
            cardTitle="product"
            sellerName="seller_name"
            orderId="1"
            orderedAt="30 May 2023"
            orderStatus="Delivered"
          />
          <OrdersHorizontalCard
            imgSrc={Logo}
            cardTitle="product"
            sellerName="seller_name"
            orderId="1"
            orderedAt="30 May 2023"
            orderStatus="Delivered"
          />
          <OrdersHorizontalCard
            imgSrc={Logo}
            cardTitle="product"
            sellerName="seller_name"
            orderId="1"
            orderedAt="30 May 2023"
            orderStatus="Delivered"
          /> */}
        </div>
      </div>
      <Footer />
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
  orderedAt,
  orderStatus,
}) {
  const navigate = useNavigate();
  return (
    <div className="card mb-3" style={{ maxWidth: 1000 }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={imgSrc} className="img-fluid rounded-start" alt="..." />
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
              <button type="button" className="btn btn-success me-2">
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

              <button type="button" className="btn btn-warning me-2">
                View Order Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
