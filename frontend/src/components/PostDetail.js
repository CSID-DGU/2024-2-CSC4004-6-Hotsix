// src/components/PostDetail.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comment from './Comment.js';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLikeCount(data.voter.length);
      })
      .catch((error) => console.error('Error fetching post:', error));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          navigate('/freeboard');
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
          alert('게시글 삭제에 실패했습니다.');
        });
    }
  };

  const handleVote = () => {
    fetch(`/api/posts/${id}/vote`, {
      method: 'POST',
    })
      .then(() => {
        setLikeCount(likeCount + 1);
      })
      .catch((error) => {
        console.error('Error voting post:', error);
        alert('좋아요에 실패했습니다.');
      });
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="post-detail-container">
      <h2>{post.subject}</h2>
      <div>
        <p>{post.content}</p>
        <p>작성자: {post.author.userName}</p>
        <p>작성일시: {new Date(post.createDate).toLocaleString()}</p>
        <button onClick={handleVote}>좋아요 ({likeCount})</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
      <Comment postId={post.id} comments={post.replyList} />
    </div>
  );
}

export default PostDetail;
