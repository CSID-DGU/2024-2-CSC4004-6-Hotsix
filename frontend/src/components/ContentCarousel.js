import  { useState } from "react";
// import '../styles/ContentCarousel.css';
import React from 'react';
import '../styles/ContentCarousel.css';

function ContentCarousel({ title, items = [] }) {
  // 스크롤 함수
  const scroll = (direction, container) => {
    const scrollAmount = 200; // 한 번에 스크롤할 픽셀 값
  
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
      if (container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollWidth; // 끝에 도달하면 다시 끝으로 이동
      }
    } else {
      container.scrollLeft += scrollAmount;
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0; // 끝에 도달하면 다시 처음으로 이동
      }
    }
  };
  
  // 렌더링
  return (
    React.createElement('section', { className: 'carousel-section' },
      React.createElement('h2', null, title),
      React.createElement('div', { className: 'carousel-container' },
        React.createElement('button', {
          className: 'carousel-button prev',
          onClick: (e) => {
            const container = e.target.closest('.carousel-container').querySelector('.carousel-content');
            scroll('left', container);
          }
        }, '‹'),
        React.createElement('div', { className: `carousel-content carousel-content-${title}` },
            Array.isArray(items) ? items.map((item, index) =>
            React.createElement('div', { className: 'carousel-item', key: index },
              React.createElement('div', { className: 'content-number' }, item.title)
            )
          ) : React.createElement('p', null, 'No items to display')   //아이템이 없는 경우
        ),
        React.createElement('button', {
          className: 'carousel-button next',
          onClick: (e) => {
            const container = e.target.closest('.carousel-container').querySelector('.carousel-content');
            scroll('right', container);
          }
        }, '›')
      )
    )
  );
  }

export default ContentCarousel;
