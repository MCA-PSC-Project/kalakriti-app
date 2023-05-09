import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpeg";
import CartSvg from "../assets/cart.svg";
import WishlistSvg from "../assets/Heart.svg";
import ProfileSvg from "../assets/person-circle.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faUser,
  faGear,
  faMagnifyingGlass,
  faBell,
  faHouse,
  faListCheck,
  faRightFromBracket,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { appName } from "../App";

function NavBar({ isLoggedIn = false }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <img src={Logo} alt="KalaKriti" style={{ width: 50, height: 50 }} />
        <b>{appName}</b>
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
            <li className="nav-item me-2">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/"
                title="Home"
              >
                {/* Home */}
                <FontAwesomeIcon
                  icon={faHouse}
                  size="xl"
                  style={{ color: "#dd13a7" }}
                />
              </Link>
            </li>
    
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/categories"
                title="Categories"
              >
                Categories
              </Link>
            </li>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn border px-2" type="submit" title="search">
                {/* Search */}
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  fade
                  size="xl"
                  style={{ color: "#5485c4" }}
                />
              </button>
            </form>
          </ul>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/notifications" title="notifications">
                  <button type="button" className="btn border px-2 me-2">
                    {/* <img src={WishlistSvg} alt="Wishlist" /> */}
                    <FontAwesomeIcon
                      icon={faBell}
                      shake
                      size="xl"
                      style={{ color: "#f0e03c" }}
                    />
                  </button>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/wishlist" title="wishlist">
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
                <Link to="/cart" title="cart">
                  <button type="button" className="btn border px-2 me-2">
                    {/* <img src={CartSvg} alt="Cart" /> */}
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      shake
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
                <Link to="/orders" title="My orders">
                  <button type="button" className="btn border px-2 me-2">
                    {/* My Orders */}
                    <FontAwesomeIcon
                      icon={faListCheck}
                      fade
                      size="xl"
                      style={{ color: "#0feb1e" }}
                    />
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/settings" title="settings">
                  <button type="button" className="btn border px-2 me-2">
                    {/* <img src={ProfileSvg} alt="Profile" />
                    Profile */}
                    <FontAwesomeIcon
                      icon={faGear}
                      spin
                      size="xl"
                      style={{ color: "#646464" }}
                    />
                  </button>
                </Link>
              </li>
              {isLoggedIn ? (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/profile"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    title="profile"
                  >
                    {/* <img src={ProfileSvg} alt="Profile" />
                    Profile */}
                    <FontAwesomeIcon
                      icon={faUser}
                      bounce
                      size="xl"
                      style={{ color: "#964B00" }}
                    />
                    Hello, <b>Username</b>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/">
                        Become a Seller / Login as Seller
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/">
                        <FontAwesomeIcon
                          icon={faHeadset}
                          style={{ color: "#d84f22" }}
                        />
                        &nbsp; Customer Support
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/">
                        <FontAwesomeIcon
                          icon={faRightFromBracket}
                          style={{ color: "#4dbad5" }}
                        />
                        &nbsp; Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" title="login">
                      <button type="button" className="btn btn-primary me-2">
                        Login
                      </button>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/register" title="login">
                      <button type="button" className="btn btn-success me-2">
                        Register
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
