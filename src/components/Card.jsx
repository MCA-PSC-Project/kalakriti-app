function Card({imgSrc, cardTitle}) {
  return (
    <div className="card">
      <img src={imgSrc} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{cardTitle}</h5>
        <p className="card-text">
          This is a longer card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p>
      </div>
    </div>
  );
}

export default Card;
