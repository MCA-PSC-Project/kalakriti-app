import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faTelegram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faHandHoldingHeart,
} from "@fortawesome/free-solid-svg-icons";
import { appName } from "../App";

function Footer() {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-muted">
            Crafted with
            <FontAwesomeIcon
              icon={faHandHoldingHeart}
              beat
              size="xl"
              style={{ color: "#ff0000" }}
            />
            in Bihar
          </span>
          &nbsp; &nbsp;
          <span className="mb-3 mb-md-0 text-muted">
            © {new Date().getFullYear()} {appName} Inc.
          </span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-muted" href="https://github.com/MCA-PSC-Project">
              <FontAwesomeIcon icon={faGithub} size="xl" />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="https://instagram.com/s_h_e_e_t__l">
              <FontAwesomeIcon icon={faInstagram} size="xl" />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="https://facebook.com">
              <FontAwesomeIcon icon={faFacebook} size="xl" />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="https://twitter.com/pacific_dev">
              <FontAwesomeIcon icon={faTwitter} size="xl" />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="https://whatsapp.com">
              <FontAwesomeIcon icon={faWhatsapp} size="xl" />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="https://web.telegram.org">
              <FontAwesomeIcon icon={faTelegram} size="xl" />
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-muted"
              href="mailto: kalakriti.app.email@gmail.com"
            >
              <FontAwesomeIcon icon={faEnvelope} size="xl" />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
