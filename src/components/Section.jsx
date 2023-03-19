import Card from "../components/Card";
function Section({ sectionTitle }) {
  return (
    <section>
      <div className="container my-5">
        <header className="mb-4">
          <h3>{sectionTitle}</h3>
        </header>

        <div className="row">
          <Card
            imgSrc="https://source.unsplash.com/random/300×300/?lamp,clay"
            cardTitle="Painting"
            originalPrice={500}
            offerPrice={100}
          />
          <Card
            imgSrc="https://source.unsplash.com/random/300×300/?lamp,clay"
            cardTitle="Painting"
            originalPrice={500}
            offerPrice={100}
          />
          <Card
            imgSrc="https://source.unsplash.com/random/300×300/?lamp,clay"
            cardTitle="Painting"
            originalPrice={500}
            offerPrice={100}
          />
          <Card
            imgSrc="https://source.unsplash.com/random/300×300/?lamp,clay"
            cardTitle="Painting"
            originalPrice={500}
            offerPrice={100}
          />
          <Card
            imgSrc="https://source.unsplash.com/random/300×300/?lamp,clay"
            cardTitle="Painting"
            originalPrice={500}
            offerPrice={100}
          />
        </div>
      </div>
    </section>
  );
}

export default Section;
