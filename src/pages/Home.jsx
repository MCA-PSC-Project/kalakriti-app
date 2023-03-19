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
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <Carousel imgSrcList={imgSrcList} />
          </div>
        </div>
      </div>
      <Section sectionTitle="Recommended For you"/>
      <Section sectionTitle="New Products"/>
      <Footer year="2022-23" companyName="KalaKriti" />
    </>
  );
}

export default Home;
