import React, { useRef, useEffect, useState } from "react";
import "../styles/ContentCarousel.css";

function ContentCarousel() {
  const containerRefs = useRef([]);
  const [gptResponse, setGptResponse] = useState([]);


  useEffect(() => {
      const fetchGptResponse = async () => {
        // 실제 사용자 데이터로 대체하세요
        const userInfo = {
          mbti: 'ISFP',
          location: '서울특별시 중구 퇴계로',
          budget: '10~20만원',
          requiredCourse: '카페, 영화',
          preferredCourse: '산책',
          activityPreference: '비선호',
          transportType: '대중교통',
        };

        try {
          const response = await axios.post('http://localhost:8080/ask', userInfo);
          const responseText = response.data; // 응답 데이터 확인
          console.log('GPT 응답 원본:', responseText); // 디버깅용

          // GPT 응답 파싱
          const contentItems = responseText.split(/[\[\]]/).filter(item => item.trim() !== '' && item.trim() !== ',').map(item => item.trim());
          console.log('파싱된 GPT 응답:', contentItems); // 디버깅용

          setGptResponse(contentItems);

           // GPT 응답을 사용하여 sections 상태 업데이트
           setSections(prevSections => {
            const newSections = [...prevSections];
            newSections[0] = {
               ...newSections[0],
               items: contentItems.map(item => ({ title: item })),
               };
               return newSections;
            });
            } catch (error) {
                console.error("GPT 응답 가져오는 중 오류 발생:", error);
              }
            };

      fetchGptResponse();
  }, []);

  const [sections, setSections] = useState([
    { title: "사용자 맞춤", items: [] },
    { title: "기념일 기념", items: Array.from({ length: 10 }, (_, i) => ({ title: `추천 ${i + 1}` })) },
    { title: "인기 장소", items: Array.from({ length: 10 }, (_, i) => ({ title: `드라마 ${i + 1}` })) },
    { title: "계절별", items: Array.from({ length: 10 }, (_, i) => ({ title: `애니 ${i + 1}` })) },
  ]);

//  // GPT 응답을 '사용자 맞춤' 섹션의 items로 설정
//  if (gptResponse.length > 0) {
//    sections[0].items = gptResponse.map((item) => ({ title: item }));
//  }
  // 스크롤 이동량 설정
  const scrollAmount = 200; // 예시로 한 번에 200px씩 이동

  const scroll = (direction, index) => {
    const container = containerRefs.current[index];
    if (!container) return; // 컨테이너가 없을 경우 대비

     const itemWidth = container.querySelector(".carousel-item")?.offsetWidth || 0;
     const totalWidth = itemWidth * (sections[index].items.length || 0);

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount; // 왼쪽으로 스크롤

      // 처음에 도달하면 끝으로 돌아가도록 설정
      if (container.scrollLeft < 0) {
        container.scrollLeft = totalWidth - container.clientWidth; // 끝으로 이동
      }
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