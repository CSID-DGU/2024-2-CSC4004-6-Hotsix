// src/App.js
import React from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import SurveyForm from './components/SurveyForm';
import MyPage from './components/MyPage';
import Community from './components/Community';
import RecommendationCourse from './components/RecommendationCourse';
import ContentCarousel from './components/ContentCarousel';

function App() {
  const [page, setPage] = React.useState(null);

  const toggleMyPage = () => setPage("mypage");
  const toggleCommunity = () => setPage("community");
  const toggleRecommendationCourse = () => setPage("recommendationcourse");

  return (
    <div className="App">
      <Header
        onHomeClick={() => togglePage(null)}
        onCommunityClick={() => togglePage('community')}
        onRecommendationCourseClick={() => togglePage('recommendationcourse')}
        onSurveyClick={() => togglePage('survey')}
        onLoginClick={() => togglePage('login')}
        onSignupClick={() => togglePage('signup')}
        onMyPageClick={() => togglePage('mypage')}
      />
      {page === 'login' && <Login />}
      {page === 'signup' && <Signup />}
      {page === 'mypage' && <MyPage />}
      {page === 'community' && <Community />}
      {page === 'recommendationcourse' && <RecommendationCourse />}
      {page === 'survey' && <SurveyForm />}
      {!page && <ContentCarousel title="사용자 맞춤" items={[{ title: '컨텐츠 1' }, { title: '컨텐츠 2' }]} />}
    </div>
  );
}

export default App;
