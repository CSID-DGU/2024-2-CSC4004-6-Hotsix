// src/components/Header.js
import React from 'react';  
import '../styles/Header.css';

function Header({ onHomeClick, onCommunityClick, onMyPageClick, onRecommendationCourseClick, onSurveyClick, onLoginClick, onSignupClick }) {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const closeDropdown = (event) => {
      if (!event.target.closest('.profile-icon') && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };
  
    React.useEffect(() => {
      document.addEventListener('click', closeDropdown);
      return () => {
        document.removeEventListener('click', closeDropdown);
      };
    }, [isDropdownOpen]);
  
    return (
      <header className="header">
        <div className="left-group">
          <div className="logo" onClick={onHomeClick}>
            <img src="image.jpeg" alt="어디갈래 로고" />
          </div>
          <nav className="nav">
            <a href="#" onClick={(e) => { e.preventDefault(); onCommunityClick(); }}>커뮤니티</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onRecommendationCourseClick(); }}>추천 코스</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onSurveyClick(); }}>설문조사</a>
          </nav>
        </div>
        <div className="right-group">
          <a href="#" onClick={(e) => { e.preventDefault(); onLoginClick(); }} className="auth-link">로그인</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onSignupClick(); }} className="auth-link">회원가입</a>
          <div className="profile-icon" onClick={toggleDropdown}>
            <img src="image.jpeg" alt="" />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <a href="#" onClick={(e) => { e.preventDefault(); onMyPageClick(); }}>마이페이지</a>
                <a href="#" onClick={() => alert('설정 클릭됨')}>설정</a>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
  
  export default Header;
      