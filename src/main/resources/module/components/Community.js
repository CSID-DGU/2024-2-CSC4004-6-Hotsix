import React from "react";

function Community() {
  return (
    <div id="container" className="community">
      <div className="content-area">
        <div className="leftside">
          <div className="card">
            <div className="menus">
              <a href="/myarticle" className="myarticle">내가 쓴 글</a>
              <a href="/mycommentarticle" className="mycommentarticle">댓글 단 글</a>
              <a href="/myscrap" className="myscrap">내 스크랩</a>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="card-container">
            <div className="card">
              <div className="board">
                <h3><a href="#">자유게시판</a></h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
