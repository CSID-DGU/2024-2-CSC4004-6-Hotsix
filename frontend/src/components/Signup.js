// src/components/Signup.js
// import '../styles/Signup.css'; 
import React from 'react';
import '../styles/Signup.css';
import '../styles/Message.css';
// import SurveyForm from './SurveyForm';   
import { useNavigate } from 'react-router-dom';

function Signup() {

    //navigate 변수
    const navigate = useNavigate();

    const [page, setPage] = React.useState(null);

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
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // 입력 데이터 객체 생성
    const data = { id, password, userName, birthDate, phoneNum };
  
    try {
      // 서버로 POST 요청 보내기
      const response = await fetch('/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 전송
      });
  
      if (response.ok) {
        // 회원가입 성공
        window.alert('회원가입이 완료되었습니다!');
        navigate('/');// 메인 페이지로 이동
      } else {
        // 실패 응답 처리
        const errorData = await response.json();
        if (errorData.error === 'DuplicatedId') {
          window.alert('이미 존재하는 아이디입니다!');
          resetForm(); // 폼 초기화
        } else {
          window.alert('회원가입 중 문제가 발생했습니다.');
        }
      }
    } catch (error) {
      // 네트워크 오류 처리
      console.error('Error occurred:', error);
      window.alert('서버와 통신 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };


   return (

          React.createElement('div', { className: 'signup-container' },
              React.createElement('h2', null, '회원가입'),
              React.createElement('form', { className: 'signup-form', onSubmit: handleSubmit },
                  React.createElement('label', null, '아이디'),
                  React.createElement('input', {
                      type: 'text',
                      name: 'id',
                      value: id,
                      onChange: handleIdChange,
                      required: true
                  }),
                  React.createElement('div',{
                    class : 'idMessage'
                  },'6자 이상 16자 이하 입력'),
                  React.createElement('label', null, '비밀번호'),
                  React.createElement('input', {
                      type: 'password',
                      name: 'password',
                      value: password,
                      onChange: handlePasswordChange,
                      required: true
                  }),
                  React.createElement('div',{
                  class : 'pwdMessage'
                },'8자 이상 16자 이하의 영문,숫자,특수기호'),

                  React.createElement('label', null, '이름 '),
                  React.createElement('input', {
                      type: 'text',
                      name: 'userName',
                      value: userName,
                      onChange: handleUserNameChange,
                      required: true
                  }),

                  React.createElement('label', null, '생년월일 '),
                  React.createElement('input', {
                      type: 'date',
                      name: 'birthDate',
                      value: birthDate,
                      onChange: handleBirthDateChange,
                      required: true
                  }),

                  React.createElement('label', null, '휴대폰 번호 '),
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
  
  export default Signup;
  