import React, { useRef, useState } from "react";
import "../styles/ContentCarousel.css";

function ContentCarousel() {
  const containerRefs = useRef([]); // 섹션별 컨테이너 참조 저장
  const [expandedIndex, setExpandedIndex] = useState({ section: null, item: null }); // 확장 상태 저장

  const sections = [
    { title: "사용자 맞춤", items: Array.from({ length: 10 }, (_, i) => ({ title: `컨텐츠 ${i + 1}` })) },
    { title: "기념일 기념", items: Array.from({ length: 10 }, (_, i) => ({ title: `추천 ${i + 1}` })) },
    { title: "인기 장소", items: Array.from({ length: 10 }, (_, i) => ({ title: `드라마 ${i + 1}` })) },
    { title: "계절별", items: Array.from({ length: 10 }, (_, i) => ({ title: `애니 ${i + 1}` })) },
  ];

  const scrollAmount = 200;

  // 스크롤 핸들러
  const scroll = (direction, index) => {
    const container = containerRefs.current[index];
    const itemWidth = container.querySelector(".carousel-item").offsetWidth;
    const totalWidth = itemWidth * sections[index].items.length;

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
      if (container.scrollLeft < 0) {
        container.scrollLeft = totalWidth - container.clientWidth;
      }
    } else {
      container.scrollLeft += scrollAmount;
      if (container.scrollLeft >= totalWidth - container.clientWidth) {
        container.scrollLeft = 0;
      }
    }
  };

  // 클릭 이벤트: 박스 확장 처리
  /*
  const handleItemClick = (sectionIndex, itemIndex) => {
    const container = containerRefs.current[sectionIndex];
    const itemWidth = container.querySelector(".carousel-item").offsetWidth;
    const containerWidth = container.clientWidth;
  
    // 클릭된 아이템을 항상 왼쪽에 고정된 위치로 스크롤
    const scrollPosition = itemWidth * itemIndex;
  
    // 스크롤 가능한 범위 내에서만 스크롤 수행
    const maxScrollPosition = container.scrollWidth - containerWidth;
    container.scrollTo({
      left: Math.min(scrollPosition, maxScrollPosition),
      behavior: "smooth",
    });
  
    // 클릭된 박스를 확장된 상태로 설정
    setExpandedIndex({ section: sectionIndex, item: itemIndex });
  };
  */
  const handleItemClick = (sectionIndex, itemIndex) => {
    const container = containerRefs.current[sectionIndex];
    const itemWidth = container.querySelector(".carousel-item").offsetWidth;
    const containerWidth = container.clientWidth;
  
    // 클릭된 아이템을 항상 왼쪽에 고정된 위치로 스크롤
    const scrollPosition = Math.max(0, itemWidth * itemIndex);
  
    // 스크롤 가능한 최대 위치를 계산
    const maxScrollPosition = container.scrollWidth - containerWidth;
  
    // 스크롤 가능한 범위를 넘지 않도록 조정
    container.scrollTo({
      left: Math.min(scrollPosition, maxScrollPosition),
      behavior: "smooth",
    });
  
    // 클릭된 박스를 확장된 상태로 설정
    setExpandedIndex({ section: sectionIndex, item: itemIndex });
  };
  
  

  return (
    <>
      {sections.map((section, sectionIndex) => (
        <section className="carousel-section" key={sectionIndex}>
          <h2 className="carousel-title">{section.title}</h2>
          <div className="carousel-container">
            <button
              className="carousel-button prev"
              onClick={() => scroll("left", sectionIndex)}
            >
              ‹
            </button>
            <div
              className="carousel-content"
              ref={(el) => (containerRefs.current[sectionIndex] = el)}
            >
              {section.items.map((item, itemIndex) => (
                <div
                  className={`carousel-item ${
                    expandedIndex.section === sectionIndex &&
                    expandedIndex.item === itemIndex
                      ? "expanded"
                      : ""
                  }`}
                  key={itemIndex}
                  onClick={() => handleItemClick(sectionIndex, itemIndex)}
                >
                  <div className="content-number">{item.title}</div>
                  {expandedIndex.section === sectionIndex &&
                    expandedIndex.item === itemIndex && (
                      <div className="expanded-content">
                        추가된 내용: 여기에 새로운 정보가 표시됩니다.
                      </div>
                    )}
                </div>
              ))}
            </div>
            <button
              className="carousel-button next"
              onClick={() => scroll("right", sectionIndex)}
            >
              ›
            </button>
          </div>
        </section>
      ))}
    </>
  );
}

export default ContentCarousel;
