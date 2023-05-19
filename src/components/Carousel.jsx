import { useEffect, useState } from "react";
import { axiosClient } from "../utils/axios-client";

function BannerCarousel() {
  const [bannersList, setBannersList] = useState([]);
  useEffect(() => {
    axiosClient
      .get(`/banners`)
      .then((response) => {
        setBannersList(response.data === null ? [] : response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const elements = [];

  for (let index = 0; index <= bannersList.length; index++) {
    elements.push(
      <button
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide-to={index}
        className={index === 0 ? "active" : ""}
        aria-label={"Slide " + (index + 1)}
        aria-current={index === 0 ? "true" : "false"}
      ></button>
    );
  }
  return (
    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">{elements}</div>
      <div className="carousel-inner">
        {bannersList.map((banner, index) => {
          return (
            <div
              className={index === 0 ? "carousel-item active" : "carousel-item"}
            >
              <img
                src={banner.media.path}
                className="d-block w-100"
                alt="banner"
                style={{ width: "100%", height: "400px" }}
              />
              {/* <div className="container">
            <div className="carousel-caption text-start">
              <h1>Example headline.</h1>
              <p>
                Some representative placeholder content for the first slide of
                the carousel.
              </p>
              <p>
                <a className="btn btn-lg btn-primary" href="#">
                  Sign up today
                </a>
              </p>
            </div>
          </div> */}
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default BannerCarousel;
