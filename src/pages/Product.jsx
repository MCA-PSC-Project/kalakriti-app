import ImageCarousel from "../components/ImageCarousel";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faStar,
  faTruckFast,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Rating from "../components/Rating";
import Review from "../components/Review";
import { useEffect, useState } from "react";
import "./Product.css";
import api from "../utils/api";

const imgSrcList = [
  "https://source.unsplash.com/random/1600×900/?handloom",
  "https://source.unsplash.com/random/1024×768/?lightlamp",
  "https://source.unsplash.com/random/300*300/?painting",
];

function Product({
  productId,
  productName,
  originalPrice,
  offerPrice,
  overallRating,
  total_review_count,
  fiveStar,
  fourStar,
  threeStar,
  twoStar,
  oneStar,
  userName,
  rating,
}) {
  const [product, setProduct] = useState({});
  const [selectedProductItem, setSelectedProductItem] = useState(null);
  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    api
      .get(`/products/${productId}`)
      .then((response) => {
        setProduct(response.data === null ? [] : response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setSelectedProductItem(
      product?.product_items?.find((item) => {
        item.id === product?.base_product_item_id;
        return item;
      })
    );
    setQuantity(product?.min_order_quantity);
  }, [product]);

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
      {/* content */}
      <section className="py-5">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-6">
              <ImageCarousel imgSrcList={imgSrcList} />
              <div className="d-flex justify-content-center mb-3"></div>
              {/* thumbs-wrap.// */}
              {/* gallery-wrap .end// */}
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">{product?.product_name}</h4>
                <div className="d-flex flex-row my-3">
                  <div className="text-warning mb-1 me-2">
                    <span className="ms-1">
                      {parseFloat(product?.average_rating).toFixed(1)}
                      <FontAwesomeIcon
                        icon={faStar}
                        size="xl"
                        style={{ color: "#ffff00" }}
                      />
                    </span>
                    |<span>&nbsp;{product?.rating_count} Ratings</span>
                  </div>
                  {/* <span className="text-muted">
                    <i className="fas fa-shopping-basket fa-sm mx-1" />
                    154 orders
                  </span> */}
                  {/* <span className="text-success ms-2">In stock</span> */}
                </div>
                <div className="text-success mb-1">In stock</div>
                <div className="mb-3">
                  <span>
                    <del>
                      &#8377;
                      {selectedProductItem?.original_price}
                    </del>
                  </span>
                  &nbsp;
                  <span>
                    <b>
                      &#8377;
                      {selectedProductItem?.offer_price}
                    </b>
                  </span>
                </div>
                <p>{product?.product_description}</p>
                <div className="row">
                  <dt className="col-3">Type:</dt>
                  <dd className="col-9">Regular</dd>
                  <dt className="col-3">Color</dt>
                  <dd className="col-9">Brown</dd>
                  <dt className="col-3">Material</dt>
                  <dd className="col-9">Cotton, Jeans</dd>
                  <dt className="col-3">Brand</dt>
                  <dd className="col-9">Reebook</dd>
                </div>
                <hr />
                <div className="row mb-4">
                  <div className="col-md-4 col-6">
                    <label className="mb-2">Size</label>
                    <select
                      className="form-select border border-secondary"
                      style={{ height: 35 }}
                    >
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                  {/* col.// */}
                  <div className="col-md-4 col-6 mb-3">
                    <label className="mb-2 d-block">Quantity</label>
                    <div className="input-group mb-3" style={{ width: 170 }}>
                      <button
                        className="btn btn-white border border-secondary px-3"
                        type="button"
                        id="button-decrement-quantity"
                        data-mdb-ripple-color="dark"
                        onClick={(event) =>
                          quantity > product.min_order_quantity
                            ? setQuantity(quantity - 1)
                            : null
                        }
                      >
                        <FontAwesomeIcon
                          icon={faMinus}
                          size="lg"
                          style={{ color: "#000000" }}
                        />
                      </button>
                      <input
                        type="text"
                        className="form-control text-center border border-secondary"
                        placeholder={quantity}
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                      />
                      <button
                        className="btn btn-white border border-secondary px-3"
                        type="button-increment-quantity"
                        id="button-addon2"
                        data-mdb-ripple-color="dark"
                        onClick={(event) =>
                          quantity < product.max_order_quantity
                            ? setQuantity(quantity + 1)
                            : null
                        }
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          size="lg"
                          style={{ color: "#000000" }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <a href="#" className="btn btn-success shadow-0 me-2">
                  Buy now
                </a>
                <a href="#" className="btn btn-warning shadow-0 me-2">
                  Add to cart
                </a>
                <a
                  href="#"
                  className="btn btn-light border border-secondary py-2 icon-hover px-3"
                >
                  Add to Wishlist
                </a>
              </div>
            </main>
          </div>
        </div>
      </section>
      {/* content */}
      <section className="bg-light border-top py-4">
        <div className="container">
          <div className="row gx-4">
            <div className="col-lg-8 mb-4">
              <div className="border rounded-2 px-3 py-2 bg-white">
                {/* Pills navs */}
                <ul
                  className="nav nav-pills nav-justified mb-3"
                  id="ex1"
                  role="tablist"
                >
                  <li className="nav-item d-flex" role="presentation">
                    <a
                      className="nav-link d-flex align-items-center justify-content-center w-100 active"
                      id="ex1-tab-1"
                      data-mdb-toggle="pill"
                      href="#ex1-pills-1"
                      role="tab"
                      aria-controls="ex1-pills-1"
                      aria-selected="true"
                    >
                      Description
                    </a>
                  </li>
                  <li className="nav-item d-flex" role="presentation">
                    <a
                      className="nav-link d-flex align-items-center justify-content-center w-100"
                      id="ex1-tab-2"
                      data-mdb-toggle="pill"
                      href="#ex1-pills-2"
                      role="tab"
                      aria-controls="ex1-pills-2"
                      aria-selected="false"
                    >
                      Warranty info
                    </a>
                  </li>
                  <li className="nav-item d-flex" role="presentation">
                    <a
                      className="nav-link d-flex align-items-center justify-content-center w-100"
                      id="ex1-tab-3"
                      data-mdb-toggle="pill"
                      href="#ex1-pills-3"
                      role="tab"
                      aria-controls="ex1-pills-3"
                      aria-selected="false"
                    >
                      Shipping info
                    </a>
                  </li>
                  <li className="nav-item d-flex" role="presentation">
                    <a
                      className="nav-link d-flex align-items-center justify-content-center w-100"
                      id="ex1-tab-4"
                      data-mdb-toggle="pill"
                      href="#ex1-pills-4"
                      role="tab"
                      aria-controls="ex1-pills-4"
                      aria-selected="false"
                    >
                      Seller profile
                    </a>
                  </li>
                </ul>
                {/* Pills navs */}
                {/* Pills content */}
                <div className="tab-content" id="ex1-content">
                  <div
                    className="tab-pane fade show active"
                    id="ex1-pills-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1"
                  >
                    <p>
                      With supporting text below as a natural lead-in to
                      additional content. Lorem ipsum dolor sit amet,
                      consectetur adipisicing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure
                      dolor in reprehenderit in voluptate velit esse cillum
                      dolore eu fugiat nulla pariatur.
                    </p>
                    <div className="row mb-2">
                      <div className="col-12 col-md-6">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <i className="fas fa-check text-success me-2" />
                            Some great feature name here
                          </li>
                          <li>
                            <i className="fas fa-check text-success me-2" />
                            Lorem ipsum dolor sit amet, consectetur
                          </li>
                          <li>
                            <i className="fas fa-check text-success me-2" />
                            Duis aute irure dolor in reprehenderit
                          </li>
                          <li>
                            <i className="fas fa-check text-success me-2" />
                            Optical heart sensor
                          </li>
                        </ul>
                      </div>
                      <div className="col-12 col-md-6 mb-0">
                        <ul className="list-unstyled">
                          <li>
                            <i className="fas fa-check text-success me-2" />
                            Easy fast and ver good
                          </li>
                          <li>
                            <i className="fas fa-check text-success me-2" />
                            Some great feature name here
                          </li>
                          <li>
                            <i className="fas fa-check text-success me-2" />
                            Modern style and design
                          </li>
                        </ul>
                      </div>
                    </div>
                    <table className="table border mt-3 mb-2">
                      <tbody>
                        <tr>
                          <th className="py-2">Display:</th>
                          <td className="py-2">
                            13.3-inch LED-backlit display with IPS
                          </td>
                        </tr>
                        <tr>
                          <th className="py-2">Processor capacity:</th>
                          <td className="py-2">
                            2.3GHz dual-core Intel Core i5
                          </td>
                        </tr>
                        <tr>
                          <th className="py-2">Camera quality:</th>
                          <td className="py-2">720p FaceTime HD camera</td>
                        </tr>
                        <tr>
                          <th className="py-2">Memory</th>
                          <td className="py-2">8 GB RAM or 16 GB RAM</td>
                        </tr>
                        <tr>
                          <th className="py-2">Graphics</th>
                          <td className="py-2">Intel Iris Plus Graphics 640</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="tab-pane fade mb-2"
                    id="ex1-pills-2"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-2"
                  >
                    Tab content or sample information now <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                    amet, consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo
                  </div>
                  <div
                    className="tab-pane fade mb-2"
                    id="ex1-pills-3"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-3"
                  >
                    Another tab content or sample information now <br />
                    Dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore
                    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit anim
                    id est laborum.
                  </div>
                  <div
                    className="tab-pane fade mb-2"
                    id="ex1-pills-4"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-4"
                  >
                    Some other tab content or sample information now <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </div>
                </div>
                {/* Pills content */}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="px-0 border rounded-2 shadow-0">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Similar items</h5>
                    <div className="d-flex mb-3">
                      <a href="#" className="me-3">
                        <img
                          src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp"
                          style={{ minWidth: 96, height: 96 }}
                          className="img-md img-thumbnail"
                        />
                      </a>
                      <div className="info">
                        <a href="#" className="nav-link mb-1">
                          Rucksack Backpack Large <br />
                          Line Mounts
                        </a>
                        <strong className="text-dark"> $38.90</strong>
                      </div>
                    </div>
                    <div className="d-flex mb-3">
                      <a href="#" className="me-3">
                        <img
                          src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp"
                          style={{ minWidth: 96, height: 96 }}
                          className="img-md img-thumbnail"
                        />
                      </a>
                      <div className="info">
                        <a href="#" className="nav-link mb-1">
                          Summer New Men's Denim <br />
                          Jeans Shorts
                        </a>
                        <strong className="text-dark"> $29.50</strong>
                      </div>
                    </div>
                    <div className="d-flex mb-3">
                      <a href="#" className="me-3">
                        <img
                          src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp"
                          style={{ minWidth: 96, height: 96 }}
                          className="img-md img-thumbnail"
                        />
                      </a>
                      <div className="info">
                        <a href="#" className="nav-link mb-1">
                          {" "}
                          T-shirts with multiple colors, for men and lady{" "}
                        </a>
                        <strong className="text-dark"> $120.00</strong>
                      </div>
                    </div>
                    <div className="d-flex">
                      <a href="#" className="me-3">
                        <img
                          src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp"
                          style={{ minWidth: 96, height: 96 }}
                          className="img-md img-thumbnail"
                        />
                      </a>
                      <div className="info">
                        <a href="#" className="nav-link mb-1">
                          {" "}
                          Blazer Suit Dress Jacket for Men, Blue color{" "}
                        </a>
                        <strong className="text-dark"> $339.90</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="text-center text-lg-start text-muted bg-primary mt-3">
        {/* Section: Links  */}
        <section className="">
          <div className="container text-center text-md-start pt-4 pb-4">
            {/* Grid row */}
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-12 col-lg-3 col-sm-12 mb-2">
                {/* Content */}
                <a
                  href="https://mdbootstrap.com/"
                  target="_top"
                  className="text-white h2"
                >
                  MDB
                </a>
                <p className="mt-1 text-white">
                  © 2023 Copyright: MDBootstrap.com
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-6 col-sm-4 col-lg-2">
                {/* Links */}
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Store
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white-50" href="#">
                      About us
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Find store
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Categories
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Blogs
                    </a>
                  </li>
                </ul>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-6 col-sm-4 col-lg-2">
                {/* Links */}
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Information
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white-50" href="#">
                      Help center
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Money refund
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Shipping info
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Refunds
                    </a>
                  </li>
                </ul>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-6 col-sm-4 col-lg-2">
                {/* Links */}
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Support
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white-50" href="#">
                      Help center
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Documents
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Account restore
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      My orders
                    </a>
                  </li>
                </ul>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-12 col-sm-12 col-lg-3">
                {/* Links */}
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Newsletter
                </h6>
                <p className="text-white">
                  Stay in touch with latest updates about our products and
                  offers
                </p>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control border"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="btn btn-light border shadow-0"
                    type="button"
                    id="button-addon2"
                    data-mdb-ripple-color="dark"
                  >
                    Join
                  </button>
                </div>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links  */}
        <div className="">
          <div className="container">
            <div className="d-flex justify-content-between py-4 border-top">
              {/*- payment -*/}
              <div>
                <i className="fab fa-lg fa-cc-visa text-white" />
                <i className="fab fa-lg fa-cc-amex text-white" />
                <i className="fab fa-lg fa-cc-mastercard text-white" />
                <i className="fab fa-lg fa-cc-paypal text-white" />
              </div>
              {/*- payment -*/}
              {/*- language selector -*/}
              <div className="dropdown dropup">
                <a
                  className="dropdown-toggle text-white"
                  href="#"
                  id="Dropdown"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  {" "}
                  <i className="flag-united-kingdom flag m-0 me-1" />
                  English{" "}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="Dropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-united-kingdom flag" />
                      English <i className="fa fa-check text-success ms-2" />
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-poland flag" />
                      Polski
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-china flag" />
                      中文
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-japan flag" />
                      日本語
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-germany flag" />
                      Deutsch
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-france flag" />
                      Français
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-spain flag" />
                      Español
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-russia flag" />
                      Русский
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="flag-portugal flag" />
                      Português
                    </a>
                  </li>
                </ul>
              </div>
              {/*- language selector -*/}
            </div>
          </div>
        </div>
      </footer>
      {/* Footer */}
    </>
  );
}

export default Product;
