import '../styles/MyPage.css';

function MyPage() {
    const highlights = Array.from({ length: 5 }, (_, i) => ({ id: i + 1 }));
    const posts = Array.from({ length: 9 }, (_, i) => ({ id: i + 1 }));
  
    return (
      <div className="mypage">
        <div className="profile-section">
          <div className="profile-picture"></div>
          <div className="profile-info">
            <h2 className="username">User name</h2>
            <div className="stats">
              <div className="stat">게시물 0</div>
              <div className="stat">팔로워 0</div>
              <div className="stat">팔로우 0</div>
            </div>
          </div>
        </div>
        <div className="highlight-section">
          {highlights.map((highlight) => (
            <div className="highlight" key={highlight.id}></div>
          ))}
        </div>
        <div className="feed">
          {posts.map((post) => (
            <div className="feed-item" key={post.id}></div>
          ))}
        </div>
      </div>
    );
  }
  
  export default MyPage;