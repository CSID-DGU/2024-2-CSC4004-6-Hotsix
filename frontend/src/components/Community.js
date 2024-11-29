// src/components/Community.js

import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트
import '../styles/Community.css';
import {useNavigate} from 'react-router-dom';

function Community() {
    const navigate = useNavigate();

  return (
    <div id="container" className="community">
      <div className="content-area">
        {/* left-side */}
        <div className="leftside">
          <div className="card">
            <form className="logged">
              <img src="#" className="picture" alt="User" />
              <p className="nickname">USER NAME</p>
              <ul className="buttons"></ul>
            </form>
          </div>
          <div className="card">
            <div className="menus">
              <Link to="/myarticle" className="myarticle">
                내가 쓴 글
              </Link>
              <Link to="/mycommentarticle" className="mycommentarticle">
                댓글 단 글
              </Link>
              <Link to="/myscrap" className="myscrap">
                내 스크랩
              </Link>
            </div>
          </div>
        </div>
        {/* mid */}
        <div className="main">
          {/* main-card */}
          <div className="card-container">
            <div className="card">
              <div className="board">
                <h3>
                  <Link to="/freeboard">자유게시판</Link>
                </h3>
                <div className="list" onClick={() => navigate('/freeboard')}>
                  <time>3분 전</time>
                  <p>XXXXXX</p>
                </div>
              </div>
            </div>
            {/* 다른 게시판들 */}
            <div className="card">
              <div className="board">
                <h3>
                  <Link to="/recommendboard">추천 게시판</Link>
                </h3>
                <Link className="list" to="#">
                  <time>2분 전</time>
                  <p>XXXXXX</p>
                </Link>
              </div>
            </div>
            <div className="card">
              <div className="board">
                <h3>
                  <Link to="/notice">공지사항</Link>
                </h3>
                <Link className="list" to="#">
                  <time>1분 전</time>
                  <p>XXXXXX</p>
                </Link>
              </div>
            </div>
            <div className="card">
              <div className="board">
                <h3>
                  <Link to="/event">이벤트</Link>
                </h3>
                <Link className="list" to="#">
                  <time>5분 전</time>
                  <p>XXXXXX</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* right-side */}
        <div className="rightside">
          <div className="card">
            <div className="board">
              <h3>
                <Link to="/popular">실시간 인기 글</Link>
              </h3>
              <Link className="article" to="#">
                <p className="title">XXX</p>
                <p className="small">XXXXXX</p>
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="board">
              <h3>
                <Link to="/hot">HOT 게시물</Link>
              </h3>
              <Link className="list" to="#">
                <time>10분 전</time>
                <p>XXXXXX</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
