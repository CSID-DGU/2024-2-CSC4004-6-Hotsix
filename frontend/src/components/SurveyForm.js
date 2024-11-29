// src/components/SurveyForm.js
// import '../styles/SurveyForm.css'; 
import React from 'react';
import '../styles/SurveyForm.css';

function SurveyForm() {
  const [formData, setFormData] = React.useState({
   mbti: '',
   meetingFrequency: '',
   budgetRange: '',
   relationshipDate: '',
   activityPreference: '',
   mustVisitCourse: '',
   preferredCourse: '',
   transportation: '',
   startTime: '',
   mustVisitArea: '',
   preferredArea: '',
  });
  
  const handleChange = (event) => {
   const { name, value } = event.target;
   setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (event) => {
   event.preventDefault();
   console.log('Survey Data:', formData);
   // 서버에 POST 요청 예제
   fetch('/RecommandDateCourse', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData),
   })
     .then((response) => response.json())
     .then((data) => console.log('성공:', data))
     .catch((error) => console.error('에러:', error));
  };
  
  return React.createElement(
    'div',
    { className: 'survey-container' },
    React.createElement(
      'form',
      { className: 'survey-form'
     , onSubmit: handleSubmit
      },
      // MBTI 입력
      React.createElement('label', null, '1. MBTI'),
      React.createElement('input', {
        type: 'text',
        name: 'mbti',
       value: formData.mbti,
       onChange: handleChange,
        placeholder: '예: ENFP',
        required: true,
      }),
  
      // 주당 만남 횟수
      React.createElement('label', null, '2. 주당 만남 횟수'),
      React.createElement('input', {
        type: 'number',
        name: 'meetingFrequency',
       value: formData.meetingFrequency,
       onChange: handleChange,
        placeholder: '숫자 입력',
        required: true,
      }),
  
      // 평균 예산 범위
      React.createElement('label', null, '3. 평균 예산 범위'),
      React.createElement('input', {
        type: 'text',
        name: 'budgetRange',
       value: formData.budgetRange,
       onChange: handleChange,
        placeholder: '예: 10만원~20만원',
        required: true,
      }),
  
      // 사귄 날짜
      React.createElement('label', null, '4. 사귄 날짜'),
      React.createElement('input', {
        type: 'date',
        name: 'relationshipDate',
       value: formData.relationshipDate,
       onChange: handleChange,
        required: true,
      }),
  
      // 액티비티 선호 유무
      React.createElement('label', null, '5. 액티비티 선호 유무'),
      React.createElement(
        'select',
        {
          name: 'activityPreference',
         value: formData.activityPreference,
         onChange: handleChange,
          required: true,
        },
        React.createElement('option', { value: '' }, '선택하세요'),
        React.createElement('option', { value: 'yes' }, '예'),
        React.createElement('option', { value: 'no' }, '아니요')
      ),
  
      // 필수 코스
      React.createElement('label', null, '6. 필수 코스'),
      React.createElement('textarea', {
        name: 'mustVisitCourse',
       value: formData.mustVisitCourse,
       onChange: handleChange,
        placeholder: '예: 롯데월드, 한강공원',
        rows: 3,
        required: true,
      }),
  
      // 선호 코스
      React.createElement('label', null, '7. 선호 코스'),
      React.createElement('textarea', {
        name: 'preferredCourse',
       value: formData.preferredCourse,
       onChange: handleChange,
        placeholder: '예: 카페, 레스토랑',
        rows: 3,
        required: true,
      }),
  
      // 교통 수단
      React.createElement('label', null, '8. 교통 수단'),
      React.createElement(
        'select',
        {
          name: 'transportation',
         value: formData.transportation,
         onChange: handleChange,
          required: true,
        },
        React.createElement('option', { value: '' }, '선택하세요'),
        React.createElement('option', { value: 'car' }, '자동차'),
        React.createElement('option', { value: 'public' }, '대중교통'),
        React.createElement('option', { value: 'walk' }, '도보')
      ),
  
      // 데이트 시작 예정 시간
      React.createElement('label', null, '9. 데이트 시작 예정 시간'),
      React.createElement('input', {
        type: 'time',
        name: 'startTime',
       value: formData.startTime,
       onChange: handleChange,
        required: true,
      }),
  
      // 필수 지역
      React.createElement('label', null, '10. 필수 지역'),
      React.createElement('textarea', {
        name: 'mustVisitArea',
       value: formData.mustVisitArea,
       onChange: handleChange,
        placeholder: '예: 강남, 홍대',
        rows: 2,
        required: true,
      }),
  
      // 선호 지역
      React.createElement('label', null, '11. 선호 지역'),
      React.createElement('textarea', {
        name: 'preferredArea',
       value: formData.preferredArea,
       onChange: handleChange,
        placeholder: '예: 이태원, 신촌',
        rows: 2,
        required: true,
      }),
  
      // 저장 버튼
      React.createElement(
        'button',
        { type: 'submit' },
        '저장'
      )
    )
  );
  }
  
  export default SurveyForm;
  