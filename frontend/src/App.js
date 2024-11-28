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

 
  const sections = [
    { title: '사용자 맞춤', items: Array.from({ length: 10 }, (_, i) => ({ title: `컨텐츠 ${i + 1}` })) },
    { title: '기념일 기념', items: Array.from({ length: 10 }, (_, i) => ({ title: `추천 ${i + 1}` })) },
    { title: '인기 장소', items: Array.from({ length: 10 }, (_, i) => ({ title: `드라마 ${i + 1}` })) },
    { title: '계절별', items: Array.from({ length: 10 }, (_, i) => ({ title: `애니 ${i + 1}` })) },
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element = {<Login />} />
          <Route path='/community' element = {<Community />} />
          <Route path='/recommendation-course' element = {< RecommendationCourse/>} />
          <Route path='/survey' element = {< SurveyForm/>} />
          <Route path='/signup' element = {< Signup/>} />
          <Route path='/mypage' element = {< MyPage/>} />
          <Route path='/'       element = {
          <>
            {sections.map((section, index) => (
              <ContentCarousel key={index} title={section.title} items={section.items} />
            ))}
          </>}/>
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
