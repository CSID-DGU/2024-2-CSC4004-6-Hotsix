// src/App.js
import React from 'react';
import Header from './components/Header.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import SurveyForm from './components/SurveyForm.js';
import MyPage from './components/MyPage.js';
import Community from './components/Community.js';
import RecommendationCourse from './components/RecommendationCourse.js';
import RecommendationResult from './components/RecommendationResult.js';
import Bingo from './components/Bingo.js';
import ContentCarousel from './components/ContentCarousel.js';
import ChatWindow from './components/ChatWindow.js';
import Setting from './components/Setting.js'; // Setting 컴포넌트 추가
import { ResultProvider } from './components/ResultContext.js';

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
  const toggleRecommendationResult = () => setPage('recommendation-course-result'); // 추천 코스 페이지 핸들러
  const toggleBingo = () => setPage('bingo'); //빙고
  const toggleSurvey = () => setPage('survey'); // 설문조사 페이지 핸들러
  const toggleSetting = () => setPage('settings');
 
  return (
    <ResultProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/login' element = {<Login />} />
            <Route path='/community' element = {<Community />} />
            <Route path='/recommendation-course' element = {< RecommendationCourse/>} />
            <Route path='/recommendation-course-result' element = {< RecommendationResult/>} />
            <Route path="/RecommendationResult" element={<RecommendationResult />} />
            <Route path='/bingo' element = {<Bingo/>} />
            <Route path='/survey' element = {< SurveyForm/>} />
            <Route path='/signup' element = {< Signup/>} />
            <Route path='/mypage' element = {< MyPage/>} />
            <Route path="/settings" element={<Setting />} /> {/* Setting 페이지 추가 */}
            <Route path='/'       element = {
            <>
              <ContentCarousel/>
              <ChatWindow />
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
            // onRecommendationResultClick={toggleRecommendationResult}
            // onBingoClick={toggleBingo}
            onSurveyClick={toggleSurvey}
            onSignupClick={toggleSignup}
            onMyPageClick={toggleMyPage}
            onSettingClick={toggleSetting}
          />
        </BrowserRouter>
      </div>
    </ResultProvider>
    );
  }
export default App;