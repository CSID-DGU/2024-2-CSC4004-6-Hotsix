import React, { useState } from "react";
import '../styles/ContentCarousel.css';


function ContentCarousel({ title, items }) {
  const [startIndex, setStartIndex] = useState(0);

  const totalItems = items.length;
  const scroll = (direction) => {
    if (direction === "left") {
      setStartIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
    } else {
      setStartIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }
  };

  const visibleItems = [
    ...items.slice(startIndex),
    ...items.slice(0, startIndex),
  ];

  return (
    <section className="carousel-section">
      <h2>{title}</h2>
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={() => scroll("left")}>‹</button>
        <div className={`carousel-content carousel-content-${title}`}>
          {visibleItems.map((item, index) => (
            <div className="carousel-item" key={index}>
              <div className="content-number">{item.title}</div>
            </div>
          ))}
        </div>
        <button className="carousel-button next" onClick={() => scroll("right")}>›</button>
      </div>
    </section>
  );
}

export default ContentCarousel;
