// src/components/Comment.js

import React, { useState } from 'react';

function Comment({ postId, comments }) {
  const [content, setContent] = useState('');
  const [commentList, setCommentList] = useState(comments || []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/replies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 필요한 경우 Authorization 헤더 추가
      },
      body: JSON.stringify({ content, postId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('댓글 작성에 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        setCommentList([...commentList, data]);
        setContent('');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('댓글 작성에 실패했습니다.');
      });
  };

  return (
    <div className="comment-section">
      <h3>댓글</h3>
      {commentList.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <p>작성자: {comment.author.userName}</p>
          <p>작성일시: {new Date(comment.createDate).toLocaleString()}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          required
        ></textarea>
        <button type="submit">댓글 작성</button>
      </form>
    </div>
  );
}

export default Comment;
