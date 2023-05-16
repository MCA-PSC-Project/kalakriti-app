function ImageCarousel({ imgSrcList }){
    return(
      <div id="myCarouselExampleIndicators" className="carousel slide" >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#myCarouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-label="Slide 1"
          aria-current="true"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
          className=""
        ></button>
        <button
          type="button"
          data-bs-target="#myCarouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
          className=""
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={imgSrcList[0]}
            className="d-block w-100"
            alt="..."
            style={{ width: "100%", height: "400px" }}
          />
        </div>
        <div className="carousel-item active">
          <img
            src={imgSrcList[1]}
            className="d-block w-100"
            alt="..."
            style={{ width: "100%", height: "400px" }}
          />
        </div>
        <div className="carousel-item">
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
        data-bs-target="#myCarouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#myCarouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default ImageCarousel;