import { Link } from "react-router-dom";
import CartSvg from "../assets/cart.svg";
import WishlistSvg from "../assets/Heart.svg";
import ProfileSvg from "../assets/person-circle.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          KalaKriti
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/categories"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Another action
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
          </ul>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/wishlist">
                  <button type="button" className="btn border px-2 me-2">
                    {/* <img src={WishlistSvg} alt="Wishlist" /> */}
                    <FontAwesomeIcon
                      icon={faHeart}
                      beatFade
                      size="xl"
                      style={{ color: "#ff0000" }}
                    />
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart">
                  <button type="button" className="btn border px-2 me-2">
                    {/* <img src={CartSvg} alt="Cart" /> */}
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      size="xl"
                      style={{ color: "#006eff" }}
                    />
                    <span className="badge bg-dark text-white ms-1 rounded-pill">
                      2
                    </span>
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/orders">
                  <button
                    type="button"
                    className="btn btn-outline-success me-2"
                  >
                    My Orders
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="">
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-2"
                  >
                    <img src={ProfileSvg} alt="Profile" />
                    Profile
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
