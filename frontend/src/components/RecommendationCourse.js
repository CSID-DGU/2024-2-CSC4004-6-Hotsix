import React, { useState } from 'react';
import '../styles/RecommendationCourse.css';

function RecommendationCourse() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    mbti: '',
    prefersActivity: false,
    favoriteCourse: '',
    transportation: '',
    startTime: '',
    budget: '',
    preferredRegions: [],
    mustVisitCourses: [],
    mustVisitRegion: '',
  });

  // 페이지 이동 핸들러
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // 폼 데이터 업데이트
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 페이지 렌더링 함수
  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return React.createElement(
          'div',
          { className: 'form-page' },
          React.createElement('h2', null, '선호도 조사 - 사용자 취향'),
          React.createElement(
            'label',
            null,
            'MBTI:',
            React.createElement(
              'select',
              {
                name: 'mbti',
                value: formData.mbti,
                onChange: handleChange,
                className: 'dropdown',
              },
              React.createElement('option', { value: '' }, '선택하세요'),
              [
                'INFP',
                'INFJ',
                'INTP',
                'INTJ',
                'ENFP',
                'ENFJ',
                'ENTP',
                'ENTJ',
                'ISFP',
                'ISFJ',
                'ISTP',
                'ISTJ',
                'ESFP',
                'ESFJ',
                'ESTP',
                'ESTJ',
              ].map((type) =>
                React.createElement('option', { key: type, value: type }, type)
              )
            )
          ),
          React.createElement(
            'label',
            { className: 'inline-label' },
            '액티비티 선호 여부 (선호 시 클릭):',
            React.createElement(
              'div',
              { className: 'checkbox-wrapper' },
              React.createElement('input', {
                type: 'checkbox',
                name: 'prefersActivity',
                checked: formData.prefersActivity,
                onChange: handleChange,
              })
            )
          ),
          React.createElement(
            'label',
            null,
            '선호하는 데이트 코스:',
            React.createElement('input', {
              type: 'text',
              name: 'favoriteCourse',
              value: formData.favoriteCourse,
              onChange: handleChange,
              placeholder: '예: 카페, 레스토랑',
            })
          )
        );
      case 2:
        return React.createElement(
          'div',
          { className: 'form-page' },
          React.createElement('h2', null, '선호도 조사 - 기타 정보'),
          React.createElement(
            'label',
            null,
            '교통수단:',
            React.createElement(
              'select',
              {
                name: 'transportation',
                value: formData.transportation,
                onChange: handleChange,
              },
              React.createElement('option', { value: '' }, '선택하세요'),
              React.createElement('option', { value: '자가용' }, '자가용'),
              React.createElement('option', { value: '대중교통' }, '대중교통'),
              React.createElement('option', { value: '도보' }, '도보')
            )
          ),
          React.createElement(
            'label',
            null,
            '데이트 시작 시간:',
            React.createElement('input', {
              type: 'time',
              name: 'startTime',
              value: formData.startTime,
              onChange: handleChange,
            })
          ),
          React.createElement(
            'label',
            null,
            '당일 예산 (단위:만원):',
            React.createElement('input', {
              type: 'number',
              name: 'budget',
              value: formData.budget,
              onChange: handleChange,
              placeholder: '예: 5',
            })
          )
        );
      case 3:
        return React.createElement(
          'div',
          { className: 'form-page' },
          React.createElement('h2', null, '선호도 조사 - 지역 및 코스'),
          React.createElement(
            'label',
            null,
            '선호 지역:',
            React.createElement('input', {
              type: 'text',
              name: 'preferredRegions',
              value: formData.preferredRegions,
              onChange: (e) =>
                setFormData((prev) => ({
                  ...prev,
                  preferredRegions: e.target.value.split(','),
                })),
              placeholder: '예: 이태원, 신촌',
            })
          ),
          React.createElement(
            'label',
            null,
            '필수 코스:',
            React.createElement('input', {
              type: 'text',
              name: 'mustVisitCourses',
              value: formData.mustVisitCourses,
              onChange: (e) =>
                setFormData((prev) => ({
                  ...prev,
                  mustVisitCourses: e.target.value.split(','),
                })),
              placeholder: '예: 롯데월드, 한강공원',
            })
          ),
          React.createElement(
            'label',
            null,
            '필수 지역:',
            React.createElement('input', {
              type: 'text',
              name: 'mustVisitRegion',
              value: formData.mustVisitRegion,
              onChange: handleChange,
              placeholder: '예: 강남, 홍대',
            })
          )
        );
      default:
        return null;
    }
  };

  return React.createElement(
    'div',
    { className: 'survey-form' },
    renderPage(),
    React.createElement(
      'div',
      { className: 'navigation-buttons' },
      currentPage > 1 &&
        React.createElement('button', { onClick: handleBack }, '뒤로'),
      currentPage < 3 &&
        React.createElement(
          'button',
          { className: 'next-button', onClick: handleNext },
          '다음'
        ),
      currentPage === 3 &&
        React.createElement(
          'button',
          { onClick: () => console.log(formData) },
          '제출'
        )
    )
  );
}

export default RecommendationCourse;
