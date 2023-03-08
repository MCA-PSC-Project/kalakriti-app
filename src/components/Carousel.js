function Carousel({ imgSrcList }) {
  return (
    <div
  id="carouselExampleAutoplaying"
  className="carousel slide"
  data-bs-ride="carousel"
>
  <div className="carousel-inner">
    <div className="carousel-item active" style={{width:"100%", height: "400px"}}>
      <img src={imgSrcList[0]} className="d-block w-100" alt="..." style={{width:"100%", height: "400px"}} />
    </div>
    <div className="carousel-item" style={{width:"100%", height: "400px"}}>
      <img src={imgSrcList[1]} className="d-block w-100" alt="..." style={{width:"100%", height: "400px"}}/>
    </div>
    <div className="carousel-item" style={{width:"100%", height: "400px"}}>
      <img src={imgSrcList[2]} className="d-block w-100" alt="..."style={{width:"100%", height: "400px"}} />
    </div>
  </div>
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExampleAutoplaying"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExampleAutoplaying"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>

  );
}

export default Carousel;
