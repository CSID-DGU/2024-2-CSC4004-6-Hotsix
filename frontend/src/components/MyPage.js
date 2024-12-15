// import '../styles/MyPage.css';
import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/MyPage.css';
import axios from 'axios';
import { data } from 'react-router-dom';

function MyPage() {
  const highlights = Array.from({ length: 5 }, (_, i) => ({ id: i + 1 })); // 하이라이트 아이콘 예시
  const posts = Array.from({ length: 9 }, (_, i) => ({ id: i + 1 })); // 게시물 예시

  const [userName, setUserName] = useState('');
  const id = sessionStorage.getItem("ID"); // 저장된 사용자 ID 가져오기
  const [profileImagePath, setProfileImagePath] = React.useState("");
  const fallbackImagePath = "alt.png"; // 대체 이미지 경로
  const fallbackthumnail = "altposts.png"; // 대체 이미지 경로

  const [thumbnails, setThumbnails] = useState([]); //썸네일
  const [postCount, setPostCount] = useState(0); // 게시물 개수
  const [bingoPoint,setBingoPoint] = useState(0); //빙고 포인트

  const getBingoPoint = () => {
    fetch(`/getBingoPoint/${id}`,{
      method: 'GET',
      headers:{
        'Content-Type':'application/json',
        },
      }
    )
    .then(response => {
      if(!response.ok){
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    })
    .then(data => {
      setBingoPoint(data.bingoPoint);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
  })
  };

  // Dynamically generate image paths
  const getPostImagePath = (filename) => `/uploads/postImage/${filename}`;
  const getProfileImagePath = (filename) => `/uploads/userProfile/${filename}`;
  const getAltImagePath = (filename) => `/uploads/altImage/${filename}`;

  if(id){
      fetch(`/userNameAndUserProfile/${id}`, { // 유저 프로필,이름 요청
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
  } )
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch user data');
          }
          return response.json();
      })
      .then(data => {
          setProfileImagePath(data.profileImagePath);
          setUserName(data.userName); // 사용자 이름 설정
      })
      .catch(error => {
          console.error('Error fetching user data:', error);
      })
  }
  //사용자 게시글 가져오기
  useEffect(() => {
    getBingoPoint();
    if (!id) return;

    fetch(`/posts/getUserPosts/${id}`,{
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
    }
  })
  //사용자가 작성한 게시글의 사진들 가져오기
  .then((response) => {
    return response.json();
   })
  .then((data) => {
    setThumbnails(data);
    setPostCount(data.length);
  })
  .catch((error) => {
    console.error('Error fetching user posts:', error);
    });   
  },[id])
 

return (
  React.createElement('div', { className: 'mypage' },
    React.createElement('div', { className: 'profile-section' },
      React.createElement('img', {  
        className: 'profile-picture' , 
        src: profileImagePath ? getProfileImagePath(profileImagePath) : getAltImagePath(fallbackImagePath),
        onError: (e) => { e.target.src = getAltImagePath(fallbackImagePath); }, // 이미지 로드 실패 시 대체 이미지로 변경
        alt: 'No Image'
        }
      ),
      React.createElement('div', { className: 'profile-info' },
        React.createElement('h2', { className: 'username' }, 
          userName
        ),
        React.createElement('div', { className: 'stats' },
          React.createElement('div', { className: 'stat' }, `게시물 ${postCount}`),
          React.createElement('div', { className: 'stat' }, `빙고 포인트 ${bingoPoint} point`),
        )
      )
    ),
    React.createElement('div', { className: 'highlight-section' },
      highlights.map(highlight =>
        React.createElement('div', { className: 'highlight', key: highlight.id })
      )
    ),
    React.createElement('div', { className: 'feed' },
      thumbnails.map((thumbnail,index) =>
        React.createElement('img', {
            key: index,
            className: 'feed-item',
            src: thumbnail ?   getPostImagePath(thumbnail) : getAltImagePath(fallbackthumnail),
            onError: (e) => { e.target.src = getAltImagePath(fallbackthumnail); },
            alt: `No Image`
          })
      )
    )
  )
);
}
  
  export default MyPage;