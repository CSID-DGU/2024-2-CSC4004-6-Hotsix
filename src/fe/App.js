// Header 컴포넌트
function Header() {
  return (
    React.createElement('header', { className: 'header' },
      React.createElement('div', { className: 'logo' },
        React.createElement('img', { src: 'path_to_logo', alt: '어디갈래' })
      ),
      React.createElement('nav', { className: 'nav' },
        React.createElement('a', { href: '#community' }, '커뮤니티'),
        React.createElement('a', { href: '#mypage' }, '마이페이지')
      ),
      React.createElement('div', { className: 'auth' },
        React.createElement('button', null, '로그인'),
        React.createElement('button', { className: 'signup' }, '회원가입')
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
  const sections = [
    { title: '사용자 맞춤', items: Array.from({ length: 10 }, (_, i) => ({ title: `컨텐츠 ${i + 1}` })) },
    { title: '기념일 기념', items: Array.from({ length: 10 }, (_, i) => ({ title: `추천 ${i + 1}` })) },
    { title: '인기 장소', items: Array.from({ length: 10 }, (_, i) => ({ title: `드라마 ${i + 1}` })) },
    { title: '계절별', items: Array.from({ length: 10 }, (_, i) => ({ title: `애니 ${i + 1}` })) },
    { title: '11월에 방문할 만한', items: Array.from({ length: 10 }, (_, i) => ({ title: `다큐 ${i + 1}` })) }
  ];

  return (
    React.createElement('div', { className: 'App' },
      React.createElement(Header, null),
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

