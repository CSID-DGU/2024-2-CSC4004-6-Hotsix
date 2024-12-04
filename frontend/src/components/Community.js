import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Community.css';

function Community() {
  const [view, setView] = useState('cards'); // 当前视图状态：'cards', 'list', 或 'detail'
  const [currentBoard, setCurrentBoard] = useState(null); // 当前板块名称
  const [posts, setPosts] = useState([]); // 当前板块的帖子列表
  const [selectedPost, setSelectedPost] = useState(null); // 当前选中的帖子详情
  const [loading, setLoading] = useState(false); // 加载状态
  const [latestPosts, setLatestPosts] = useState({}); // 存储每个公告板的最新帖子
  const [navigationStack, setNavigationStack] = useState([]); // 路径栈
  const [likeLoading, setLikeLoading] = useState(false);

  const boards = {
    자유게시판: '자유게시판',
    추천게시판: '추천게시판',
    공지사항: '공지사항',
    이벤트: '이벤트',
  };

    //유저 이름 가져오기
    const [userName, setUserName] = useState('');
    const id = sessionStorage.getItem("ID");

    React.useEffect(() => {
      if(id){
        fetch(`/userName/${id}`, { // API 요청
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
            setUserName(data.userName); // 사용자 이름 설정
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        })
      }
    }, [id]);


  useEffect(() => {
  const fetchPosts = () => {
    axios
      .get(`/posts`, { params: { boardName: currentBoard } }) // 获取当前板块的帖子
      .then((response) => {
        setPosts(response.data); // 将返回的数据存储到 posts 状态
      })
      .catch((error) => {
        console.error('Failed to fetch posts:', error);
      });
  };

  fetchPosts();
}, [currentBoard]);



  const fetchBoardPosts = (boardName) => {
    setNavigationStack((prevStack) => [...prevStack, { view, currentBoard }]);
    setLoading(true);
    setCurrentBoard(boardName);

    axios
      .get(`/post/posts`, { params: { boardName } }) // 获取指定板块的所有帖子
      .then((response) => {
        const postsWithLikes = response.data.map((post) => ({
          ...post,
          likeCount: post.likes, // 映射后端的点赞数
          liked: post.isLiked,  // 映射后端的点赞状态
        }));
        setPosts(postsWithLikes); // 更新帖子列表
        setView('list'); // 切换到列表视图
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Failed to fetch posts for ${boardName}:`, error);
        setLoading(false);
      });
  };



  // 获取帖子详情
  const fetchPostDetail = (postId) => {
    setNavigationStack((prevStack) => [...prevStack, { view, currentBoard, posts }]);
    setLoading(true);
    axios
      .get(`/post/detail`, { params: { id: postId } })
      .then((response) => {
        const postDetail = {
          ...response.data,
          likeCount: response.data.likes, // 映射后端的点赞数
          liked: response.data.isLiked,  // 映射后端的点赞状态
        };
        setSelectedPost(postDetail); // 更新帖子详情
        setView('detail'); // 切换到详情视图
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Failed to fetch post detail:`, error);
        setLoading(false);
      });
  };


  // Post add
  const createPost = (postData) => {
    fetch('/post/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(postData),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); 
    })
    .then((data) => {
      alert('게시글 작성이 완료되었습니다!');
      fetchBoardPosts(currentBoard); 
      
      const responseData = data; // 서버 응답 데이터 저장
      console.log('Response Data:', responseData);
    })
    .catch((error) => {
      console.error('Failed to create post:', error);
    });
  }
  // const createPost = (postData) => {
  //   axios
  //     .post('/post/add', postData)
  //     .then((response) => {
  //       alert('게시글 작성이 완료되었습니다!');
  //       fetchBoardPosts(currentBoard); // 刷新当前板块
  //     })
  //     .then((response) =>{
  //       responseData = response.data;
  //       response.json();
  //     })
  //     .catch((error) => {
  //       console.error('Failed to create post:', error);
  //     });
  // };

  // Post delete
  const deletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      axios
        .delete(`/post/delete/${postId}`)
        .then(() => {
          alert('게시글 삭제가 완료되었습니다!');
          fetchBoardPosts(currentBoard); // 刷新当前板块
        })
        .catch((error) => {
          console.error('Failed to delete post:', error);
        });
    }
  };

  // 更新帖子
  const updatePost = (postId, updatedData) => {
    axios
      .put(`/post/update/${postId}`, updatedData)
      .then(() => {
        alert('게시글이 수정되었습니다!');
        fetchPostDetail(postId); // 刷新详情视图
      })
      .catch((error) => {
        console.error('Failed to update post:', error);
      });
  };

  // 添加回复
  const addReply = (replyData) => {
    axios
      .post('/reply/add', replyData)
      .then((response) => {
        alert('댓글이 작성되었습니다!');
        fetchPostDetail(selectedPost.id); // 刷新帖子详情
      })
      .catch((error) => {
        console.error('Failed to add reply:', error);
      });
  };

  // 获取每个板块的最新帖子
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const results = {};
        for (const boardName of Object.values(boards)) {
          const response = await axios.get(`/post/posts`, { params: { boardName } });
          results[boardName] = response.data.slice(0, 3); // 取每个板块的最新三条帖子
        }
        setLatestPosts(results);
      } catch (error) {
        console.error('Failed to fetch latest posts:', error);
      }
    };

    fetchLatestPosts();
  }, []);

  const toggleLikeHandler = (postId, isDetail = false) => {
    if (likeLoading) return; // 防止重复点击
    setLikeLoading(true);

    if (!sessionStorage.getItem('ID')) {
      alert('로그인이 필요합니다!');
      setLikeLoading(false);
      return;
    }

    axios
      .post(`/post/like`, { postId })
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

  // 返回上一级
  const goBack = () => {
    if (navigationStack.length > 0) {
      const lastState = navigationStack.pop();
      setNavigationStack([...navigationStack]);

      setView(lastState.view);
      setCurrentBoard(lastState.currentBoard || null);
      setPosts(lastState.posts || []);

      if (lastState.view === 'list') {
        fetchBoardPosts(lastState.currentBoard); // 重新加载列表
      }
    } else {
      setView('cards');
      setCurrentBoard(null);
    }
  };


  return (
    <div id="container" className="community">
      <div className="content-area">
        {/* 左侧内容 */}
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

        {/* 中间内容 */}
        <div className="main">
          {loading ? (
            <p>Loading...</p>
          ) : view === 'cards' ? (
            <div className="card-container">
              {Object.keys(boards).map((boardName) => (
                <div
                  key={boardName}
                  className="card"
                  onClick={() => fetchBoardPosts(boards[boardName])}
                >
                  <div className="board">
                    <h3>{boardName}</h3>
                    <div className="latest-posts">
                      {latestPosts[boards[boardName]]?.map((post) => (
                        <div
                          key={post.id}
                          className="latest-post-item"
                          onClick={(e) => {
                            e.stopPropagation(); // 阻止冒泡到父级卡片
                            fetchPostDetail(post.id); // 获取详情
                          }}
                        >
                          <span className="post-title">{post.subject}</span>
                          <span className="post-date">
                            {new Date(post.createDate).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : view === 'list' ? (
            <div className="post-list-container">
              <button className="back-button" onClick={goBack}>
                Back
              </button>
              <h2 className="board-title">{currentBoard}</h2>
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
                            e.stopPropagation(); // 阻止事件冒泡
                            toggleLikeHandler(post.id, false); // 调用通用函数
                          }}
                        ></i>
                        <span className="like-count">{post.likeCount}</span>
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
          ) : 
          //게시글 클릭 시 view
          view === 'detail' ? (
            <div className="post-list-container">
              <button className="back-button" onClick={goBack}>
                Back
              </button>
              <div className="card large-card">
                <h2 className="board-title">{selectedPost.subject}</h2>
                <p>
                  <strong>Author:</strong> {selectedPost.authorName || 'Unknown'}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(selectedPost.createDate).toLocaleString()}
                </p>
                <div className="content">{selectedPost.content}</div>
                <div className="like-section">
                  <i
                    className={`fas fa-thumbs-up like-icon ${selectedPost.liked ? 'liked' : ''}`}
                    onClick={() => toggleLikeHandler(selectedPost.id, true)} // 调用通用函数
                  ></i>
                  <span className="like-count">{selectedPost.likeCount}</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {}
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