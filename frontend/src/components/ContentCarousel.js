import React, { useRef, useEffect } from "react";
import "../styles/ContentCarousel.css";

function ContentCarousel() {
  const containerRefs = useRef([]);

  const sections = [
    { title: "사용자 맞춤", items: Array.from({ length: 10 }, (_, i) => ({ title: `컨텐츠 ${i + 1}` })) },
    { title: "기념일 기념", items: Array.from({ length: 10 }, (_, i) => ({ title: `추천 ${i + 1}` })) },
    { title: "인기 장소", items: Array.from({ length: 10 }, (_, i) => ({ title: `드라마 ${i + 1}` })) },
    { title: "계절별", items: Array.from({ length: 10 }, (_, i) => ({ title: `애니 ${i + 1}` })) },
  ];

  // 스크롤 이동량 설정
  const scrollAmount = 200; // 예시로 한 번에 200px씩 이동

  const scroll = (direction, index) => {
    const container = containerRefs.current[index];
    const itemWidth = container.querySelector(".carousel-item").offsetWidth;
    const totalWidth = itemWidth * sections[index].items.length;

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount; // 왼쪽으로 스크롤

      // 처음에 도달하면 끝으로 돌아가도록 설정
      if (container.scrollLeft < 0) {
        container.scrollLeft = totalWidth - container.clientWidth; // 끝으로 이동
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // 스크롤 함수 (컨텐츠 박스 하나씩 이동)
  const scroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = container.offsetWidth / items.length; // 컨텐츠 박스 하나 크기
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount; // 오른쪽으로 스크롤

      // 끝에 도달하면 처음으로 돌아가도록 설정
      if (container.scrollLeft >= totalWidth - container.clientWidth) {
        container.scrollLeft = 0; // 처음으로 돌아감
      }
    }
  };

  return React.createElement(
    React.Fragment,
    null,
    sections.map((section, index) =>
      React.createElement(
        "section",
        { className: "carousel-section", key: index },
        React.createElement("h2", { className: "carousel-title" }, section.title),
        React.createElement(
          "div",
          { className: "carousel-container" },
          React.createElement(
            "button",
            {
              className: "carousel-button prev",
              onClick: () => scroll("left", index),
            },
            "‹"
          ),
          React.createElement(
            "div",
            {
              className: "carousel-content",
              ref: (el) => (containerRefs.current[index] = el),
            },
            section.items.map((item, itemIndex) =>
              React.createElement(
                "div",
                { className: "carousel-item", key: itemIndex },
                React.createElement("div", { className: "content-number" }, item.title)
              )
            )
          ),
          React.createElement(
            "button",
            {
              className: "carousel-button next",
              onClick: () => scroll("right", index),
            },
            "›"
          )
        )
      )
    )
  );
}

export default ContentCarousel;