import Card from "./components/Card";
import Carousel from "./components/Carousel";
import NavBar from "./components/NavBar";

const imgSrcList = [
  "https://source.unsplash.com/random/300×300/?lamp,clay",
  "https://source.unsplash.com/random/300×300/?embroidery",
  "https://source.unsplash.com/random/300×300/?sketch",
];

function App() {
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

      <div class="container text-center">
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
    </>
  );
}

export default App;
