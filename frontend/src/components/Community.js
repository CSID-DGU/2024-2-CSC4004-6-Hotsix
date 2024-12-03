import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Community.css';

function Community() {
  const [view, setView] = useState('cards'); // Current view state：'cards', 'list', 或 'detail'
  const [currentBoard, setCurrentBoard] = useState(null); // Current section name
  const [posts, setPosts] = useState([]); // List of posts in the current section
  const [selectedPost, setSelectedPost] = useState(null); // Details of the currently selected post
  const [loading, setLoading] = useState(false); // Loading Status
  const [latestPosts, setLatestPosts] = useState({}); // Stores the latest post for each board
  const [navigationStack, setNavigationStack] = useState([]); // Path Stack
  const [likeLoading, setLikeLoading] = useState(false);
  const [commentContent, setCommentContent] = useState(''); // Current comment content
  const [comments, setComments] = useState([]); // All comments on the current post
  const [userNum, setUserNum] = useState(null);
  const userId = sessionStorage.getItem('ID'); 
  const [likes, setLikes] = useState({});
  const [isPosting, setIsPosting] = useState(false); // Controls whether to display the input box for posting new posts
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const boards = {
    자유게시판: '자유게시판',
    추천게시판: '추천게시판',
    공지사항: '공지사항',
    이벤트: '이벤트',
  };

  // 유저 이름 가져오기
  const [userName, setUserName] = useState('');
  const id = sessionStorage.getItem('ID');
  
  useEffect(() => {
    if (id) {
      axios
        .get(`/userName/${id}`)
        .then((response) => {
          setUserName(response.data.userName); // 사용자 이름 설정
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [id]);

  // Get the userNum of the current user
  useEffect(() => {
    if (userId) {
      axios
        .get(`/userNum/${userId}`)
        .then((response) => {
          setUserNum(response.data);
        })
        .catch((error) => {
          console.error('Failed to fetch userNum:', error);
        });
    }
  }, [userId]);

  // Get the latest posts in each forum
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const results = {};
        for (const boardName of Object.values(boards)) {
          const response = await axios.get(`/posts/category/${boardName}/latest`);
          results[boardName] = response.data.slice(0, 4); // Get the latest 4 posts in each forum
        }
        setLatestPosts(results);
      } catch (error) {
        console.error('Failed to fetch latest posts:', error);
      }
    };
    fetchLatestPosts();
  }, []);

  useEffect(() => {
    if (currentBoard) {
      setLoading(true);
      axios
        .get(`/posts/category/${currentBoard}`)
        .then((response) => {
          setPosts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch posts:', error);
          setLoading(false);
        });
    }
  }, [currentBoard]);

  // Get post details
  const fetchPostDetail = (postId) => {
    setLoading(true);
    axios
      .get(`/posts/${postId}`)
      .then((response) => {
        setSelectedPost(response.data);
        setLikes(response.data.likes);
        fetchComments(postId); 
        setView('detail');
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch post detail:', error);
        setLoading(false);
      });
  };

  // Post a comment
  const addComment = (postId, content) => {
    if (!content.trim()) return; // Preventing Blank Comments

    if (!userNum) {
      alert("User not found or userNum is not available.");
      return;
    }

    const commentData = {
      content: content,
      author: { userNum: userNum },
    };

    axios
      .post(`/replies?postId=${postId}`, commentData)
      .then((response) => {
        alert('Comment added successfully!');
        setCommentContent('');

        fetchComments(postId);
      })
      .catch((error) => {
        console.error('Failed to add comment:', error);
      });
  };

  // Get comments
  const fetchComments = (postId) => {
    axios
      .get(`/replies/post/${postId}`)
      .then((response) => {
        setComments(response.data); 
      })
      .catch((error) => {
        console.error('Failed to fetch comments:', error);
      });
  };

  // Create a new post
  const createPost = () => {
    if (!userNum) {
      alert("User not found or userNum is not available.");
      return;
    }

    if (!subject || !content) {
      alert('Title and content cannot be empty.');
      return;
    }

    const postData = {
      subject: subject,
      content: content,
      category: currentBoard,
      authorUserNum: userNum, 
    };

    axios
      .post('/posts', postData)
      .then(() => {
        alert('Post created successfully!');
        setSubject(''); 
        setContent(''); 
        setIsPosting(false); 
        fetchPostsByCategory(currentBoard); 
      })
      .catch((error) => {
        console.error('Failed to create post:', error);
      });
  };

  // Delete a post
  const deletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      axios
        .delete(`/posts/${postId}`)
        .then(() => {
          alert('Post deleted successfully!');
          fetchPostsByCategory(currentBoard); 
        })
        .catch((error) => {
          console.error('Failed to delete post:', error);
        });
    }
  };

  // Update Post
  const updatePost = (postId, updatedData) => {
    axios
      .put(`/posts/${postId}`, updatedData) 
      .then(() => {
        alert('Post updated successfully!');
        fetchPostDetail(postId); 
      })
      .catch((error) => {
        console.error('Failed to update post:', error);
      });
  };

  // Like a post
  const toggleLikeHandler = (postId, isDetail = false) => {
    if (likeLoading) return; // Prevent duplicate clicks
    setLikeLoading(true);

    if (!sessionStorage.getItem('ID')) {
      alert('Please log in to like posts.');
      setLikeLoading(false);
      return;
    }

    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: (prevLikes[postId] || 0) + 1, 
    }));

    axios
      .post(`/posts/${postId}/like`) 
      .then((response) => {
        const { likeCount, isLiked } = response.data;

        if (isDetail) {
          setSelectedPost({
            ...selectedPost,
            liked: isLiked,
            likeCount,
          });
        } else {
          const updatedPosts = posts.map((post) =>
            post.id === postId ? { ...post, liked: isLiked, likeCount } : post
          );
          setPosts(updatedPosts);
        }
      })
      .catch((error) => {
        console.error('Failed to toggle like:', error);
      })
      .finally(() => {
        setLikeLoading(false);
      });
  };

  // Unlike a post
  const unlikePost = (postId) => {
    axios
      .post(`/posts/${postId}/unlike`) 
      .then((response) => {
        const { likeCount, isLiked } = response.data;
        const updatedPosts = posts.map((post) =>
          post.id === postId ? { ...post, liked: isLiked, likeCount } : post
        );
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error('Failed to unlike post:', error);
      });
  };

  // Back to previous level
  const goBack = () => {
    if (navigationStack.length > 0) {
      const lastState = navigationStack.pop();
      setNavigationStack([...navigationStack]);

      setView(lastState.view);
      setCurrentBoard(lastState.currentBoard || null);
      setPosts(lastState.posts || []);

      if (lastState.view === 'list') {
        fetchPostsByCategory(lastState.currentBoard); 
      }
    } else {
      setView('cards');
      setCurrentBoard(null);
    }
  };

  // Get posts by section
  const fetchPostsByCategory = (category) => {
    setNavigationStack((prevStack) => [...prevStack, { view, currentBoard }]);
    setLoading(true);
    setCurrentBoard(category);

    axios
      .get(`/posts/category/${category}`)
      .then((response) => {
        setPosts(response.data); // Update Post List
        setView('list'); // Switch to list view
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch posts for category:', error);
        setLoading(false);
      });
  };

  return (
    <div id="container" className="community">
      <div className="content-area">
        {/* Left  */}
        <div className="leftside">
          <div className="card">
            <form className="logged">
              <img src="#" className="picture" alt="User" />
              <p className="nickname">{userName}</p>
            </form>
          </div>
          <div className="card">
            <div className="menus">
              <a href="/myarticle" className="myarticle">내가 쓴 글</a>
              <a href="/mycommentarticle" className="mycommentarticle">댓글 단 글</a>
              <a href="/myscrap" className="myscrap">내 스크랩</a>
            </div>
          </div>
        </div>

        {/* mid */}
        <div className="main">
          {loading ? (
            <p>Loading...</p>
          ) : view === 'cards' ? (
            <div className="card-container">
              {Object.keys(boards).map((boardName) => (
                <div key={boardName} className="board-container">
                  <table className="posts-table">
                    <tbody>
                      <tr onClick={() => fetchPostsByCategory(boards[boardName])}>
                        <td style={{ textAlign: 'left', color: 'red' }}>
                          {boardName}
                        </td>
                      </tr>
                      {latestPosts[boards[boardName]]?.map((post) => (
                        <tr
                          key={post.id}
                          onClick={(e) => {
                            e.stopPropagation(); // Stop bubbling
                            fetchPostDetail(post.id); // Get post details
                          }}
                        >
                          <td>
                            <div className="left-column">{post.subject}</div>
                            <div className="right-column">
                              {new Date(post.createDate).toLocaleDateString()}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : view === 'list' ? (
            <div className="post-list-container">
              <div class="button-container">
                <button className="back-button" onClick={goBack}>Back</button>
                <button className="post-button" onClick={() => setIsPosting(true)}>Post</button>
              </div>
              <h2 className="board-title">{currentBoard}</h2>
              {isPosting && (
                <div className="createPost-form">
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter post title"
                    className="input-field"
                  />
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content..."
                    rows="4"
                    className="input-field"
                  ></textarea>
                  <div className="createPost-button">
                    <button onClick={createPost} className="submit-post-btn">
                      Submit
                    </button>
                  </div>
                </div>
              )}
                <div className="post-list">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="post-item"
                      onClick={() => fetchPostDetail(post.id)}
                    >
                      <div className="post-title-row">
                        <span className="post-title">{post.subject}</span>
                      </div>
                      <div className="post-meta-row">
                        <div className="like-section">
                          <i
                            className={`fas fa-thumbs-up like-icon ${post.liked ? 'liked' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLikeHandler(post.id, false); // 点赞
                            }}
                          ></i>
                          <span className="like-count">{likes[post.id] || 0}</span>
                        </div>
                        <div className="author-section">
                          <span>By: {post.authorName || 'Unknown'}</span>
                        </div>
                        <div className="date-section">
                          <span>{new Date(post.createDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          ) : view === 'detail' ? (
            <div className="post-list-container">
              <button className="back-button" onClick={goBack}>Back</button>
              <div className="card large-card">
                <h2 className="board-title">{selectedPost.subject}</h2>
                <p><strong>Author:</strong> {selectedPost.authorName || 'Unknown'}</p>
                <p><strong>Date:</strong> {new Date(selectedPost.createDate).toLocaleString()}</p>
                <div className="content">{selectedPost.content}</div>
                <div className="like-section">
                  <i
                    className={`fas fa-thumbs-up like-icon ${selectedPost.liked ? 'liked' : ''}`}
                    onClick={() => toggleLikeHandler(selectedPost.id, true)} // 点赞
                  ></i>
                  <span className="like-count">{likes[selectedPost.id] || 0}</span>
                </div>

                <div className="comment-section">
                  <h3>Comments</h3>
                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)} 
                    placeholder="Write a comment..."
                    rows="4"
                  ></textarea>
                  <button
                    className="comment-submit-btn"
                    onClick={() => addComment(selectedPost.id, commentContent)} 
                  >
                    Submit
                  </button>

                  <div className="comments-list">
                    {comments.map((comment) => (
                      <div key={comment.id} className="comment-card">
                        <p><strong>{comment.authorName || 'Unknown'}</strong> - {new Date(comment.createDate).toLocaleString()}</p>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* right */}
        <div className="rightside">
          <div className="card">
            <div className="board">
              <h3><a href="#">실시간 인기 글</a></h3>
              <a className="article" href="#">
                <p className="title">XXX</p>
                <p className="small">XXXXXX</p>
              </a>
            </div>
          </div>
          <div className="card">
            <div className="board">
              <h3><a href="#">HOT 게시물</a></h3>
              <a className="list" href="#">
                <time>10분 전</time>
                <p>AAAAAAAA</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
