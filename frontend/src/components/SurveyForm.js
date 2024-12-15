// src/components/SurveyForm.js
// import '../styles/SurveyForm.css'; 
import React from 'react';
import '../styles/SurveyForm.css';
import { useNavigate } from 'react-router-dom';

function SurveyForm() {


    //변수
    const [mbti, setMbti] = React.useState('INFP'); //기본값
    const [meetingFrequency, setMeetingFrequency] = React.useState('');
    const [expectedBudgetRange, setExpectedBudgetRange] = React.useState('');
        const [minBudget, setMinBudget] = React.useState('');
        const [maxBudget, setMaxBudget] = React.useState('');
    const [relationshipDate, setRelationshipDate] = React.useState('');
    const [activityPreference, setActivityPreference] = React.useState('');
    const [preferredCourse,setPreferredCourse] = React.useState('');
    const [transportation, setTransportation] = React.useState('');
    const [preferredArea, setPreferredArea] = React.useState('');
    //session ID 확인
    const id = sessionStorage.getItem("ID");
    //navigate
    const navigate = useNavigate();

  //handleChange
    const handleMbtiChange = (event) => setMbti(event.target.value);
    const handleMeetingFrequencyChange = (event) => {
      const value = parseInt(event.target.value, 10);
      setMeetingFrequency(value || 0);
    }
    const handleExpectedBudgetRangeChange = (event) => setExpectedBudgetRange(`${minBudget} ~ ${maxBudget}(만원)`);
    const handleRelationshipDateChange = (event) => setRelationshipDate(event.target.value);
    const handleActivityPreferenceChange = (event) => setActivityPreference(event.target.value);
    const handlePreferredCourseChange = (event) => setPreferredCourse(event.target.value);
    const handleTransportationChange = (event) => setTransportation(event.target.value);
    const handlePreferredAreaChange = (event) => setPreferredArea(event.target.value);

    //예산 최소,최대
        const handleMinBudgetChange = (e) => {
            setMinBudget(e.target.value);
            handleExpectedBudgetRangeChange();
        };

        const handleMaxBudgetChange = (e) => {
            setMaxBudget(e.target.value);
            handleExpectedBudgetRangeChange();
        };



  const handleSubmit = async (event) => {
   event.preventDefault();

   if (!id) {
    window.alert("사용자 ID가 설정되지 않았습니다.");
    return;
  }

 // FormData 객체 생성
  const formData = new FormData();
  formData.append('mbti',mbti);
  formData.append('meetingFrequency',meetingFrequency);
  formData.append('expectedBudgetRange',expectedBudgetRange);
  formData.append('relationshipDate',relationshipDate);
  formData.append('activityPreference',activityPreference);
  formData.append('preferredCourse',preferredCourse);
  formData.append('transportation',transportation);
  formData.append('preferredArea',preferredArea);


const formData1 = {
    mbti,
    meetingFrequency,
    expectedBudgetRange,
    relationshipDate,
    activityPreference,
    preferredCourse,
    transportation,
    preferredArea,
};
//   console.log('Survey Data:', formData);


    try{
      const response = await fetch(`/survey/${id}`,{
        method: `POST`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData1),
      })
      if(response.ok){
        window.alert('제출되었습니다!');
        navigate('/');// 메인 페이지로 이동
      }
      else{
        window.alert('문제가 발생했습니다.잠시 후 다시 시도해주세요!');
      }
    }
    catch(error){
      // 네트워크 오류 처리
      console.error('Error occurred:', error);
      window.alert('서버와 통신 중 문제가 발생했습니다. 다시 시도해주세요.');
    }

  }

  return React.createElement(
    'div',
    { className: 'survey-container' },
    React.createElement(
      'form',{ className: 'survey-form', onSubmit: handleSubmit},
      // // MBTI 입력
      // React.createElement('label', null, '1. MBTI'),
      // React.createElement('input', {
      //   type: 'text',
      //   name: 'mbti',
      //  value: formData.mbti,
      //  onChange: handleChange,
      //   placeholder: '예: ENFP',
      //   required: true,
      // }),
      
      // MBTI 선택
      React.createElement('label', null, '1. MBTI 선택'),
      React.createElement(
        'select',
        {
          name: 'mbti',
          value: mbti,
          onChange: handleMbtiChange,
          placeholder: '예: ENFP',
          required: true,
        },
        
        React.createElement('option', { value: '' }, '선택하세요'),
        React.createElement('option', { value: 'INFP' }, 'INFP'),
        React.createElement('option', { value: 'INFJ' }, 'INFJ'),
        React.createElement('option', { value: 'INTP' }, 'INTP'),
        React.createElement('option', { value: 'INTJ' }, 'INTJ'),
        React.createElement('option', { value: 'ENFP' }, 'ENFP'),
        React.createElement('option', { value: 'ENFJ' }, 'ENFJ'),
        React.createElement('option', { value: 'ENTP' }, 'ENTP'),
        React.createElement('option', { value: 'ENTJ' }, 'ENTJ'),
        React.createElement('option', { value: 'ISFP' }, 'ISFP'),
        React.createElement('option', { value: 'ISFJ' }, 'ISFJ'),
        React.createElement('option', { value: 'ISTP' }, 'ISTP'),
        React.createElement('option', { value: 'ISTJ' }, 'ISTJ'),
        React.createElement('option', { value: 'ESFP' }, 'ESFP'),
        React.createElement('option', { value: 'ESFJ' }, 'ESFJ'),
        React.createElement('option', { value: 'ESTP' }, 'ESTP'),
        React.createElement('option', { value: 'ESTJ' }, 'ESTJ')
      ),

  
      // 주당 만남 횟수
      React.createElement('label', null, '2. 주당 만남 횟수 (0 ~ 7)'),
      React.createElement('input', {
        type: 'number',
        name: 'meetingFrequency',
       value: meetingFrequency,
       onChange: handleMeetingFrequencyChange,
        placeholder: '숫자 입력',
        required: true,
      }),
  
      React.createElement(
        'div',
        { className: 'budget-range' },
        React.createElement('label', null, '3. 평균 예산 범위 (단위: 만원)'),
        React.createElement(
          'div',
          { className: 'budget-inputs' },
          React.createElement('input', {
            type: 'number',
            name: 'minBudget',
            value: minBudget || '',
            onChange: handleMinBudgetChange,
            placeholder: '최소 예산',
            required: true,
          }),
          React.createElement('span', { className: 'separator' }, ' ~ '),
          React.createElement('input', {
            type: 'number',
            name: 'maxBudget',
            value: maxBudget || '',
            onChange: handleMaxBudgetChange,
            placeholder: '최대 예산',
            required: true,
          })
        )
      ),
      
  
      // 사귄 날짜
      React.createElement('label', null, '4. 사귄 날짜'),
      React.createElement('input', {
        type: 'date',
        name: 'relationshipDate',
       value: relationshipDate,
       onChange: handleRelationshipDateChange,
        required: true,
      }),
  
      // 선호 코스
      React.createElement('label', null, '6. 선호 코스'),
      React.createElement('textarea', {
        name: 'preferredCourse',
       value: preferredCourse,
       onChange: handlePreferredCourseChange,
        placeholder: '예: 카페, 레스토랑',
        rows: 3,
        required: true,
      }),
  
      // 교통 수단
      React.createElement('label', null, '7. 교통 수단'),
      React.createElement(
        'select',
        {
          name: 'transportation',
         value: transportation,
         onChange: handleTransportationChange,
          required: true,
        },
        React.createElement('option', { value: '' }, '선택하세요'),
        React.createElement('option', { value: '자차' }, '자차'),
        React.createElement('option', { value: '대중교통' }, '대중교통'),
        React.createElement('option', { value: '도보' }, '도보')
      ),

  
      // 선호 지역
      React.createElement('label', null, '8. 선호 지역'),
      React.createElement('textarea', {
        name: 'preferredArea',
       value: preferredArea,
       onChange: handlePreferredAreaChange,
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
  