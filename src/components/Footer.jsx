import { Link } from "react-router-dom";

function Footer({ year, companyName }) {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link
            to="/login"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          >
            <svg className="bi" width={30} height={24}>
              <use xlinkHref="#bootstrap" />
            </svg>
          </Link>
          <span className="mb-3 mb-md-0 text-muted">
            © {year} {companyName} Inc
          </span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <Link className="text-muted" to="/login">
              <svg className="bi" width={24} height={24}>
                <use xlinkHref="#twitter" />
              </svg>
            </Link>
          </li>
          <li className="ms-3">
            <Link className="text-muted" to="/login">
              <svg className="bi" width={24} height={24}>
                <use xlinkHref="#instagram" />
              </svg>
            </Link>
          </li>
          <li className="ms-3">
            <Link className="text-muted" to="/login">
              <svg className="bi" width={24} height={24}>
                <use xlinkHref="#facebook" />
              </svg>
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
