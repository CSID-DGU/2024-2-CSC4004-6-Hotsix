import React, { useState } from "react";
import '../styles/ContentCarousel.css';


function ContentCarousel({ title, items }) {
  const [startIndex, setStartIndex] = React.useState(0);

  const totalItems = items.length;

  const scroll = (direction) => {
    if (direction === 'left') {
      setStartIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
    } else {
      setStartIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }
  };

  // 현재 보여줄 아이템 계산 (순환)
  const visibleItems = [
    ...items.slice(startIndex),
    ...items.slice(0, startIndex), // 앞쪽으로 슬라이싱된 나머지 추가
  ];

  return (
    React.createElement('section', { className: 'carousel-section' },
      React.createElement('h2', null, title),
      React.createElement('div', { className: 'carousel-container' },
        React.createElement('button', {
          className: 'carousel-button prev',
          onClick: () => scroll('left'),
        }, '‹'),
        React.createElement('div', {
          className: `carousel-content carousel-content-${title}`,
        },
          visibleItems.map((item, index) =>
            React.createElement('div', { className: 'carousel-item', key: index },
              React.createElement('div', { className: 'content-number' }, item.title)
            )
          )
        ),
        React.createElement('button', {
          className: 'carousel-button next',
          onClick: () => scroll('right'),
        }, '›')
      )
    )
  );
}

export default ContentCarousel;
