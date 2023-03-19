import Card from "../components/Card";
function Section() {
  return (
    <section>
      <div className="container my-5">
        <header className="mb-4">
          <h3>New products</h3>
        </header>
        <Card
          imgSrc="https://source.unsplash.com/random/300×300/?lamp,clay"
          cardTitle="Painting"
          originalPrice={500}
          offerPrice={100}
        />
      </div>
    </section>
  );
}

export default Section;
