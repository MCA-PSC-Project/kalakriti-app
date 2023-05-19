import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Section from "../components/Section";

const imgSrcList = [
  "https://source.unsplash.com/random/300×300/?handloom",
  "https://source.unsplash.com/random/300×300/?lightlamp",
  "https://source.unsplash.com/random/300×300/?painting",
];

function Home() {
  return (
    <>
      <NavBar />
      <Carousel imgSrcList={imgSrcList} />
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
