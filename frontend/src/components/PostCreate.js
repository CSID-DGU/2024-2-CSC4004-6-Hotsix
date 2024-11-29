// src/components/PostCreate.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostCreate() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 필요한 경우 Authorization 헤더 추가
      },
      body: JSON.stringify({ subject, content }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('게시글 작성에 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        navigate(`/freeboard/detail/${data.id}`);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('게시글 작성에 실패했습니다.');
      });
  };

  return (
    <div className="post-create-container">
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            required
          ></textarea>
        </div>
        <button type="submit">저장하기</button>
      </form>
    </div>
  );
}

export default PostCreate;
