import React, { useState, useEffect } from "react";
import "../CSS/Carousel.css"; // Import your CSS file

const Carousel = ({ items }) => {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(items.length);

  useEffect(() => {
    setLength(items.length);
  }, [items]);

  const next = () => {
    setIndex((index + 1) % length);
  };

  const prev = () => {
    setIndex((index - 1 + length) % length);
  };

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {items.map((item, i) => {
          return (
            <div
              className={`carousel-item glassmorphism ${i === index ? "active" : ""}`}
              key={i}
            >
              <img src={item.image} alt={item.title} />
              <div className="carousel-caption">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button className="carousel-control-prev" onClick={prev}>
        Prev
      </button>
      <button className="carousel-control-next" onClick={next}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
