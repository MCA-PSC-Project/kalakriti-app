function MediaCarousel({ mediaSrcList }) {
  const elements = [];
  for (let index = 0; index < mediaSrcList.length; index++) {
    elements.push(
      <button
        type="button"
        data-bs-target="#myCarouselExampleIndicators"
        data-bs-slide-to={index}
        className={index === 0 ? "active" : ""}
        aria-label={"Slide " + (index + 1)}
        aria-current={index === 0 ? "true" : "false"}
      ></button>
    );
  }
  return (
    <div id="myCarouselExampleIndicators" className="carousel slide">
      <div className="carousel-indicators">{elements}</div>
      <div className="carousel-inner">
        {mediaSrcList.map((image, index) => {
          return (
            <div
              className={index === 0 ? "carousel-item active" : "carousel-item"}
            >
              <img
                src={image}
                className="d-block w-100"
                alt="banner"
                style={{ width: "100%", height: "500px" }}
              />
            </div>
          );
        })}
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

export default MediaCarousel;
