import BannerCarousel from "../components/Carousel";
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
        endpoint="/recommended-products"
      />
      <Section
        sectionTitle="Popular Products"
        linkPath="/popular-products"
        endpoint="/popular-products"
      />
      <Section
        sectionTitle="New Products"
        linkPath="/new-products"
        endpoint="/new-products"
      />
      <Footer />
    </>
  );
}

export default Home;
