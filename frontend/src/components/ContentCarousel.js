import React, { useRef, useEffect } from "react";
import "../styles/ContentCarousel.css";

function ContentCarousel({ title, items = [] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // 초기 위치 설정: 첫 번째 컨텐츠가 보이도록
    container.scrollLeft = 0;

    // 스크롤 위치 조정 핸들러
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;

      if (scrollLeft >= scrollWidth - clientWidth) {
        container.scrollLeft = 0; // 끝에 도달하면 처음으로 이동
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
      container.scrollLeft += scrollAmount;
    }
  };

  return React.createElement(
    "section",
    { className: "carousel-section" },
    React.createElement("h2", { className: "carousel-title" }, title), // 사용자 맞춤 타이틀 추가
    React.createElement(
      "div",
      { className: "carousel-container" },
      // 이전 버튼
      React.createElement(
        "button",
        {
          className: "carousel-button prev",
          onClick: () => scroll("left"),
        },
        "‹"
      ),
      // 컨텐츠 영역
      React.createElement(
        "div",
        { className: "carousel-content", ref: containerRef },
        items.map((item, index) =>
          React.createElement(
            "div",
            { className: "carousel-item", key: index },
            React.createElement("div", { className: "content-number" }, item.title)
          )
        )
      ),
      // 다음 버튼
      React.createElement(
        "button",
        {
          className: "carousel-button next",
          onClick: () => scroll("right"),
        },
        "›"
      )
    )
  );
}

export default ContentCarousel;