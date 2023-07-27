import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Loading from "../components/loading/Loading";
import api from "../utils/api";
import "./OrderItemDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";

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
          <h1>Order Item Details</h1>

          <section className="vh-100" style={{ backgroundColor: "#8c9eff" }}>
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12">
                  <div
                    className="card card-stepper text-black"
                    style={{ borderRadius: 16 }}
                  >
                    <div className="card-body p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <div>
                          <h5 className="mb-0">
                            INVOICE{"{"}" "{"}"}
                            <span className="text-primary font-weight-bold">
                              #Y34XDHR
                            </span>
                          </h5>
                        </div>
                        <div className="text-end">
                          <p className="mb-0">
                            Expected Arrival <span>01/12/19</span>
                          </p>
                          <p className="mb-0">
                            USPS{"{"}" "{"}"}
                            <span className="font-weight-bold">
                              234094567242423422898
                            </span>
                          </p>
                        </div>
                      </div>
                      <ul
                        id="progressbar-2"
                        className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2"
                      >
                        <li className="step0 active text-center" id="step1" />
                        <li className="step0 active text-center" id="step2" />
                        <li className="step0 active text-center" id="step3" />
                        <li className="step0 text-muted text-end" id="step4" />
                      </ul>
                      <div className="d-flex justify-content-between">
                        <div className="d-lg-flex align-items-center">
                          <i className="fas fa-clipboard-list fa-3x me-lg-4 mb-3 mb-lg-0" />
                          <div>
                            <p className="fw-bold mb-1">Order</p>
                            <p className="fw-bold mb-0">Processed</p>
                          </div>
                        </div>
                        <div className="d-lg-flex align-items-center">
                          {/* <i className="fas fa-box-open fa-3x me-lg-4 mb-3 mb-lg-0" /> */}
                          <div>
                            <p className="fw-bold mb-1">Order</p>
                            <p className="fw-bold mb-0">Shipped</p>
                          </div>
                        </div>
                        <div className="d-lg-flex align-items-center">
                          {/* <i className="fas fa-shipping-fast fa-3x me-lg-4 mb-3 mb-lg-0" /> */}
                          <FontAwesomeIcon
                            icon={faTruckFast}
                            fade
                            size="2xl"
                            style={{ color: "#263d9c" }}
                          />
                          <div>
                            <p className="fw-bold mb-1">Order</p>
                            <p className="fw-bold mb-0">En Route</p>
                          </div>
                        </div>
                        <div className="d-lg-flex align-items-center">
                          <i className="fas fa-home fa-3x me-lg-4 mb-3 mb-lg-0" />
                          <div>
                            <p className="fw-bold mb-1">Order</p>
                            <p className="fw-bold mb-0">Arrived</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default OrderItemDetails;
