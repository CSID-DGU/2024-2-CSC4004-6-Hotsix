import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/ContentCarousel.css";
import axios from "axios";

function ContentCarousel() {
  const userId = sessionStorage.getItem("ID");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sections, setSections] = useState([]);
  const containerRefs = useRef([]);
  const [expandedIndex, setExpandedIndex] = useState({ section: null, item: null });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [userInfo, setUserInfo] = useState({
    activityPreference: false,
    expectedBudgetRange: "0~20만원",
    mbti: "ISFP",
    preferredCourse: "카페,영화,산책",
    transportType: "대중교통",
    userLocation: "서울특별시",
  });

  // 유저 이름 가져오기
  const [userName, setUserName] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);
  //DetailInfo
  const [detailInfo, setDetailInfo] = useState("");
  const [details, setDetails] = useState("정보를 가져오고 있습니다!");

  const wrapText = (text, maxLength = 25) => {
    if (!text) return "";
    const regex = new RegExp(`.{1,${maxLength}}`, "g");
    return text.match(regex).join("\n");
  };

  const handleItemClick = async (sectionIndex, itemIndex) => {
    const clickedItem = sections[sectionIndex]?.items[itemIndex];

    // 확장 상태 초기화
    if (expandedIndex.section === sectionIndex && expandedIndex.item === itemIndex) return;

    // 초기화
    setExpandedIndex({ section: sectionIndex, item: itemIndex });
    setDetailInfo("");
    setDetails("정보를 가져오고 있습니다!");

    if (clickedItem) {
      const newDetailInfo = clickedItem.title || "";
      setDetailInfo(newDetailInfo);
      await getGPTResult(newDetailInfo);
    }
  };

  // 스크롤 함수
  const scroll = (direction, sectionIndex) => {
    const container = containerRefs.current[sectionIndex];
    if (!container) return;

    // 한 번 스크롤할 거리 (carousel-item의 너비)
    const scrollAmount = container.offsetWidth / 2;

    // 좌우 스크롤 처리
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else if (direction === "right") {
      container.scrollLeft += scrollAmount;
    }
  };

  // handleScroll
  const handleScroll = (sectionIndex) => {
    const container = containerRefs.current[sectionIndex];
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft + container.offsetWidth < container.scrollWidth);
  };

  useEffect(() => {
    containerRefs.current.forEach((container, index) => {
      if (container) {
        container.addEventListener("scroll", () => handleScroll(index));
      }
    });

    return () => {
      containerRefs.current.forEach((container) => {
        if (container) {
          container.removeEventListener("scroll", handleScroll);
        }
      });
    };
  }, []);

  const handleCollapse = () => {
    setExpandedIndex({ section: null, item: null });
    setDetailInfo("");
    setDetails("정보를 가져오고 있습니다!");
  };

  const getGPTResult = async (details) => {
    try {
      // JSON 형식으로 데이터를 감싸기
      const payload = { prompt: details };
      console.log('Payload being sent:', { prompt: details });
      const response = await axios.post('/ask', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(response.data); // 응답 데이터 확인
      setDetails(response.data); // GPT 결과 업데이트
    } catch (error) {
      console.error('Failed to fetch GPT result:', error);
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setSections([
        { title: `${userName}님을 위한 코스`, items: [] },
        { title: "실시간 인기 장소", items: [] },
        { title: "액티비티", items: [] },
        { title: "계절에 맞는", items: [] },
      ]);
    } else {
      setSections([
        { title: "여자친구가 좋아하는 코스", items: [] },
        { title: "실시간 인기 장소", items: [] },
        { title: "액티비티", items: [] },
        { title: "계절에 맞는", items: [] },
      ]);
    }
  }, [isLoggedIn, userName, userId]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`/userName/${userId}`)
        .then((response) => {
          setUserName(response.data.userName || "사용자");
        })
        .catch((error) => {
          console.error("Error fetching user name:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    setIsLoggedIn(!!userId);
  }, [userId]);

  // 유저 상세 정보 가져오기
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`/userDetail/${userId}`);
      setUserInfo((prev) => ({
        ...prev,
        ...response.data,
      }));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn, userId]);

  // GPT 응답 가져오기
  const fetchRecommendations = async () => {
    const userInfo1 = {
      ...userInfo,
      requestType: isLoggedIn ? "user_recommendations" : "date_idea",
      isCarousel: "true",
    };

    const userInfo2 = {
      mbti: "ENTP",
      location: "서울특별시",
      budget: "0~30만원",
      preferredCourse: "데이트 명소, 카페",
      activityPreference: "false",
      transportType: "대중교통",
      requestType: "popular_spot",
      isCarousel: "true",
    };

    const userInfo3 = {
      mbti: "ENFP",
      location: "서울특별시 전체",
      budget: "10~30만원",
      preferredCourse: "",
      activityPreference: "선호",
      transportType: "대중교통",
      requestType: "activity_spot",
      isCarousel: "true",
    };

    const userInfo4 = {
      mbti: "ESTJ",
      location: "서울특별시 전체",
      budget: "0~30만원",
      preferredCourse: "디저트 카페,맛집",
      activityPreference: "잘 모르겠음",
      transportType: "대중교통",
      requestType: "season_spot",
      isCarousel: "true",
    };

    try {
      const responses = await Promise.all([
        axios.post("/ask", userInfo1),
        axios.post("/ask", userInfo2),
        axios.post("/ask", userInfo3),
        axios.post("/ask", userInfo4),
      ]);

      const titles = isLoggedIn
        ? [`${userName || '사용자'} 님을 위한 코스`, "실시간 인기 장소", "액티비티", "계절에 맞는"]
        : ["여자친구가 좋아하는 코스", "실시간 인기 장소", "액티비티", "계절에 맞는"];

      const newSections = responses.map((response, index) => ({
        title: titles[index] || `섹션 ${index + 1}`,
        items: response.data.split(",").map((item) => ({ title: item.trim() })),
      }));

      setSections(newSections);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching GPT recommendations:", error);
      setError("추천 데이터를 가져오는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn || !isLoggedIn) {
      fetchRecommendations();
    }
  }, [isLoggedIn, userInfo]);

  // 텍스트에서 URL을 하이퍼링크로 변환하는 함수
  const renderDetails = (details) => {
    return details.split("\n").map((line, index) => {
      // 'url:' 키워드로 시작하는 URL 추출
      const urlPattern = /url:\s*(.+)/i;
      const urlMatch = line.match(urlPattern);

      if (urlMatch) {
        const url = urlMatch[1].trim(); // 'url:' 뒤의 텍스트를 URL로 처리
        return (
          <React.Fragment key={index}>
            <a
            href={url.startsWith("http") ? url : `https://${url}`}
            target="_blank"
            rel="noopener noreferrer"
            >
            {url}
            </a>
            <br />
          </React.Fragment>
        );
      }

      // 일반 텍스트 처리
      return (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      );
    });
  };

  return (
    <React.Fragment>
      {loading && <div className="loading-message">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && sections.map((section, sectionIndex) => (
        <section className="carousel-section" key={sectionIndex}>
          <h2 className="carousel-title">{section.title}</h2>
          <div
            className="carousel-container"
            ref={(el) => {
              containerRefs.current[sectionIndex] = el;
              console.log("Container ref assigned:", { sectionIndex, el });
            }}
          >
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
                  <div className="content-number">
                    {expandedIndex.section !== sectionIndex || expandedIndex.item !== itemIndex
                      ? item.title
                      : null}
                  </div>
                  {expandedIndex.section === sectionIndex && expandedIndex.item === itemIndex && (
                    <div className="expanded-title">
                      <h3>{detailInfo || "해당 코스"}</h3>
                      <div className="expanded-content">
                        {renderDetails(details)}
                      </div>
                      <button className="collapse-button" onClick={handleCollapse}>
                        닫기
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </React.Fragment>
  );
}

export default ContentCarousel;
