// src/components/FreeBoard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FreeBoard() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data.content))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="freeboard-container">
      <h2>자유게시판</h2>
      <button onClick={() => navigate('/freeboard/create')} className="btn btn-primary">
        게시글 작성하기
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일시</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id} onClick={() => navigate(`/freeboard/detail/${post.id}`)}>
              <td>{posts.length - index}</td>
              <td>{post.subject}</td>
              <td>{post.author.userName}</td>
              <td>{new Date(post.createDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FreeBoard;
