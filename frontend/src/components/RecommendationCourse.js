import React from 'react';
import ContentCarousel from "./ContentCarousel.js";
import '../styles/RecommendationCourse.css';

function RecommendationCourse() {
    const sections = [
      { title: "사용자 맞춤", items: Array.from({ length: 10 }, (_, i) => ({ title: `컨텐츠 ${i + 1}` })) },
    ];
  
    return (
      <div>
        {sections.map((section, index) => (
          <ContentCarousel key={index} title={section.title} items={section.items} />
        ))}
      </div>
    );
  }
  
  export default RecommendationCourse;