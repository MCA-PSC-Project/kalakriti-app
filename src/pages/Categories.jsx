import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { axiosClient } from "../utils/axios-client";

function Categories() {
  const [categoriesList, setCategoriesList] = useState([]);
  useEffect(() => {
    axiosClient.get(`/categories`).then((response) => {
      setCategoriesList(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <div>
      <NavBar />
      <h1 style={{ textAlign: "center" }}>Categories</h1>
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
            {/* change ..md-n to display n items in a row */}
            {categoriesList.map((category) => {
              return (
                <Card
                  key={category.id}
                  imgSrc="https://source.unsplash.com/random/300×300/?painting"
                  cardTitle={category.name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ imgSrc, cardTitle }) {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          src={imgSrc}
          className="card-img-top"
          style={{ aspectRatio: "1 / 1" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title" style={{ textAlign: "center" }}>
            {cardTitle}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Categories;
