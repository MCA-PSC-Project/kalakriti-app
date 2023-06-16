import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import api from "../utils/api";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Categories() {
  const [categoriesList, setCategoriesList] = useState([]);
  useEffect(() => {
    api
      .get(`/categories`)
      .then((response) => {
        setCategoriesList(response.data === null ? [] : response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
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
            {categoriesList && categoriesList.length > 0 ? (
              categoriesList.map((category) => {
                return (
                  <CategoryCard
                    key={category.id}
                    imgSrc={category.cover.path}
                    cardTitle={category.name}
                    subCategories={category.subcategories}
                  />
                );
              })
            ) : (
              <h1>No categories</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ imgSrc, cardTitle, subCategories }) {
  let navigate = useNavigate();
  // const routeChange = () => {
  //   let path = `/subcategories`;
  //   navigate(path);
  // };

  return (
    <div className="col">
      <div
        className="card shadow-sm"
        onClick={() => {
          if (subCategories !== undefined) {
            console.log("subcategories exists");
            // <SubCategories subCategoriesList={subCategories} />;
            // <Link to="/subcategories" state={{ subCategories }} />;
            // routeChange();
            navigate("/subcategories", {
              state: { subCategoriesList: subCategories },
            });
          } else {
            console.log("subcategories does not exists");
          }
        }}
      >
        <img
          src={imgSrc}
          className="card-img-top"
          style={{ aspectRatio: "1 / 1" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title" style={{ textAlign: "center" }}>
            <Link
              to={() => {
                subCategories === undefined ? "" : "/subcategories";
              }}
              className="stretched-link"
            >
              {cardTitle}
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}

export function SubCategories() {
  const { state } = useLocation();
  const { subCategoriesList } = state; // Read values passed on state
  return (
    <div>
      <NavBar />
      <h1 style={{ textAlign: "center" }}>Subcategories</h1>
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
            {/* change ..md-n to display n items in a row */}
            {subCategoriesList && subCategoriesList.length > 0 ? (
              subCategoriesList.map((subCategory) => {
                return (
                  <SubCategoryCard
                    key={subCategory.id}
                    imgSrc={subCategory.cover.path}
                    cardTitle={subCategory.name}
                  />
                );
              })
            ) : (
              <h1>No subcategories</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SubCategoryCard({ imgSrc, cardTitle }) {
  return (
    <div className="col">
      <div
        className="card shadow-sm"
        onClick={() => {
          console.log("clicked");
        }}
      >
        <img
          src={imgSrc}
          className="card-img-top"
          style={{ aspectRatio: "1 / 1" }}
          alt="image"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title" style={{ textAlign: "center" }}>
            <Link to="" className="stretched-link">
              {cardTitle}
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}
export default Categories;
