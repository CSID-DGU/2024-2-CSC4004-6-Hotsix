// import '../styles/Community.css';
import React from 'react';
import '../styles/Community.css';

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
          ),
          // mid
          React.createElement('div', { className: 'main' },
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

export default Community;
