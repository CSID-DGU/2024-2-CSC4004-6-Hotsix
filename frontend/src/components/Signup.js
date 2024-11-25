// src/components/Signup.js
// import '../styles/Signup.css'; 
import React from 'react';
import '../styles/Signup.css';

function Signup() {
    
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
  const handleSubmit = (event) => {
  event.preventDefault();
  const data = { id,password,userName,birthDate,phoneNum };

  // 서버의 특정 URL로 POST 요청 보내기
  fetch('/signUp', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 전송
      })
    .then(response => {
        if (response.ok) {
            window.alert("회원가입이 완료되었습니다!");
            window.location.href = '/'; //가입 성공 응답시 메인 페이지로 이동
        }
//          else if(err.response.data("body : DuplicatedId")) {
//             window.alert("이미 존재하는 아이디입니다!");
//             // 가입 실패 시 현재 페이지 새로고침
//             resetForm();
//          }
    })
    .catch((error) => {
      if (error.response){
          window.alert("이미 존재하는 아이디입니다!");
          // 가입 실패 시 현재 페이지 새로고침
          resetForm();
      }
      console.error('에러 발생:', error);
    });
}

   return (

          React.createElement('div', { className: 'signup-container' },
              React.createElement('h2', null, '회원가입'),
              React.createElement('form', { className: 'signup-form', onSubmit: handleSubmit },
                  React.createElement('label', null, 'ID: '),
                  React.createElement('input', {
                      type: 'text',
                      name: 'id',
                      value: id,
                      onChange: handleIdChange,
                      required: true
                  }),

                  React.createElement('label', null, '비밀번호: '),
                  React.createElement('input', {
                      type: 'password',
                      name: 'password',
                      value: password,
                      onChange: handlePasswordChange,
                      required: true
                  }),

                  React.createElement('label', null, '이름: '),
                  React.createElement('input', {
                      type: 'text',
                      name: 'userName',
                      value: userName,
                      onChange: handleUserNameChange,
                      required: true
                  }),

                  React.createElement('label', null, '생년월일: '),
                  React.createElement('input', {
                      type: 'date',
                      name: 'birthDate',
                      value: birthDate,
                      onChange: handleBirthDateChange,
                      required: true
                  }),

                  React.createElement('label', null, '휴대폰 번호: '),
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
  