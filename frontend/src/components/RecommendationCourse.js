import React, { useState } from 'react';
import '../styles/RecommendationCourse.css';
import { useNavigate } from 'react-router-dom';


function RecommendationCourse() {
  const [currentPage, setCurrentPage] = useState(1);

  //session ID 확인
  const id = sessionStorage.getItem("ID");

  //navigate
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    prefersActivity: false,
    favoriteCourse: '',
    transportation: '',
    startTime: '',
    budget: '',
    mustVisitCourses: '',
    mustVisitRegion: '',
  });

  // 지역 리스트
  const seoulRegions = [
    '종로', '강북', '의정부', '노원', '광화문', '이태원',
    '신촌', '홍대', '강남', '건대', '동작', '용산',
  ];

  // 페이지 이동 핸들러
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // 폼 데이터 업데이트
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 지역 선택 핸들러
  const handleRegionSelect = (region) => {
    setFormData((prev) => ({
      ...prev,
      preferredRegions: [...prev.preferredRegions, region],
    }));
    handleNext(); // 선택 후 다음 페이지로 이동
  };
  //선호도 조사 제출
    const submitResult () => async (event){
      event.preventDefault();
      
      try {
        const response = await fetch(`recommendationCourse/${id}`,{
          method: `POST`,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if(response.ok){
          window.alert('제출되었습니다!');       
        }
        else{
          window.alert('문제가 발생했습니다.잠시 후 다시 시도해주세요!');
        }
      } catch (error) {
        // 네트워크 오류 처리
        console.error('Error occurred:', error);
        window.alert('서버와 통신 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
  }

  // 페이지 렌더링 함수
  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return React.createElement(
          'div',
          { className: 'form-page regions-page' },
          React.createElement('h2', null, '지역을 선택하세요'),
          React.createElement(
            'div',
            { className: 'region-grid' },
            seoulRegions.map((region) =>
              React.createElement(
                'button',
                {
                  key: region,
                  className: 'region-button',
                  onClick: () => handleRegionSelect(region),
                },
                region
              )
            )
          )
        );
      case 2:
        return React.createElement(
          'div',
          { className: 'form-page' },
          React.createElement('h2', null, '선호도 조사 - 사용자 취향'),          
          React.createElement(
            'label',
            { className: 'inline-label' },
            '액티비티 선호 여부 (선호 시 클릭)',
            React.createElement(
              'div',
              { className: 'checkbox-wrapper' },
              React.createElement('span', null, '예:'),
              React.createElement('input', {
                type: 'checkbox',
                name: 'prefersActivity',
                checked: formData.prefersActivity,
                onChange: handleChange,
              })
            )
          ),
          React.createElement(
            'div',
            { className: 'form-page' },
            React.createElement('h2', null, '선호도 조사 - 지역 및 코스'),
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
          )
        );
      case 3:
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
        React.createElement('button', { className: 'prev-button', onClick: handleBack }, '뒤로'),
      currentPage < 3 && currentPage > 1 &&
        React.createElement(
          'button',
          { className: 'next-button', onClick: handleNext },
          '다음'
        ),
      currentPage === 3 &&
        React.createElement(
          'button',
          { className: 'commit-button', onClick: () => {
            // 제출 시 동작
              submitResult();
              console.log(formData)
            } 
          },
          '제출'
        )
    )
  );
}

export default RecommendationCourse;