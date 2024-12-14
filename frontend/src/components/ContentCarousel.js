// src/components/ContentCarousel.js
import React, {  useMemo,useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/ContentCarousel.css";
import axios from 'axios';

function ContentCarousel() {
  //변수
  const userId = sessionStorage.getItem("ID");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); 
  const date = new Date();
  const nowDate = date.toLocaleDateString();
  const location = useLocation();
  const containerRefs = useRef([]);
  const [expandedIndex, setExpandedIndex] = useState({ section: null, item: null });
  const [isCarousel,setIsCarousel] = useState(true);
  // 에러 및 로딩 상태 추가
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 유저 이름 가져오기
  const [userName, setUserName] = useState('');

  //유저 정보
  const [activityPreference, setActivityPreference] = useState(false);
  const [expectedBudgetRange, setExpectedBudgetRange] = useState('0~20만원');
  const [mbti, setMbti] = useState('ISFP');
  const [preferredCourse, setPreferredCourse] = useState('카페,영화,산책');
  const [transportType, setTransportType] = useState('대중교통');
  const [userLocation, setUserLocation] = useState('서울특별시');


  const handleItemClick = (sectionIndex, itemIndex) => {
    const container = containerRefs.current[sectionIndex];
  
    if (!container) {
      console.error(`No container found for sectionIndex: ${sectionIndex}`);
      return;
    }
  
    const items = container.querySelectorAll(".carousel-item");
    const item = items[itemIndex];
  
    if (!item) {
      console.error(`No .carousel-item found for itemIndex: ${itemIndex}`);
      return;
    }
  
    // 클릭된 항목이 이미 확장된 상태인지 확인
    if (
      expandedIndex.section === sectionIndex &&
      expandedIndex.item === itemIndex
    ) {
      setExpandedIndex({ section: null, item: null }); // 초기화
    } else {
      setExpandedIndex({ section: sectionIndex, item: itemIndex });
  
      // 아이템이 content를 넘지 않도록 위치 조정
      const contentWidth = container.offsetWidth;
      const itemLeft = item.offsetLeft;
      const itemRight = itemLeft + item.offsetWidth;
  
      if (itemLeft < 0) {
        // 아이템이 왼쪽으로 나간 경우
        container.scrollBy({ left: itemLeft, behavior: "smooth" });
      } else if (itemRight > contentWidth) {
        // 아이템이 오른쪽으로 나간 경우
        const scrollOffset = itemRight - contentWidth;
        container.scrollBy({ left: scrollOffset, behavior: "smooth" });
      }
    }
  };
  
  const scrollAmount = 200;

  const scroll = (direction, sectionIndex) => {
    const container = containerRefs.current[sectionIndex];
    if (!container) {
      console.error(`No container found for sectionIndex: ${sectionIndex}`);
      return;
    }
  
    const itemWidth =
      container.querySelector(".carousel-item")?.offsetWidth || 0;
    console.log(`Item width: ${itemWidth}`);
  
    const totalWidth = itemWidth * (sections[sectionIndex]?.items.length || 0);
    console.log(`Total width: ${totalWidth}, Container width: ${container.offsetWidth}`);
  
    if (direction === "left") {
      container.scrollBy({ left: -itemWidth, behavior: "smooth" });
    } else {
      container.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
  
    console.log(`Scroll position after scroll: ${container.scrollLeft}`);
  };

  
  


  //updateSectionItems
  const updateSectionItems = (index, contentItems) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      if (newSections[index]) {
        newSections[index].items = contentItems.map(item => ({ title: item }));
      }
      return newSections;
    });
  };
  
  // 초기 객체
  let userInfo1 = {
    mbti: 'isfp',
    userLocation: userLocation,
    expectedBudgetRange: expectedBudgetRange,
    preferredCourse,
    activityPreference,
    transportType,
    requestType: 'date_idea',
    isCarousel: 'true',
  };
  // Setter 함수 정의
  function setUserInfo(key, value) {
    if (key in userInfo1) {
      userInfo1[key] = value; // 기존 키 업데이트
    } else {
      console.warn(`${key} is not a valid property`);
    }
  }

  
  //유저 이름 가져오기
  useEffect(() => {
    if (userId) {
      axios
        .get(`/userName/${userId}`)
        .then((response) => {
          setUserName(response.data.userName);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  //로그인 상태 업데이트
  useEffect(() => {
    setIsLoggedIn(!!userId);
  }, [userId]);

  //섹션 변수
  const [sections, setSections] = useState(
    isLoggedIn
      ? [
          { title: `${userName}님에게 추천`, items: [] },
          { title: "실시간 인기 코스", items: [] },
          { title: "액티비티", items: [] },
          { title: "계절에 맞는", items: [] },
        ]
      : [
          { title: "여자친구가 좋아할 데이트", items: [] },
          { title: "실시간 인기 코스", items: [] },
          { title: "액티비티", items: [] },
          { title: "계절에 맞는", items: [] },
        ]
  );

  //로그인 상태 변화에 따른 섹션값 변화
  useEffect(() => {
    if (isLoggedIn) {
      setSections([
        { title: `${userName || "사용자"}님에게 추천`, items: [] },
        { title: "실시간 인기 코스", items: [] },
        { title: "액티비티", items: [] },
        { title: "계절에 맞는", items: [] },
      ]);
    } else {
      setSections([
        { title: "여자친구가 좋아할 데이트", items: [] },
        { title: "실시간 인기 코스", items: [] },
        { title: "액티비티", items: [] },
        { title: "계절에 맞는", items: [] },
      ]);
    }
  }, [isLoggedIn, userName]);

  //로그인 상태 시 유저 정보 유저 변수에 저장
  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(`/userDetail/${userId}`);
          const data = response.data;
  
          setActivityPreference(data.activityPreference);
          setExpectedBudgetRange(data.expectedBudgetRange);
          setMbti(data.mbti);
          setPreferredCourse(data.preferredCourse);
          setTransportType(data.transportType);
          setUserLocation(data.userLocation);
  
          setUserInfo('activityPreference', data.activityPreference);
          setUserInfo('expectedBudgetRange', data.expectedBudgetRange);
          setUserInfo('mbti', data.mbti);
          setUserInfo('preferredCourse', data.preferredCourse);
          setUserInfo('userLocation', data.userLocation);
          setUserInfo('transportType', data.transportType);
          setUserInfo('requestType','user_recommendations');
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserInfo();
    }
  }, [userId, isLoggedIn]);

  useEffect(() => {
  
    //실내 인기 코스
    const userInfo2 = {
            mbti: 'ENTP',
            location: '서울특별시',
            budget: '0~30만원',
            preferredCourse: '데이트 명소, 카페',
            activityPreference: 'false',
            transportType: '대중교통',
            requestType: 'popular_spot',
            isCarousel : 'true'
          };
    //액티비티
    const userInfo3 = {
      mbti: 'ENFP',
      location: '서울특별시 전체',
      budget: '10~30만원',
      preferredCourse: '',
      activityPreference: '선호',
      transportType: '대중교통',
      requestType: 'activity_spot',
      isCarousel : 'true'
      };
    //계절에 맞는
    const userInfo4 = {
      mbti: 'ESTJ',
      location: '서울특별시 전체',
      budget: '0~30만원',
      preferredCourse: '디저트 카페,맛집',
      activityPreference: '잘 모르겠음',
      transportType: '대중교통',
      requestType: 'season_spot',
      isCarousel : 'true',
      LocalDate : nowDate
      };
      const fetchGptResponse = async (userInfo1, userInfo2, userInfo3, userInfo4) => {
        try {
          const responses = await Promise.all([
            axios.post('/ask', userInfo1),
            axios.post('/ask', userInfo2),
            axios.post('/ask', userInfo3),
            axios.post('/ask', userInfo4),
          ]);
      
          responses.forEach((response, index) => {
            const responseText = typeof response.data === 'object' && response.data.text
              ? response.data.text
              : response.data;
      
            const contentItems = responseText
              .split(/\s*,\s*/)
              .filter(item => item !== '')
              .map(item => item.trim());
      
            updateSectionItems(index, contentItems);
          });
      
          setLoading(false);
        } catch (error) {
          console.error("GPT 응답 가져오는 중 오류 발생:", error);
          setError(error.message || "알 수 없는 오류");
          setLoading(false);
        }
      };
      
    fetchGptResponse(userInfo1, userInfo2, userInfo3,userInfo4);
}, [isLoggedIn, mbti, userLocation, expectedBudgetRange, preferredCourse, activityPreference, transportType]);



  return (
    <React.Fragment>
      {loading && <div className="loading-message">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && sections.map((section,sectionIndex) => (
          <section className="carousel-section" key={sectionIndex}>
          <h2 className="carousel-title">{section.title}</h2>
          <div
            className="carousel-container"
            ref={(el) => (containerRefs.current[sectionIndex] = el)}
          >
            <button
              className="carousel-button prev"
              onClick={() => scroll("left", sectionIndex)}
            >
              ‹
            </button>
            <div className="carousel-content">
              {section.items.map((item, itemIndex) => (
                <div
                  className={`carousel-item ${
                    expandedIndex.section === sectionIndex && expandedIndex.item === itemIndex
                      ? "expanded"
                      : ""
                  }`}
                  key={itemIndex}
                  onClick={() => handleItemClick(sectionIndex, itemIndex)}
                >
                  <div className="content-number">{item.title}</div>
                  {
                  expandedIndex.section === sectionIndex && expandedIndex.item === itemIndex ? 
                  (
                    <div className="expanded-content">
                      <p>추가된 내용: 여기에 새로운 정보가 표시됩니다.</p>
                    </div>
                  ) : null}
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
    </React.Fragment>
  );
}

export default ContentCarousel;