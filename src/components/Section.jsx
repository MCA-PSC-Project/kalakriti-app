import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import api from "../utils/api";

function Section({ sectionTitle, linkPath, endpoint }) {
  const [ProductsList, setProductsList] = useState([]);
  useEffect(() => {
    api
      .get(endpoint)
      .then((response) => {
        setProductsList(response.data === null ? [] : response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <section>
      <div className="container my-5">
        <header className="mb-4">
          <h3>
            <Link to={linkPath}>{sectionTitle}</Link>
          </h3>
        </header>

        <div className="row">
          {ProductsList.map((product) => {
            return (
              <Card
                imgSrc={product.base_product_item.media.path}
                cardTitle={product.product_name}
                originalPrice={parseFloat(
                  product.base_product_item.original_price
                )}
                offerPrice={parseFloat(product.base_product_item.offer_price)}
                average_rating={parseFloat(product.average_rating)}
                ratingCount={parseInt(product.rating_count)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Section;
