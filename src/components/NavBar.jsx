import Select, { components } from "react-select";
import { Link, useNavigate } from "react-router-dom";
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
  faClockRotateLeft,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { appName } from "../App";
import { useEffect, useState } from "react";
// import useAuth from "../hooks/useAuth";
import AuthConsumer from "../hooks/useAuth";
import api from "../utils/api";

function NavBar() {
  const [wishlistIconHovered, setWishlistIconHovered] = useState(false);
  const [cartIconHovered, setCartIconHovered] = useState(false);
  const [profileIconHovered, setProfileIconHovered] = useState(false);
  const [notificationsIconHovered, setNotificationsIconHovered] =
    useState(false);
  const [ordersIconHovered, setOrdersIconHovered] = useState(false);
  const [settingsIconHovered, setSettingsIconHovered] = useState(false);
  const [searchIconHovered, setSearchIconHovered] = useState(false);

  // const { authed, logout } = useAuth();
  const { authed, logout } = AuthConsumer();
  const isLoggedIn = authed ? true : false;
  console.log("isLogedIn=", authed);
  // useEffect(() => {
  //   console.log(authed);
  // }, [authed]);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logging out");
    logout();
    navigate("/");
  };

  const [cartItemsQuantity, setCartItemsQuantity] = useState(0);
  useEffect(() => {
    if (isLoggedIn) {
      api
        .get(`/carts/items-quantity`)
        .then((response) => {
          setCartItemsQuantity(response.data === null ? 0 : response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setCartItemsQuantity(0);
    }
  }, []);

  const [topSearchesList, setTopSearchesList] = useState([]);
  const [hasFetchedTopSearchesList, setHasFetchedTopSearchesList] =
    useState(false);
  const [showSearchList, setShowSearchList] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

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
            {/* search */}
            <form className="d-flex" role="search">
              {/* <input
                  className="form-control me-2"
                  type="search"
                  id="search"
                  list="searchListOptions"
                  placeholder="Search"
                  aria-label="Search"
                  onClick={() => {
                    api
                      .get(`/top-searches`)
                      .then((response) => {
                        if (response.status === 200) {
                          console.log(response.data);
                          setTopSearchesList(
                            response.data === null ? {} : response.data
                          );
                          setShowSearchList(true);
                        }
                      })
                      .catch((err) => {
                        console.error(err);
                      });
                  }}
                /> */}

              {/* {showSearchList && topSearchesList && (
                  <datalist id="searchListOptions">
                    {topSearchesList &&
                      topSearchesList.length > 0 &&
                      topSearchesList.map((item) => {
                        return <option value={item}></option>;
                      })}
                  </datalist>
                )} */}

              <Select
                className="me-2"
                placeholder="Search"
                options={topSearchesList.map((item) => ({
                  value: item,
                  label: item,
                }))}
                formatOptionLabel={({ value, label }) => (
                  <div>
                    <FontAwesomeIcon
                      icon={faArrowTrendUp}
                      size="sm"
                      style={{ color: "#56dd31" }}
                    />
                    {label}
                  </div>
                )}
                components={{
                  DropdownIndicator: () => null,
                  SingleValue: (props) => (
                    <components.SingleValue {...props}>
                      {props.data.label}
                    </components.SingleValue>
                  ),
                }}
                isSearchable={true}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: 200,
                  }),
                }}
                onMenuOpen={() => {
                  if (!hasFetchedTopSearchesList) {
                    api
                      .get(`/top-searches`)
                      .then((response) => {
                        if (response.status === 200) {
                          console.log(response.data);
                          setTopSearchesList(
                            response.data === null ? {} : response.data
                          );
                          setShowSearchList(true);
                          console.log("setHasFetchedTopSearchesList(true)");
                          setHasFetchedTopSearchesList(true);
                        }
                      })
                      .catch((err) => {
                        console.error(err);
                      });
                  }
                }}
                // for user input
                onInputChange={(value) => {
                  if (value) {
                    // console.log("onInputChange", value);
                    setSearchValue(value);
                  }
                }}
                // for dropdown selection
                onChange={(option) => {
                  // console.log("onChange", option.value);
                  setSearchValue(option.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    console.log("search term= ", searchValue);
                    navigate("/search-results", {
                      state: { searchValue: searchValue },
                    });
                  }
                }}
              />

              <button
                className="btn border px-2"
                type="submit"
                title="search"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("button click search term= ", searchValue);
                  navigate("/search-results", {
                    state: { searchValue: searchValue },
                  });
                }}
              >
                {/* Search */}
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="xl"
                  style={{ color: "#5485c4" }}
                  onMouseEnter={() => setSearchIconHovered(true)}
                  onMouseLeave={() => setSearchIconHovered(false)}
                  fade={searchIconHovered ? "fade" : undefined}
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
                      size="xl"
                      style={{ color: "#f0e03c" }}
                      onMouseEnter={() => setNotificationsIconHovered(true)}
                      onMouseLeave={() => setNotificationsIconHovered(false)}
                      shake={notificationsIconHovered ? "shake" : undefined}
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
                      size="xl"
                      style={{ color: "#ff0000" }}
                      onMouseEnter={() => setWishlistIconHovered(true)}
                      onMouseLeave={() => setWishlistIconHovered(false)}
                      beatFade={wishlistIconHovered ? "beatfade" : undefined}
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
                      size="xl"
                      style={{ color: "#006eff" }}
                      onMouseEnter={() => setCartIconHovered(true)}
                      onMouseLeave={() => setCartIconHovered(false)}
                      shake={cartIconHovered ? "shake" : undefined}
                    />
                    <span className="badge bg-dark text-white ms-1 rounded-pill">
                      {cartItemsQuantity}
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
                      size="xl"
                      style={{ color: "#0feb1e" }}
                      onMouseEnter={() => setOrdersIconHovered(true)}
                      onMouseLeave={() => setOrdersIconHovered(false)}
                      fade={ordersIconHovered ? "fade" : undefined}
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
                      size="xl"
                      style={{ color: "#646464" }}
                      onMouseEnter={() => setSettingsIconHovered(true)}
                      onMouseLeave={() => setSettingsIconHovered(false)}
                      spin={settingsIconHovered ? "spin" : undefined}
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
                      size="xl"
                      style={{ color: "#964B00" }}
                      onMouseEnter={() => setProfileIconHovered(true)}
                      onMouseLeave={() => setProfileIconHovered(false)}
                      bounce={profileIconHovered ? "bounce" : undefined}
                    />
                    Hello, <b>Username</b>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/viewed-products">
                        <FontAwesomeIcon
                          icon={faClockRotateLeft}
                          style={{ color: "#a45f41" }}
                        />
                        &nbsp; Viewed Products
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
                      <Link className="dropdown-item" to="/">
                        Become a Seller / Login as Seller
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/"
                        onClick={() => handleLogout()}
                      >
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
