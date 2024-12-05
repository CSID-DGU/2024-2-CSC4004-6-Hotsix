// src/components/RecommendationResult.js
import React from 'react';
import '../styles/RecommendationResult.css';
import { useNavigate } from 'react-router-dom';

function RecommendationResult() {
  const navigate = useNavigate();

  return React.createElement(
    'div',
    { className: 'recommendation-result' },
    React.createElement('h2', null, '추천 코스'),
    React.createElement('p', null, '여기에 추천된 코스를 표시할 수 있습니다.'),
    React.createElement(
      'button',
      {
        className: 'bingo-button',
        onClick: () => navigate('/bingo'),
      },
      '빙고게임'
    )
  );
}

export default RecommendationResult;