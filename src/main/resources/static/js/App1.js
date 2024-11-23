// Header 컴포넌트 수정
function Header({ onHomeClick, onCommunityClick, onRecommendationCourseClick, onMyPageClick, onLoginClick, onSignupClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (event) => {
    // 드롭다운 외부를 클릭했을 때만 닫기
    if (!event.target.closest('.profile-icon') && isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  // 컴포넌트 마운트 시 document에 이벤트 리스너 추가
  React.useEffect(() => {
    document.addEventListener('click', closeDropdown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [isDropdownOpen]);

  return (
    React.createElement('header', { className: 'header' },
      React.createElement('div', { className: 'left-group' }, 
        React.createElement('div', { className: 'logo', onClick: onHomeClick },
          React.createElement('img', { src: 'image.jpeg', alt: '어디갈래 로고' })
        ),
        React.createElement('nav', { className: 'nav' },
          React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); onCommunityClick(); } }, '커뮤니티'),
          React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); onRecommendationCourseClick(); } }, '추천 코스')
        )
      ),
      React.createElement('div', { className: 'right-group' },
        React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); onLoginClick(); }, className: 'auth-link' }, '로그인'),
        React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); onSignupClick(); }, className: 'auth-link' }, '회원가입'),
        React.createElement('div', { className: 'profile-icon', onClick: toggleDropdown },
          React.createElement('img', { src: 'image.jpeg', alt: '' }),
          isDropdownOpen &&
          React.createElement('div', { className: 'dropdown-menu' },
            React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); onMyPageClick(); } }, '마이페이지'),
            React.createElement('a', { href: '#', onClick: () => alert('설정 클릭됨') }, '설정')
          )
        )
      )
    )
  );
}





// Login 컴포넌트
function Login() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name, email };

    // 서버의 특정 URL로 POST 요청 보내기
    fetch('https://your-server-url.com/api/saveData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 전송
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다');
      }
      return response.json(); // JSON 형태로 응답 받기
    })
    .then(data => {
      console.log('성공:', data); // 요청 성공 시 응답 데이터 처리
    })
    .catch(error => {
      console.error('에러 발생:', error); // 요청 실패 시 에러 처리
    });
  };

  return (
    React.createElement('div', { className: 'login-container' },
      React.createElement('h2', null, '로그인'),
      React.createElement('form', { className: 'login-form' },
        React.createElement('label', null, 'Username:'),
        React.createElement('input', { type: 'text', name: 'username', required: true }),
        React.createElement('label', null, 'Password:'),
        React.createElement('input', { type: 'password', name: 'password', required: true }),
        React.createElement('button', { type: 'submit' }, '로그인')
      )
    )
  );
}

// Signup 컴포넌트
function Signup() {
  return (
    React.createElement('div', { className: 'signup-container' },
      React.createElement('h2', null, '회원가입'),
      React.createElement('form', { className: 'signup-form' },
        React.createElement('label', null, 'Username:'),
        React.createElement('input', { type: 'text', name: 'username', required: true }),
        React.createElement('label', null, 'Email:'),
        React.createElement('input', { type: 'email', name: 'email', required: true }),
        React.createElement('label', null, 'Password:'),
        React.createElement('input', { type: 'password', name: 'password', required: true }),
        React.createElement('button', { type: 'submit' }, '회원가입')
      )
    )
  );
}


// MyPage 컴포넌트
function MyPage() {
  const highlights = Array.from({ length: 5 }, (_, i) => ({ id: i + 1 })); // 하이라이트 아이콘 예시
  const posts = Array.from({ length: 9 }, (_, i) => ({ id: i + 1 })); // 게시물 예시

  return (
    React.createElement('div', { className: 'mypage' },
      React.createElement('div', { className: 'profile-section' },
        React.createElement('div', { className: 'profile-picture' }),
        React.createElement('div', { className: 'profile-info' },
          React.createElement('h2', { className: 'username' }, 'User name'),
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

// RecommendationCourse 컴포넌트
function RecommendationCourse() {
  const sections = [
    { title: '사용자 맞춤', items: Array.from({ length: 10 }, (_, i) => ({ title: `컨텐츠 ${i + 1}` })) },
  ];

  return React.createElement('div', null,
    sections.map((section, index) =>
      React.createElement(ContentCarousel, { key: index, title: section.title, items: section.items })
    )
  );
}


// ContentCarousel 컴포넌트
function ContentCarousel({ title, items }) {
  const [startIndex, setStartIndex] = React.useState(0);

  const totalItems = items.length;

  const scroll = (direction) => {
    if (direction === 'left') {
      setStartIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
    } else {
      setStartIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }
  };

  // 현재 보여줄 아이템 계산 (순환)
  const visibleItems = [
    ...items.slice(startIndex),
    ...items.slice(0, startIndex), // 앞쪽으로 슬라이싱된 나머지 추가
  ];

  return (
    React.createElement('section', { className: 'carousel-section' },
      React.createElement('h2', null, title),
      React.createElement('div', { className: 'carousel-container' },
        React.createElement('button', {
          className: 'carousel-button prev',
          onClick: () => scroll('left'),
        }, '‹'),
        React.createElement('div', {
          className: `carousel-content carousel-content-${title}`,
        },
          visibleItems.map((item, index) =>
            React.createElement('div', { className: 'carousel-item', key: index },
              React.createElement('div', { className: 'content-number' }, item.title)
            )
          )
        ),
        React.createElement('button', {
          className: 'carousel-button next',
          onClick: () => scroll('right'),
        }, '›')
      )
    )
  );
}


// Sidebar 컴포넌트
function Sidebar() {
  return (
    React.createElement('div', { className: '' },
      React.createElement('div', { className: '' },
        React.createElement('div', { className: '' }),
        React.createElement('h3', null, ''),
        React.createElement('p', null, '')
      ),
      React.createElement('nav', { className: 'sidebar-nav' },
        React.createElement('a', { href: '#게시판' }, '게시판'),
        React.createElement('a', { href: '#게시판' }, '게시판'),
        React.createElement('a', { href: '#게시판' }, '게시판'),
        React.createElement('a', { href: '#게시판' }, '게시판'),
        React.createElement('a', { href: '#게시판' }, '게시판')
      )
    )
  );
}

// 커뮤니티 컴포넌트
function Community() {
  return (
    React.createElement('div', { id: 'container', className: 'community' },
      React.createElement('div', { className: 'content-area' },
        // left-side
        React.createElement('div', { className: 'leftside' },
          React.createElement('div', { className: 'card' },
            React.createElement('form', { className: 'logged' },
              React.createElement('img', { src: '#', className: 'picture', alt: 'User' }),
              React.createElement('p', { className: 'nickname' }, 'USER NAME'),
              React.createElement('ul', { className: 'buttons' },
                React.createElement('li', null, 
                  React.createElement('a', { href: '/my', className: 'button-link' }, '내 정보')
                ),
                React.createElement('li', null, 
                  React.createElement('a', { href: '/user/logout', className: 'button-link' }, '로그아웃')
                )
              )
            )
          ),
          React.createElement('div', { className: 'card' },
            React.createElement('div', { className: 'menus' },
              React.createElement('a', { href: '/myarticle', className: 'myarticle' }, '내가 쓴 글'),
              React.createElement('a', { href: '/mycommentarticle', className: 'mycommentarticle' }, '댓글 단 글'),
              React.createElement('a', { href: '/myscrap', className: 'myscrap' }, '내 스크랩')
            )
          ),
          React.createElement('div', { className: 'card' },
            React.createElement('div', { className: 'ads' },
              React.createElement('a', { href: '#' },
                React.createElement('img', { src: '#', alt: 'Ad 1' })
              )
            )
          ),
          React.createElement('div', { className: 'card' },
            React.createElement('div', { className: 'ads' },
              React.createElement('a', { href: '#' },
                React.createElement('img', { src: '#', alt: 'Ad 2' })
              )
            )
          )
        ),
        // mid
        React.createElement('div', { className: 'main' },
          // Banner 
          React.createElement('div', { className: 'banner' },
            React.createElement('a', { href: '#' },
              React.createElement('img', { src: '#', alt: 'Banner ad' })
            )
          ),
          // main-card
          React.createElement('div', { className: 'card-container' },
            React.createElement('div', { className: 'card' },
              React.createElement('div', { className: 'board' },
                React.createElement('h3', null, React.createElement('a', { href: '#' }, '자유게시판')),
                React.createElement('a', { className: 'list', href: '#' },
                  React.createElement('time', null, '3분 전'),
                  React.createElement('p', null, 'XXXXXX')
                ),
              )
            ),
            React.createElement('div', { className: 'card' },
              React.createElement('div', { className: 'board' },
                React.createElement('h3', null, React.createElement('a', { href: '#' }, '추천 게시판')),
                React.createElement('a', { className: 'list', href: '#' },
                  React.createElement('time', null, '2분 전'),
                  React.createElement('p', null, 'XXXXXX')
                )
              )
            ),
            React.createElement('div', { className: 'card' },
              React.createElement('div', { className: 'board' },
                React.createElement('h3', null, React.createElement('a', { href: '#' }, '공지사항')),
                React.createElement('a', { className: 'list', href: '#' },
                  React.createElement('time', null, '1분 전'),
                  React.createElement('p', null, 'XXXXXX')
                )
              )
            ),
            React.createElement('div', { className: 'card' },
              React.createElement('div', { className: 'board' },
                React.createElement('h3', null, React.createElement('a', { href: '#' }, '이벤트')),
                React.createElement('a', { className: 'list', href: '#' },
                  React.createElement('time', null, '5분 전'),
                  React.createElement('p', null, 'XXXXXX')
                )
              )
            )
          )
        ),
        // right-side
        React.createElement('div', { className: 'rightside' },
          React.createElement('div', { className: 'search' },
            React.createElement('input', { type: 'text', name: 'keyword', placeholder: 'search community', className: 'text' })
          ),
          React.createElement('div', { className: 'card' },
            React.createElement('div', { className: 'board' },
              React.createElement('h3', null, React.createElement('a', { href: '#' }, '실시간 인기 글')),
              React.createElement('a', { className: 'article', href: '#' },
                React.createElement('p', { className: 'title' }, 'XXX'),
                React.createElement('p', { className: 'small' }, 'XXXXXX')
              )
            )
          ),
          React.createElement('div', { className: 'card' },
            React.createElement('div', { className: 'board' },
              React.createElement('h3', null, React.createElement('a', { href: '#' }, 'HOT 게시물')),
              React.createElement('a', { className: 'list', href: '#' },
                React.createElement('time', null, '10분 전'),
                React.createElement('p', null, 'XXXXXX')
              )
            )
          )
        )
      )
    )
  );
}


// App 컴포넌트
function App() {
  const [page, setPage] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // 로그인 상태 관리
  const [user, setUser] = React.useState({ name: '사용자 이름' }); // 사용자 정보 관리

  const toggleHome = () => { setPage(null); };
  const toggleLogin = () => { setPage('login'); };
  const toggleSignup = () => { setPage('signup'); };
  const toggleMyPage = () => { setPage('mypage'); };
  const toggleCommunity = () => { setPage('community'); };
  const toggleRecommendationCourse = () => { setPage ('recommendationcourse'); };

  const handleLogin = () => {
    setIsLoggedIn(true); // 로그인 상태 설정
    setUser({ name: '홍길동' }); // 예제 사용자 정보 설정
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그아웃 상태 설정
    setUser({ name: '' }); // 사용자 정보 초기화
  };

  const sections = [
    { title: '사용자 맞춤', items: Array.from({ length: 10 }, (_, i) => ({ title: `컨텐츠 ${i + 1}` })) },
    { title: '기념일 기념', items: Array.from({ length: 10 }, (_, i) => ({ title: `추천 ${i + 1}` })) },
    { title: '인기 장소', items: Array.from({ length: 10 }, (_, i) => ({ title: `드라마 ${i + 1}` })) },
    { title: '계절별', items: Array.from({ length: 10 }, (_, i) => ({ title: `애니 ${i + 1}` })) },
  ];

  return (
    React.createElement('div', { className: 'App' },
      React.createElement(Header, {
        isLoggedIn, // 로그인 상태 전달
        user, // 사용자 정보 전달
        onLogoutClick: handleLogout, // 로그아웃 함수 전달
        onLoginClick: toggleLogin,
        onSignupClick: toggleSignup,
        onMyPageClick: toggleMyPage,
        onHomeClick: toggleHome,
        onCommunityClick: toggleCommunity,
        onRecommendationCourseClick: toggleRecommendationCourse

      }),
      page === 'login' ? 
        React.createElement(Login, { onLogin: handleLogin }) : // 로그인 시 handleLogin 호출
      page === 'signup' ? 
        React.createElement(Signup, null) :
      page === 'mypage' ? 
        React.createElement(MyPage, null) :
      page === 'recommendationcourse' ?
        React.createElement(RecommendationCourse, null) :
      page === 'community' ? 
        React.createElement(Community, null) :
        sections.map((section, index) =>
          React.createElement(ContentCarousel, { key: index, title: section.title, items: section.items })
        )
      
    )
  );
}


// Myform 컴포넌트
function MyForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    // 전송할 데이터를 객체로 정의
    const data = { name, email };

    // 서버의 특정 URL로 POST 요청 보내기
    fetch('https://your-server-url.com/api/saveData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 전송
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다');
      }
      return response.json(); // JSON 형태로 응답 받기
    })
    .then(data => {
      console.log('성공:', data); // 요청 성공 시 응답 데이터 처리
    })
    .catch(error => {
      console.error('에러 발생:', error); // 요청 실패 시 에러 처리
    });
  };

  return (
    React.createElement('form', { onSubmit: handleSubmit },
      React.createElement('label', null, 'Name:'),
      React.createElement('input', { type: 'text', value: name, onChange: handleNameChange }),
      React.createElement('label', null, 'Email:'),
      React.createElement('input', { type: 'email', value: email, onChange: handleEmailChange }),
      React.createElement('button', { type: 'submit' }, 'Submit')
    )
  );
}


// 렌더링
ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('root')
);