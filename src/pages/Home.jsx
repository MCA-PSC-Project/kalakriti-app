import BannerCarousel from "../components/BannerCarousel";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Section from "../components/Section";

function Home() {
  return (
    <>
      <NavBar />
      <BannerCarousel />
      <Section
        sectionTitle="Recommended For You"
        linkPath="/recommended-products"
        endpoint="/recommended-products?limit=6"
      />
      <Section
        sectionTitle="Popular Products"
        linkPath="/popular-products"
        endpoint="/popular-products?limit=6"
      />
      <Section
        sectionTitle="New Products"
        linkPath="/new-products"
        endpoint="/new-products?limit=6"
      />
      <Footer />
    </>
  );
}

export default Home;
