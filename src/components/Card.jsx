import WishlistSvg from "../assets/Heart.svg";

function Card({ imgSrc, cardTitle, originalPrice, offerPrice }) {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
      <div className="card w-100 my-2 shadow-2-strong">
        <img
          src={imgSrc}
          className="card-img-top"
          style={{ aspectRatio: "1 / 1" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{cardTitle}</h5>
          <p className="card-text">
            <span>&#8377;</span>
            <del>{originalPrice}</del>&nbsp;
            <span>&#8377;</span>
            {offerPrice}
          </p>
          <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
            <a href="#!" className="btn btn-primary shadow-0 me-1">
              Add to cart
            </a>
            <a
              href="#!"
              // className="btn btn-light border px-2 pt-2 icon-hover"
              className="btn btn-outline-danger border px-2 pt-2 icon-hover"
            >
              {/* <i className="fas fa-heart fa-lg text-secondary px-1" /> */}

              <img src={WishlistSvg} alt="Wishlist" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
