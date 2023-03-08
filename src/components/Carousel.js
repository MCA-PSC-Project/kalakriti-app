function Carousel({ imgSrcList }) {
  return (
    <div
      id="carouselExampleIndicatorsAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicatorsAutoplaying"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicatorsAutoplaying"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicatorsAutoplaying"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div
          className="carousel-item active"
          data-bs-interval="2000"
          style={{ width: "100%", height: "400px" }}
        >
          <img
            src={imgSrcList[0]}
            className="d-block w-100"
            alt="..."
            style={{ width: "100%", height: "400px" }}
          />
        </div>
        <div
          className="carousel-item"
          data-bs-interval="2000"
          style={{ width: "100%", height: "400px" }}
        >
          <img
            src={imgSrcList[1]}
            className="d-block w-100"
            alt="..."
            style={{ width: "100%", height: "400px" }}
          />
        </div>
        <div
          className="carousel-item"
          data-bs-interval="2000"
          style={{ width: "100%", height: "400px" }}
        >
          <img
            src={imgSrcList[2]}
            className="d-block w-100"
            alt="..."
            style={{ width: "100%", height: "400px" }}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicatorsAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicatorsAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
