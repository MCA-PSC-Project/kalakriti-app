import Card from "../components/Card";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const imgSrcList = [
  "https://source.unsplash.com/random/300×300/?car",
  "https://source.unsplash.com/random/300×300/?mobile",
  "https://source.unsplash.com/random/300×300/?sketch",
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

      <div class="container text-center">
        <div class="row">
          <div class="col">
            <Card
              imgSrc="https://source.unsplash.com/random/300×300/?lamp,clay"
              cardTitle="Painting"
            />
          </div>
          <div class="col">
            <Card
              imgSrc="https://source.unsplash.com/random/300×300/?lamp,clay"
              cardTitle="madhubani painting"
            />
          </div>
          <div class="col">
            <Card
              imgSrc="https://source.unsplash.com/random/300×300/?lamp,clay"
              cardTitle="diya"
            />
          </div>
        </div>

        <br />

        <div class="row">
          <div class="col">
            <Card imgSrc="https://source.unsplash.com/random/300×300/?lamp,clay" />
          </div>
          <div class="col">
            <Card imgSrc="https://source.unsplash.com/random/300×300/?lamp,clay" />
          </div>
          <div class="col">
            <Card imgSrc="https://source.unsplash.com/random/300×300/?lamp,clay" />
          </div>
        </div>
      </div>

      <Footer year="2010-22" companyName="KalaKriti" />
    </>
  );
}

export default Home;
