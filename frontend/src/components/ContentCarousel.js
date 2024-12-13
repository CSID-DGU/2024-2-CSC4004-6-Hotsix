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
  const [isCarousel,setIsCarousel] = useState(true);
  // 에러 및 로딩 상태 추가
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 유저 이름 가져오기
  const [userName, setUserName] = useState('');

  //유저 정보
  const [activityPreference, setActivityPreference] = useState(false);
  const [expectedBudgetRange, setExpectedBudgetRange] = useState('10~20만원');
  const [mbti, setMbti] = useState('ISFP');
  const [preferredCourse, setPreferredCourse] = useState('카페,영화,산책');
  const [transportType, setTransportType] = useState('대중교통');
  const [userLocation, setUserLocation] = useState('서울특별시 중구');


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
    requestType: 'user_recommendations',
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
          { title: "실내 인기 코스", items: [] },
          { title: "액티비티", items: [] },
          { title: "계절에 맞는", items: [] },
        ]
      : [
          { title: "여자친구가 좋아할 데이트", items: [] },
          { title: "실내 인기 코스", items: [] },
          { title: "액티비티", items: [] },
          { title: "계절에 맞는", items: [] },
        ]
  );

  //로그인 상태 변화에 따른 섹션값 변화
  useEffect(() => {
    if (isLoggedIn) {
      setSections([
        { title: `${userName || "사용자"}님에게 추천`, items: [] },
        { title: "실내 인기 코스", items: [] },
        { title: "액티비티", items: [] },
        { title: "계절에 맞는", items: [] },
      ]);
    } else {
      setSections([
        { title: "여자친구가 좋아할 데이트", items: [] },
        { title: "실내 인기 코스", items: [] },
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
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserInfo();
    }
  }, [userId, isLoggedIn]);

  useEffect(() => {

    // //user recommendation
    // const userInfo1 = ({
    //   mbti : mbti,
    //   location: userLocation,
    //   budget: expectedBudgetRange,
    //   preferredCourse,
    //   activityPreference,
    //   transportType,
    //   requestType: 'user_recommendations',
    //   isCarousel: 'true',
    // });
  
    //defalut recommendation1
    const userInfo2 = {
            mbti: 'ISFP',
            location: '서울특별시 중구',
            budget: '10~20만원',
            preferredCourse: '산책',
            activityPreference: '비선호',
            transportType: '대중교통',
            requestType: 'popular_spot',
            isCarousel : 'true'
          };
    //defalut recommendation2
    const userInfo3 = {
      mbti: 'ENFP',
      location: '서울특별시 홍대',
      budget: '20~30만원',
      preferredCourse: '이색카페',
      activityPreference: '선호',
      transportType: '대중교통',
      requestType: 'popular_spot',
      isCarousel : 'true'
      };
    //defalut recommendation3
    const userInfo4 = {
      mbti: 'ESTJ',
      location: '서울특별시 연남',
      budget: '20~30만원',
      preferredCourse: '디저트 카페, 맛집, 핫플레이스',
      activityPreference: '잘 모르겠음',
      transportType: '대중교통',
      requestType: 'popular_spot',
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


  // 스크롤 이동량 설정
  const scrollAmount = 200; // 예시로 한 번에 200px씩 이동

  const scroll = (direction, index) => {
    const container = containerRefs.current[index];
    if (!container) return; // 컨테이너가 없을 경우 대비

    const itemWidth = container.querySelector(".carousel-item")?.offsetWidth || 0;
    const totalWidth =  itemWidth * (sections[index].items.length || 0);

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
      {!loading && !error && (sections).map((section, index) => (
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