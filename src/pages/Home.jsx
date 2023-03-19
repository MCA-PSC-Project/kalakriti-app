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
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <Carousel imgSrcList={imgSrcList} />
          </div>
        </div>
      </div>

      <br />
      <Section />
      <Footer year="2010-22" companyName="KalaKriti" />
    </>
  );
}

export default Home;
