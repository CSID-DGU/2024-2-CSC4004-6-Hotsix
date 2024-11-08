// Login 컴포넌트
function Login() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();

        // 전송할 데이터를 객체로 정의
        const data = { name, email };

        // 서버의 특정 URL로 POST 요청 보내기
        fetch('', {
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


// Header 컴포넌트 수정
function Header({ onLoginClick, onSignupClick, onMyPageClick, onHomeClick }) {
  return (
    React.createElement('header', { className: 'header' },
      React.createElement('div', { className: 'logo', onClick: onHomeClick },  // 로고 클릭 시 메인 페이지로 이동
        React.createElement('img', { src: 'path_to_logo', alt: '어디갈래' })
      ),
      React.createElement('nav', { className: 'nav' },
        React.createElement('a', { href: '#community' }, '커뮤니티'),
        React.createElement('a', { href: '#mypage', onClick: onMyPageClick }, '마이페이지')
      ),
      React.createElement('div', { className: 'auth' },
        React.createElement('button', { onClick: onLoginClick }, '로그인'),
        React.createElement('button', { onClick: onSignupClick, className: 'signup' }, '회원가입')
      )
    )
  );
}


// MyPage 컴포넌트
function MyPage() {
  const posts = Array.from({ length: 9 }, (_, i) => ({ id: i + 1 })); // 예시로 9개의 게시물 생성

  return (
    React.createElement('div', { className: 'mypage' },
      React.createElement('div', { className: 'profile' },
        React.createElement('div', { className: 'profile-picture' }),
        React.createElement('div', { className: 'profile-info' },
          React.createElement('h2', null, 'Username'),
          React.createElement('p', null, 'Lorem ipsum'),
          React.createElement('p', null, 'Lorem ipsum dolor'),
          React.createElement('a', { href: 'https://website.com' }, 'website.com'),
          React.createElement('div', { className: 'stats' },
            React.createElement('span', null, 'posts'),
            React.createElement('span', null, 'followers'),
            React.createElement('span', null, 'following')
          )
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

// ContentCarousel 컴포넌트
function ContentCarousel({ title, items }) {
  // 스크롤 함수
  const scroll = (direction, container) => {
    const scrollAmount = 200; // 한 번에 스크롤할 픽셀 값

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    React.createElement('section', { className: 'carousel-section' },
      React.createElement('h2', null, title),
      React.createElement('div', { className: 'carousel-container' },
        React.createElement('button', { 
          className: 'carousel-button prev', 
          onClick: (e) => {
            const container = e.target.closest('.carousel-container').querySelector('.carousel-content');
            scroll('left', container);
          } 
        }, '‹'),
        React.createElement('div', { className: `carousel-content carousel-content-${title}` },
          items.map((item, index) =>
            React.createElement('div', { className: 'carousel-item', key: index },
              React.createElement('div', { className: 'content-number' }, item.title)
            )
          )
        ),
        React.createElement('button', { 
          className: 'carousel-button next', 
          onClick: (e) => {
            const container = e.target.closest('.carousel-container').querySelector('.carousel-content');
            scroll('right', container);
          } 
        }, '›')
      )
    )
  );
}

// App 컴포넌트
function App() {
  const [page, setPage] = React.useState(null);
  
  const toggleHome = () => { setPage(null); };
  const toggleLogin = () => {setPage('login');};
  const toggleSignup = () => {setPage('signup');};
  const toggleMyPage = () => {setPage('mypage')};

  const sections = [
    { title: '사용자 맞춤', items: Array.from({ length: 10 }, (_, i) => ({ title: `컨텐츠 ${i + 1}` })) },
    { title: '기념일 기념', items: Array.from({ length: 10 }, (_, i) => ({ title: `추천 ${i + 1}` })) },
    { title: '인기 장소', items: Array.from({ length: 10 }, (_, i) => ({ title: `드라마 ${i + 1}` })) },
    { title: '계절별', items: Array.from({ length: 10 }, (_, i) => ({ title: `애니 ${i + 1}` })) },
    { title: '11월에 방문할 만한', items: Array.from({ length: 10 }, (_, i) => ({ title: `다큐 ${i + 1}` })) }
  ];

  return (
    React.createElement('div', { className: 'App' },
      React.createElement(Header, { onLoginClick: toggleLogin, onSignupClick: toggleSignup, onMyPageClick: toggleMyPage, onHomeClick: toggleHome }), 
      page === 'login' ? 
        React.createElement(Login, null) :
      page === 'signup' ? 
        React.createElement(Signup, null) :
      page === 'mypage' ? 
        React.createElement(MyPage, null) :
        sections.map((section, index) =>
          React.createElement(ContentCarousel, { key: index, title: section.title, items: section.items })
        )
    )
  );
}

// 렌더링
ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('root')
);
