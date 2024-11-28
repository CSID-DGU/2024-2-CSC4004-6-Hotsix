// src/components/Header.js
import '../styles/Header.css'; 
import  useState  from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Header({ isLoggedIn, setIsLoggedIn,onHomeClick, onCommunityClick, onMyPageClick, onLoginClick, onSignupClick, onSurveyClick }) {

  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  // const [isLoggedIn, setIsLoggedIn] = React.useState(!!sessionStorage.getItem("ID"));
  // const navigate = useNavigate();

// 로그인 상태 확인
React.useEffect(() => {
  const Id = sessionStorage.getItem("ID");
  console.log("Session ID found:", Id);
  setIsLoggedIn(!!Id);
}, [window.location.pathname]); // URL 변경 시 상태 동기화

  const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
};

const closeDropdown = (event) => {
  if (!event.target.closest('.profile-icon') && isDropdownOpen) {
    setIsDropdownOpen(false);
  }
};

const handleLogout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("ID");
  setIsLoggedIn(false);
  onHomeClick();
  navigate('/');
};

React.useEffect(() => {
  document.addEventListener('click', closeDropdown);
  return () => {
    document.removeEventListener('click', closeDropdown);
  };
}, [isDropdownOpen]);

return (
  React.createElement('header', { className: 'header' },
    React.createElement('div', { className: 'left-group' },
      React.createElement('div', { className: 'logo', onClick: (e) => { e.preventDefault(); onHomeClick();  navigate('/'); } },
        React.createElement('img', { src: '../asset/Images/image.jpeg', alt: '어디갈래 로고' })
      ),
      React.createElement('nav', { className: 'nav' },
        React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); onCommunityClick(); navigate('/community'); } }, '커뮤니티'),
        // React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); onSurveyClick(); navigate('/survey'); } }, '설문조사') // 설문조사 대신 추천 서비스 페이지로 렌더링해야함.
      )
    ),
    React.createElement('div', { className: 'right-group' },



      !isLoggedIn ? [
        React.createElement('a', {
            key: 'login', // 고유한 key 추가
            href: '#',
            onClick: (e) => { e.preventDefault(); onLoginClick(); navigate('/login'); },
            className: 'auth-link'
        }, '로그인'),
        React.createElement('a', {
            key: 'signup', // 고유한 key 추가
            href: '#',
            onClick: (e) => { e.preventDefault();onSignupClick();  navigate('/signup'); },
            className: 'auth-link'
        }, '회원가입')
      ] : [
        React.createElement('a', {
            key: 'logout', // 고유한 key 추가
            href: '#',
            onClick: (e) => { e.preventDefault();
            handleLogout();
            },
            className: 'auth-link'
        }, '로그아웃'),
        React.createElement('div', {
            key: 'profile-icon', // 고유한 key 추가
            className: 'profile-icon',
            onClick: toggleDropdown
        },
        React.createElement('img', {
            key: 'profile-img', // 고유한 key 추가
            src: '../asset/Images/image.jpeg',
            alt: ''
        }),
        isDropdownOpen &&
        React.createElement('div', { className: 'dropdown-menu', key: 'dropdown-menu' }, // 고유한 key 추가
            React.createElement('a', {
                key: 'mypage', // 고유한 key 추가
                href: '#',
                onClick: (e) => { e.preventDefault(); onMyPageClick(); navigate('/mypage');}
                },
                '마이페이지'),
            React.createElement('a', {
                key: 'settings', // 고유한 key 추가
                href: '#',
                onClick: () => alert('설정 클릭됨')
            },
                '설정')
            )
          )
       ]
      )
    )
  );
}
  
  export default Header;
      