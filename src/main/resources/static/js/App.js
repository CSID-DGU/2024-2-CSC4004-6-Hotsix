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


    const [formData, setFormData] = useState({
        id: '',
        password: '',
        userName: '',
        birthDate: '',
        phoneNum: '',
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        const response = await fetch('signUp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      //회원 가입 성공 응답시
      if(response.ok){
        React.createElement('App',null);       //메인 페이지로 이동
        }
      else  {
        React.createElement('SignUp',null);    //회원 가입 페이지로 새로고침
      }




//  //data 선언
//  const [id, setId] = React.useState('');
//  const [password, setPassword] = React.useState('');
//  const [name, setName] = React.useState('');
//  const [birthDate, setBirthDate] = React.useState('');
//  const [phoneNum, setPhoneNum] = React.useState('');
//
//
//  //handleChange
//  const handleIdChange = (event) => setId(event.target.value);
//  const handlePasswordChange = (event) => setPassword(event.target.value);
//  const handleNameChange = (event) => setName(event.target.value);
//  const handleBirthDateChange = (event) => setBirthDate(event.target.value);
//  const handlePhoneNumChange = (event) => setPhoneNum(event.target.value);
//
//  //submit
//  const handleSubmit = (event) => {
//    event.preventDefault();
//    const data = { name, email };
//
//    // 서버의 특정 URL로 POST 요청 보내기
//    fetch('signUp', {
//      method: 'POST',
//      headers: {
//        'Content-Type': 'application/json',
//      },
//      body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 전송
//    })
//    .then(response => {
//      if (!response.ok) {
//        throw new Error('네트워크 응답이 올바르지 않습니다');
//      }
//      return response.json(); // JSON 형태로 응답 받기
//    })
//    .then(data => {
//      console.log('성공:', data); // 요청 성공 시 응답 데이터 처리
//    })
//    .catch(error => {
//      console.error('에러 발생:', error); // 요청 실패 시 에러 처리
//    });
//  };
  return (
    //입력값 id,password,name,birthDate,phoneNum 입력 받도록 수정
    React.createElement('div', { className: 'signup-container' },
      React.createElement('h2', null, '회원가입'),
      React.createElement('form', { className: 'signup-form' },

        React.createElement('label', null, 'ID: '),
        React.createElement('input', { type: 'text', name: 'id', value={formData.id}, required: true }),

        React.createElement('label', null, '비밀번호: '),
        React.createElement('input', { type: 'password', name: 'password', value={formData.password}, required: true }),

        React.createElement('label', null, '이름: '),
        React.createElement('input', { type: 'text', name: 'userName', value={formData.userName}, required: true }),

        React.createElement('label', null, '생년월일: '),
        React.createElement('input', { type: 'email', name: 'birthDate', value={formData.birthDate}, required: true }),

        React.createElement('label', null, '휴대폰 번호: '),
        React.createElement('input', { type: 'text', name: 'phoneNum', value={formData.phoneNum}, required: true }),

        React.createElement('button', { type: 'submit' }, '회원가입')
      )
    )
  );
}


// Header 컴포넌트 수정
function Header({ onLoginClick, onSignupClick, onMyPageClick, onHomeClick, onCommunityClick }) {
  return (
    React.createElement('header', { className: 'header' },
      React.createElement('div', { className: 'left-group' }, // 왼쪽 그룹 추가
        React.createElement('div', { className: 'logo', onClick: onHomeClick },
          React.createElement('img', { src: 'path_to_logo', alt: '어디갈래' })
        ),
        React.createElement('nav', { className: 'nav' },
          React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); onCommunityClick(); } }, '커뮤니티'),
          React.createElement('a', { href: '#mypage', onClick: onMyPageClick }, '마이페이지')
        )
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


// ContentCarousel 컴포넌트
function ContentCarousel({ title, items }) {
  // 스크롤 함수
  const scroll = (direction, container) => {
    const scrollAmount = 200; // 한 번에 스크롤할 픽셀 값

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
      if (container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollWidth; // 끝에 도달하면 다시 끝으로 이동
      }
    } else {
      container.scrollLeft += scrollAmount;
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0; // 끝에 도달하면 다시 처음으로 이동
      }
    }
  };

  // 렌더링
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
  const toggleLogin = () => { setPage('login'); };
  const toggleSignup = () => { setPage('signup'); };
  const toggleMyPage = () => { setPage('mypage'); };
  const toggleForm = () => { setPage('form'); };
  const toggleCommunity = () => { setPage('community'); };  // 커뮤니티 페이지 전환 함수

  const sections = [
    { title: '사용자 맞춤', items: Array.from({ length: 10 }, (_, i) => ({ title: `컨텐츠 ${i + 1}` })) },
    { title: '기념일 기념', items: Array.from({ length: 10 }, (_, i) => ({ title: `추천 ${i + 1}` })) },
    { title: '인기 장소', items: Array.from({ length: 10 }, (_, i) => ({ title: `드라마 ${i + 1}` })) },
    { title: '계절별', items: Array.from({ length: 10 }, (_, i) => ({ title: `애니 ${i + 1}` })) },
  ];

  return (
    React.createElement('div', { className: 'App' },
      React.createElement(Header, {
        onLoginClick: toggleLogin,
        onSignupClick: toggleSignup,
        onMyPageClick: toggleMyPage,
        onHomeClick: toggleHome,
        onCommunityClick: toggleCommunity // 커뮤니티 클릭 함수 전달
      }),
      page === 'login' ?
        React.createElement(Login, null) :
      page === 'signup' ?
        React.createElement(Signup, null) :
      page === 'mypage' ?
        React.createElement(MyPage, null) :
      page === 'form' ?
        React.createElement(MyForm, null) :
      page === 'community' ? // 커뮤니티 페이지 렌더링
        React.createElement(Community, null) :
        sections.map((section, index) =>
          React.createElement(ContentCarousel, { key: index, title: section.title, items: section.items })
        )
      // Show Form 버튼 제거됨
    )
  );
}


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

// Community 컴포넌트
function Community() {
  return (
    React.createElement('div', { className: 'community-container' },
      React.createElement('div', { className: 'sidebar' },
        React.createElement('div', { className: 'profile' },
          React.createElement('div', { className: 'profile-picture' }),
          React.createElement('p', null, 'User name')
        ),
        React.createElement('div', { className: 'profile-links' },
          React.createElement('p', null, '내가 쓴 글'),
          React.createElement('p', null, '댓글 단 글'),
          React.createElement('p', null, '내 스크랩')
        )
      ),
      React.createElement('div', { className: 'main-content' },
        // 광고 배너 부분을 삭제했습니다.
        React.createElement('div', { className: 'board-grid' },
          React.createElement('div', { className: 'board', id: 'free-board' }, '게시판'),
          React.createElement('div', { className: 'board', id: 'secret-board' }, '게시판'),
          React.createElement('div', { className: 'board', id: 'graduation-board' }, '게시판'),
          React.createElement('div', { className: 'board', id: 'new-board' }, '게시판'),
          React.createElement('div', { className: 'board', id: 'market-board' }, '게시판')
        )
      ),
      React.createElement('div', { className: 'right-sidebar' },
        React.createElement('div', { className: 'hot-posts' }, 'HOT 게시물'),
        React.createElement('div', { className: 'best-posts' }, 'BEST 게시판')
      )
    )
  );
}



// 렌더링
ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('root')
);
