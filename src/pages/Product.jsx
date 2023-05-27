import ImageCarousel from "../components/ImageCarousel";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTruckFast } from "@fortawesome/free-solid-svg-icons";

const imgSrcList = [
  "https://source.unsplash.com/random/300×300/?handloom",
  "https://source.unsplash.com/random/300×300/?lightlamp",
  "https://source.unsplash.com/random/300×300/?painting",
];

function Product({ productName, originalPrice, offerPrice }) {
  return (
    <>
      <NavBar />
      <div
        style={{
          marginTop: 50,
          marginLeft: 300,
          marginBottom: 10,
          marginRight: 300,
        }}
      >
        <ImageCarousel imgSrcList={imgSrcList} />
      </div>
      <div
        style={{
          marginTop: 50,
          marginLeft: 300,
          marginBottom: 100,
          marginRight: 300,
        }}
      >
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
          <h4>In Stock 
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
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
        <h4>Color :: &nbsp;&nbsp;
        <button type="button" class="btn btn-outline-dark">Golden</button> &nbsp;
        <button type="button" class="btn btn-outline-dark">Brown</button> &nbsp;
        <button type="button" class="btn btn-outline-dark">Black</button> &nbsp;
         </h4>

         <h4>Material :: &nbsp;&nbsp;
         <button type="button" class="btn btn-outline-dark">Canvas</button> &nbsp;
        <button type="button" class="btn btn-outline-dark">Paper</button> &nbsp;
        <button type="button" class="btn btn-outline-dark">Silk</button> &nbsp;
         
         </h4>
      </div>
      <Footer />
    </>
  );
}

export default Product;
