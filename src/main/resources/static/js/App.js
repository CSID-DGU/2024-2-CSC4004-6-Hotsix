<<<<<<< HEAD
// Login 컴포넌트
function Login() {

    // 폼 리셋 함수
    const resetForm = () => {
        setId('');
        setPassword('');
    };

    //변수
    const [id, setId] = React.useState('');
    const [password, setPassword] = React.useState('');

    //handleChange
    const handleIdChange = (event) => setId(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    //handleSubmit
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { id,password};

    // 서버의 특정 URL로 POST 요청 보내기
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 전송
    })
    .then(response => {
      if (!response.ok) {
          //아이디 또는 비밀번호 오류
          if(error.response.data === "ID does not exist" || error.response.data === "Invalid Password"){
              window.alert("아이디 또는 비밀번호가 틀렸습니다.");
              resetForm();
          }
          else {
              //바인딩 오류
              window.alert("Error");
              window.location.href = '/';
          }
      }
      //로그인 성공 시
      else {
          window.location.href = '/';
          //여기다가 로그인 성공 시 메인 화면 구현하시면 됩니다.

      }
    })
  };

  return (
    React.createElement('div', { className: 'login-container' },
      React.createElement('h2', null, '로그인'),
      React.createElement('form', { className: 'login-form' },
          React.createElement('label', null, 'ID: '),
          React.createElement('input', {
              type: 'text',
              name: 'id',
              // value: id,
              onChange: handleIdChange,
              required: true
          }),
          React.createElement('label', null, '비밀번호: '),
          React.createElement('input', {
              type: 'password',
              name: 'password',
              // value: password,
              onChange: handlePasswordChange,
              required: true
          }),
        React.createElement('button', { type: 'submit' }, '로그인')
      )
    )
  );
}

// Signup 컴포넌트
function Signup() {


    // 폼 리셋 함수
        const resetForm = () => {
            setId('');
            setPassword('');
            setUserName('');
            setBirthDate('');
            setPhoneNum('');
        };

    //변수
    const [id, setId] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [birthDate, setBirthDate] = React.useState('');
    const [phoneNum, setPhoneNum] = React.useState('');
//  const [email, setEmail] = React.useState('');

    //handleChange
    const handleIdChange = (event) => setId(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleUserNameChange = (event) => setUserName(event.target.value);
    const handleBirthDateChange = (event) => setBirthDate(event.target.value);
    const handlePhoneNumChange = (event) => setPhoneNum(event.target.value);
//  const handleEmailChange = (event) => setEmail(event.target.value);

    //handleSubmit
    const handleSubmit = (event) => {
    event.preventDefault();
    const data = { id,password,userName,birthDate,phoneNum };

    // 서버의 특정 URL로 POST 요청 보내기
    fetch('/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 전송
        })
      .then(response => {
          if (response.ok) {
              window.alert("회원가입이 완료되었습니다!");
              window.location.href = '/'; //가입 성공 응답시 메인 페이지로 이동
          }
          else {
             window.alert("이미 존재하는 아이디입니다!");
             // 가입 실패 시 현재 페이지 새로고침
             // resetForm();
          }
      })
      .catch(error => {
          console.error('에러 발생:', error);
      });
}

     return (

            React.createElement('div', { className: 'signup-container' },
                React.createElement('h2', null, '회원가입'),
                React.createElement('form', { className: 'signup-form', onSubmit: handleSubmit },
                    React.createElement('label', null, 'ID: '),
                    React.createElement('input', {
                        type: 'text',
                        name: 'id',
                        value: id,
                        onChange: handleIdChange,
                        required: true
                    }),

                    React.createElement('label', null, '비밀번호: '),
                    React.createElement('input', {
                        type: 'password',
                        name: 'password',
                        value: password,
                        onChange: handlePasswordChange,
                        required: true
                    }),

                    React.createElement('label', null, '이름: '),
                    React.createElement('input', {
                        type: 'text',
                        name: 'userName',
                        value: userName,
                        onChange: handleUserNameChange,
                        required: true
                    }),

                    React.createElement('label', null, '생년월일: '),
                    React.createElement('input', {
                        type: 'date',
                        name: 'birthDate',
                        value: birthDate,
                        onChange: handleBirthDateChange,
                        required: true
                    }),

                    React.createElement('label', null, '휴대폰 번호: '),
                    React.createElement('input', {
                        type: 'text',
                        name: 'phoneNum',
                        value: phoneNum,
                        onChange: handlePhoneNumChange,
                        required: true
                    }),

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



// 렌더링
ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('root')
);
=======
// Header 컴포넌트 수정
function Header({ onHomeClick, onCommunityClick, onMyPageClick, onLoginClick, onSignupClick }) {
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
          React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); onCommunityClick(); } }, '커뮤니티')
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
        onCommunityClick: toggleCommunity
      }),
      page === 'login' ? 
        React.createElement(Login, { onLogin: handleLogin }) : // 로그인 시 handleLogin 호출
      page === 'signup' ? 
        React.createElement(Signup, null) :
      page === 'mypage' ? 
        React.createElement(MyPage, null) :
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
>>>>>>> 1ec6c5ba5660f91403c0c3c4d591b400fdf61a8e
