// import '../styles/MyPage.css';
import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/MyPage.css';

function MyPage() {
  const highlights = Array.from({ length: 5 }, (_, i) => ({ id: i + 1 })); // 하이라이트 아이콘 예시
  const posts = Array.from({ length: 9 }, (_, i) => ({ id: i + 1 })); // 게시물 예시

  const [userName, setUserName] = useState('');
  const id = sessionStorage.getItem("ID"); // 저장된 사용자 ID 가져오기

  if(id){
      fetch(`/user/${id}`, { // API 요청
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
          setUserName(data.userName); // 사용자 이름 설정
      })
      .catch(error => {
          console.error('Error fetching user data:', error);
      })

}



return (
  React.createElement('div', { className: 'mypage' },
    React.createElement('div', { className: 'profile-section' },
      React.createElement('div', { className: 'profile-picture' }),
      React.createElement('div', { className: 'profile-info' },
        React.createElement('h2', { className: 'username' }, 
          userName
        ),
        React.createElement('div', { className: 'stats' },
          React.createElement('div', { className: 'stat' }, '게시물 0'),
          React.createElement('div', { className: 'stat' }, '팔로워 0'),
          React.createElement('div', { className: 'stat' }, '팔로우 0')
        )
      )
    ),
    React.createElement('div', { className: 'highlight-section' },
      highlights.map(highlight =>
        React.createElement('div', { className: 'highlight', key: highlight.id })
      )
    ),
    React.createElement('div', { className: 'feed' },
      posts.map(post =>
        React.createElement('div', { className: 'feed-item', key: post.id })
      )
    )
  )
);
}
  
  export default MyPage;