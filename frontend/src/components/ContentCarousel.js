// src/components/ContentCarousel.js
import React, { useRef, useEffect, useState } from "react";
import "../styles/ContentCarousel.css";
import axios from 'axios';

function ContentCarousel() {
  const containerRefs = useRef([]);

  // sections 상태 관리
  const [sections, setSections] = useState([
    { title: "사용자 맞춤", items: [] },
    { title: "여자친구가 좋아할 데이트", items: [] },
    { title: "인기 장소", items: [] },
    { title: "계절별", items: Array.from({ length: 10 }, (_, i) => ({ title: `애니 ${i + 1}` })) },
  ]);

  // 에러 및 로딩 상태 추가
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGptResponse = async () => {
      // 실제 사용자 데이터로 대체하세요
      const userInfo1 = {
        mbti: 'ISFP',
        location: '서울특별시 중구',
        budget: '10~20만원',
        requiredCourse: '카페, 영화',
        preferredCourse: '산책',
        activityPreference: '비선호',
        transportType: '대중교통',
        requestType: 'user_recommendations'
      };

      const userInfo2 = {
        mbti: 'ISFP',
        location: '서울특별시 중구',
        budget: '10~20만원',
        requiredCourse: '카페, 영화',
        preferredCourse: '산책',
        activityPreference: '비선호',
        transportType: '대중교통',
        requestType: 'date_ideas'
      };

      const userInfo3 = {
              mbti: 'ISFP',
              location: '서울특별시 중구',
              budget: '10~20만원',
              requiredCourse: '카페, 영화',
              preferredCourse: '산책',
              activityPreference: '비선호',
              transportType: '대중교통',
              requestType: 'popular_spot'
            };

      try {
        const response = await axios.post('http://localhost:8080/ask', userInfo1);
        console.log('GPT 응답 원본:', response.data); // 디버깅용

        // 응답 데이터 구조 확인
        let responseText = '';
        if (typeof response.data === 'object' && response.data.text) {
          responseText = response.data.text;
        } else if (typeof response.data === 'string') {
          responseText = response.data;
        } else {
          console.error("응답 데이터 형식이 예상과 다릅니다:", response.data);
          setError("응답 데이터 형식이 올바르지 않습니다.");
          setLoading(false);
          return;
        }

        console.log('GPT 응답 텍스트:', responseText); // 디버깅용

       // GPT 응답 파싱 (콤마로 분리)
       //const contentItems = responseText.split(',').filter(item => item.trim() !== '').map(item => item.trim());
       //console.log('파싱된 GPT 응답:', contentItems); // 디버깅용
       // GPT 응답 파싱 (콤마로 분리 및 대괄호 제거)
       const contentItems = responseText
         .split(/\s*,\s*/) // 콤마와 그 주변의 공백을 기준으로 분리
         .filter(item => item !== '') // 빈 문자열 제거
         .map(item => item.replace(/^\[|\]$/g, '').trim()); // 대괄호 제거 및 공백 정리

       console.log('파싱된 GPT 응답:', contentItems); // 디버깅용

        // sections 상태 업데이트
        setSections(prevSections => {
          const newSections = [...prevSections];
          newSections[0] = {
            ...newSections[0],
            items: contentItems.map(item => ({ title: item })),
          };
          return newSections;
        });

        const response2 = await axios.post('http://localhost:8080/ask', userInfo2);
        console.log('GPT 응답 원본:', response2.data); // 디버깅용

        // 응답 데이터 구조 확인
        let responseText2 = '';
        if (typeof response2.data === 'object' && response2.data.text) {
            responseText2 = response2.data.text;
        } else if (typeof response2.data === 'string') {
            responseText2 = response2.data;
        } else {
            console.error("응답 데이터 형식이 예상과 다릅니다:", response2.data);
            setError("응답 데이터 형식이 올바르지 않습니다.");
            setLoading(false);
            return;
        }

        console.log('GPT 응답 텍스트:', responseText2); // 디버깅용

        // GPT 응답 파싱 (콤마로 분리)
        //const contentItems = responseText.split(',').filter(item => item.trim() !== '').map(item => item.trim());
        //console.log('파싱된 GPT 응답:', contentItems); // 디버깅용
        // GPT 응답 파싱 (콤마로 분리 및 대괄호 제거)
        const contentItems2 = responseText2
            .split(/\s*,\s*/) // 콤마와 그 주변의 공백을 기준으로 분리
            .filter(item => item !== '') // 빈 문자열 제거
            .map(item => item.replace(/^\[|\]$/g, '').trim()); // 대괄호 제거 및 공백 정리

        console.log('파싱된 GPT 응답:', contentItems2); // 디버깅용

        // sections 상태 업데이트
        setSections(prevSections => {
            const newSections2 = [...prevSections];
            newSections2[1] = {
            ...newSections2[1],
            items: contentItems2.map(item => ({ title: item })),
        };
        return newSections2;
        });

        const response3 = await axios.post('http://localhost:8080/ask', userInfo3);
                console.log('GPT 응답 원본:', response3.data); // 디버깅용

                // 응답 데이터 구조 확인
                let responseText3 = '';
                if (typeof response3.data === 'object' && response3.data.text) {
                    responseText3 = response3.data.text;
                } else if (typeof response3.data === 'string') {
                    responseText3 = response3.data;
                } else {
                    console.error("응답 데이터 형식이 예상과 다릅니다:", response3.data);
                    setError("응답 데이터 형식이 올바르지 않습니다.");
                    setLoading(false);
                    return;
                }

                console.log('GPT 응답 텍스트:', responseText3); // 디버깅용

                // GPT 응답 파싱 (콤마로 분리)
                //const contentItems = responseText.split(',').filter(item => item.trim() !== '').map(item => item.trim());
                //console.log('파싱된 GPT 응답:', contentItems); // 디버깅용
                // GPT 응답 파싱 (콤마로 분리 및 대괄호 제거)
                const contentItems3 = responseText3
                    .split(/\s*,\s*/) // 콤마와 그 주변의 공백을 기준으로 분리
                    .filter(item => item !== '') // 빈 문자열 제거
                    .map(item => item.replace(/^\[|\]$/g, '').trim()); // 대괄호 제거 및 공백 정리

                console.log('파싱된 GPT 응답:', contentItems3); // 디버깅용

                // sections 상태 업데이트
                setSections(prevSections => {
                    const newSections3 = [...prevSections];
                    newSections3[2] = {
                    ...newSections3[2],
                    items: contentItems3.map(item => ({ title: item })),
                };
                return newSections3;
                });
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error("GPT 응답 가져오는 중 오류 발생:", error);
        if (error.response) {
          // 서버가 응답했지만 상태 코드가 2xx가 아닌 경우
          setError(`서버 오류: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
          // 요청이 이루어졌으나 응답을 받지 못한 경우
          setError("서버로부터 응답을 받지 못했습니다.");
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생한 경우
          setError("요청 설정 중 오류가 발생했습니다.");
        }
        setLoading(false);
      }
    };

    fetchGptResponse();
  }, []);

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

  return (
    <React.Fragment>
      {loading && <div className="loading-message">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && sections.map((section, index) => (
        <section className="carousel-section" key={index}>
          <h2 className="carousel-title">{section.title}</h2>
          <div className="carousel-container">
            <button
              className="carousel-button prev"
              onClick={() => scroll("left", index)}
            >
              ‹
            </button>
            <div
              className="carousel-content"
              ref={(el) => (containerRefs.current[index] = el)}
            >
              {section.items.map((item, itemIndex) => (
                <div className="carousel-item" key={itemIndex}>
                  <div className="content-number">{item.title}</div>
                </div>
              ))}
            </div>
            <button
              className="carousel-button next"
              onClick={() => scroll("right", index)}
            >
              ›
            </button>
          </div>
        </section>
      ))}
    </React.Fragment>
  );
}

export default ContentCarousel;
