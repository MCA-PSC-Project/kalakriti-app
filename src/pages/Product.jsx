import ImageCarousel from "../components/ImageCarousel";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import Rating from "../components/Rating";
import { useState } from "react";

const imgSrcList = [
  "https://source.unsplash.com/random/300×300/?handloom",
  "https://source.unsplash.com/random/300×300/?lightlamp",
  "https://source.unsplash.com/random/300×300/?painting",
];

function Product({ productName, originalPrice, offerPrice }) {
  const [reviewActive, setReviewActive] = useState(false);
  const [descriptionActive, setDescriptionActive] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isShown1, setIsShown1] = useState(false);
  const handleDescription = () => {
    setDescriptionActive(!descriptionActive);
    setReviewActive(false);
    setIsShown1(false);
    setIsShown((current) => !current);
  };
  const handleReview = () => {
    setReviewActive(!reviewActive);
    setDescriptionActive(false);
    setIsShown(false);
    setIsShown1((current) => !current);
  };
  return (
    <>
      <NavBar />
      <div
        class="container"
        style={{
          marginTop: 50,
          marginLeft: 250,
          marginBottom: 10,
        }}
      >
        <div class="row">
          <div class="col-4" style={{ marginRight: 40 }}>
            <ImageCarousel imgSrcList={imgSrcList} />
          </div>

          <div class="col-6">
            <h2>{productName}</h2>
            <p>
              <span>&#8377;</span>
              <del>{originalPrice}</del>&nbsp;
              <span>&#8377;</span>
              {offerPrice}
            </p>
            <p>
              <FontAwesomeIcon
                icon={faTruckFast}
                bounce
                size="lg"
                style={{ color: "#f85a16" }}
              />
              <b>Dispatch soon</b>
            </p>
            <div>
              <h4>
                In Stock{" "}
                <FontAwesomeIcon
                  icon={faLayerGroup}
                  flip
                  style={{ color: "#e86888" }}
                />
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ marginTop: 15 }}
                  >
                    Quantity:
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#">
                        1
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        2
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        3
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        4
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        5
                      </a>
                    </li>
                  </ul>
                </div>
              </h4>
            </div>
            &nbsp;
            <h4>
              Color:: &nbsp;&nbsp;
              <button type="button" class="btn btn-outline-dark">
                Golden
              </button>{" "}
              &nbsp;
              <button type="button" class="btn btn-outline-dark">
                Brown
              </button>{" "}
              &nbsp;
              <button type="button" class="btn btn-outline-dark">
                Black
              </button>{" "}
              &nbsp;
            </h4>
            <h4>
              Material :: &nbsp;&nbsp;
              <button type="button" class="btn btn-outline-dark">
                Canvas
              </button>{" "}
              &nbsp;
              <button type="button" class="btn btn-outline-dark">
                Paper
              </button>{" "}
              &nbsp;
              <button type="button" class="btn btn-outline-dark">
                Silk
              </button>{" "}
              &nbsp;
            </h4>
          </div>
        </div>
        <div class="col-6 col-sm-3" style={{ marginTop: 80 }}>
          <button
            type="button"
            class="btn btn-outline-primary "
            onClick={handleDescription}
            style={{
              backgroundColor: descriptionActive ? "black" : "LightGreen",
              borderRadius: "12px",
              fontSize: "20px",
            }}
          >
            <b>
              <i>Description</i>
            </b>
          </button>
          &nbsp;
          <button
            type="button"
            class="btn btn-outline-primary "
            onClick={handleReview}
            style={{
              backgroundColor: reviewActive ? "black" : "LightGreen",
              borderRadius: "12px",
              fontSize: "20px",
            }}
          >
            <b>
              <i>Review</i>
            </b>
          </button>
          {isShown && (
            <div>
              <h2>Some content here</h2>
            </div>
          )}
          {isShown1 && (
            <div>
              <h2>Some review here</h2>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Product;
