import React from "react";
import ContentCarousel from "./ContentCarousel";
import '../styles/RecommendationCourse.css';

function RecommendationCourse() {
  const sections = [
    { title: '사용자 맞춤', items: Array.from({ length: 10 }, (_, i) => ({ title: `컨텐츠 ${i + 1}` })) },
  ];

  return React.createElement('div', null,
    sections.map((section, index) =>
      React.createElement(ContentCarousel, { key: index, title: section.title, items: section.items })
    )
  );
}
  
  export default RecommendationCourse;