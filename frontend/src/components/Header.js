// src/components/Header.js
import '../styles/Header.css'; 
import  useState  from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Header({ isLoggedIn, setIsLoggedIn,onHomeClick, onCommunityClick, onMyPageClick, onLoginClick, onSignupClick, onSurveyClick,onRecommendationCourseClick }) {

  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [profileImagePath, setProfileImagePath] = React.useState("");
  // const [isLoggedIn, setIsLoggedIn] = React.useState(!!sessionStorage.getItem("ID"));
  // const navigate = useNavigate();

  const id = sessionStorage.getItem("ID");
  // 로그인 상태 확인
  React.useEffect(() => {
    console.log("Session ID found:", id);
    setIsLoggedIn(!!id);
  }, [window.location.pathname]); // URL 변경 시 상태 동기화

  //유저 프로필 요청
  React.useEffect(() => {
      if(id){
        fetch(`/userProfile/${id}`, { // API 요청
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 필요시 Authorization 헤더 추가
                // 'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
    } )
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json();
        })
        .then(data => {
            setProfileImagePath(data.profileImagePath); // 사용자 이름 설정
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        })
      }
    }, [id]);

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
          React.createElement('img', { src: '/asset/image.jpeg', alt: '어디갈래 로고' })
        ),
        React.createElement('nav', { className: 'nav' },
          React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); onCommunityClick(); navigate('/community'); } }, '커뮤니티'),
            isLoggedIn ?
            //로그인 되어 있는 경우
            [
              React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); onRecommendationCourseClick();navigate('/recommendation-course'); }}, '사용자 맞춤 코스 추천'),
              React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); navigate('/bingo'); },},'빙고 게임')
            ] : 
            //로그인 안되어 있는 경우
            [
              React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); onRecommendationCourseClick();navigate('/login'); }}, '사용자 맞춤 코스 추천'),
              React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); navigate('/login'); },},'빙고 게임')
            ]
        ),
      ),
      React.createElement('div', { className: 'right-group' },

        //로그아웃 상태
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
        ] 

        //로그인 상태
        : [
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
              // 절대경로 : resources/static/ 에서 시작
              src:  `/asset/Images/userProfile/${profileImagePath}`,
              alt: 'No Image'
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
      