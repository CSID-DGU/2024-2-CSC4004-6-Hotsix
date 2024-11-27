// src/App.js
import React from 'react';
import Header from './components/Header.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import SurveyForm from './components/SurveyForm.js';
import MyPage from './components/MyPage.js';
import Community from './components/Community.js';
import RecommendationCourse from './components/RecommendationCourse.js';
import ContentCarousel from './components/ContentCarousel.js';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [page, setPage] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // 로그인 상태 관리
  const [user, setUser] = React.useState({ name: '' }); // 사용자 정보 관리

  // 페이지 이동 함수 정의
  const toggleHome = () => setPage(null);
  const toggleLogin = () => setPage('login');
  const toggleSignup = () => setPage('signup');
  const toggleMyPage = () => setPage('mypage');
  const toggleCommunity = () => setPage('community'); // 커뮤니티 페이지 핸들러
  const toggleRecommendationCourse = () => setPage('recommendation-course'); // 추천 코스 페이지 핸들러
  const toggleSurvey = () => setPage('survey'); // 설문조사 페이지 핸들러

  
  const handleLogin = () => {
    setIsLoggedIn(true); // 로그인 상태 설정
    setUser({ name: '홍길동' }); // 예제 사용자 정보 설정
    setPage(null); // 로그인 후 홈 화면으로 이동
  };
  
//  const handleLogout = () => {
//    setIsLoggedIn(false); // 로그아웃 상태 설정
//    setUser({ name: '' }); // 사용자 정보 초기화
//    setPage(null); // 로그아웃 후 홈 화면으로 이동
//  };
  
 
  const sections = [
    { title: '사용자 맞춤', items: Array.from({ length: 10 }, (_, i) => ({ title: `컨텐츠 ${i + 1}` })) },
    { title: '기념일 기념', items: Array.from({ length: 10 }, (_, i) => ({ title: `추천 ${i + 1}` })) },
    { title: '인기 장소', items: Array.from({ length: 10 }, (_, i) => ({ title: `드라마 ${i + 1}` })) },
    { title: '계절별', items: Array.from({ length: 10 }, (_, i) => ({ title: `애니 ${i + 1}` })) },
  ];

  return (
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
        user={user}
        onLogoutClick={handleLogout}
        onLoginClick={toggleLogin}
        onHomeClick={toggleHome}
        onCommunityClick={toggleCommunity}
        onRecommendationCourseClick={toggleRecommendationCourse}
        onSurveyClick={toggleSurvey}
        onSignupClick={toggleSignup}
        onMyPageClick={toggleMyPage}
      />
      {page === 'login' && <Login onLogin={handleLogin} />} {/* 로그인 시 handleLogin 호출 */}
      {page === 'community' && <Community />}
      {page === 'recommendation-course' && <RecommendationCourse />}
      {page === 'survey' && <SurveyForm />}
      {page === 'signup' && <Signup />}
      {page === 'mypage' && <MyPage />}
      {!page &&
        sections.map((section, index) => (
          <ContentCarousel key={index} title={section.title} items={section.items} />
        ))}
    </div>
  );
  }
export default App;
