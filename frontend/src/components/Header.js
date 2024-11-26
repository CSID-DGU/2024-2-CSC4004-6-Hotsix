// src/components/Header.js
import '../styles/Header.css'; 
import  useState  from 'react';
import React from 'react';
// import { useNavigate } from 'react-router-dom';


function Header({ onHomeClick, onCommunityClick, onMyPageClick, onLoginClick, onSignupClick, onSurveyClick }) {

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // const navigate = useNavigate();

  // 로그인 상태 확인
  React.useEffect(() => {
      const Id = sessionStorage.getItem("ID");
      setIsLoggedIn(!!Id);
  }, []);

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
  window.location.href = '/';
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
      React.createElement('div', { className: 'logo', onClick: onHomeClick },
        React.createElement('img', { src: '../asset/Images/image.jpeg', alt: '어디갈래 로고' })
      ),
      React.createElement('nav', { className: 'nav' },
        React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); onCommunityClick(); } }, '커뮤니티'),
        React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); onSurveyClick(); } }, '설문조사') // 설문조사 추가
      )
    ),
    React.createElement('div', { className: 'right-group' },



      !isLoggedIn ? [
        React.createElement('a', {
            key: 'login', // 고유한 key 추가
            href: '#',
            onClick: (e) => { e.preventDefault(); onLoginClick(); },
            className: 'auth-link'
        }, '로그인'),
        React.createElement('a', {
            key: 'signup', // 고유한 key 추가
            href: '#',
            onClick: (e) => { e.preventDefault(); onSignupClick(); },
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
                onClick: (e) => { e.preventDefault(); onMyPageClick();}
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
      