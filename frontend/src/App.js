// src/App.js
import React, { useState } from 'react';
import Header from './components/Header.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import SurveyForm from './components/SurveyForm.js';
import MyPage from './components/MyPage.js';
import Community from './components/Community.js';
import RecommendationCourse from './components/RecommendationCourse.js';
import ContentCarousel from './components/ContentCarousel.js';
import ChatWindow from './components/ChatWindow.js';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [page, setPage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [user, setUser] = useState({ name: '' }); // 사용자 정보 관리

  // sections 상태 관리
  const [sections, setSections] = useState([
    { title: "사용자 맞춤", items: [] }, // 초기에는 비어있음
    { title: "기념일 기념", items: Array.from({ length: 10 }, (_, i) => ({ title: `광화문 ${i + 1}` })) },
    { title: "인기 장소", items: Array.from({ length: 10 }, (_, i) => ({ title: `드라마 ${i + 1}` })) },
    { title: "계절별", items: Array.from({ length: 10 }, (_, i) => ({ title: `애니 ${i + 1}` })) },
  ]);

  // 페이지 이동 함수 정의
  const toggleHome = () => setPage(null);
  const toggleLogin = () => setPage('login');
  const toggleSignup = () => setPage('signup');
  const toggleMyPage = () => setPage('mypage');
  const toggleCommunity = () => setPage('community'); // 커뮤니티 페이지 핸들러
  const toggleRecommendationCourse = () => setPage('recommendation-course'); // 추천 코스 페이지 핸들러
  const toggleSurvey = () => setPage('survey'); // 설문조사 페이지 핸들러

  // GPT 응답을 받아 사용자 맞춤 섹션 업데이트
  const handleGptResponse = (courses) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[0] = {
        ...updatedSections[0],
        items: courses.map((course) => ({ title: course })),
      };
      return updatedSections;
    });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/community' element={<Community />} />
          <Route path='/recommendation-course' element={<RecommendationCourse />} />
          <Route path='/survey' element={<SurveyForm />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/' element={
            <>
              <ContentCarousel sections={sections} setSections={setSections} /> {/* sections와 setSections 전달 */}
              <ChatWindow onGptResponse={handleGptResponse} /> {/* GPT 응답 핸들러 전달 */}
            </>
          } />
        </Routes>
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          user={user}
          onLoginClick={toggleLogin}
          onHomeClick={toggleHome}
          onCommunityClick={toggleCommunity}
          onRecommendationCourseClick={toggleRecommendationCourse}
          onSurveyClick={toggleSurvey}
          onSignupClick={toggleSignup}
          onMyPageClick={toggleMyPage}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
