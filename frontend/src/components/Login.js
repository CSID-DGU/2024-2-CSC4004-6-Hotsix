// src/components/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 

function Login() {

  const navigate = useNavigate();
  // 폼 리셋 함수 (비밀번호만 비우기로 수정)
  const resetForm = () => {
      // setId('');
      setPassword('');
  };

  //변수
  const [id, setId] = React.useState('');
  const [password, setPassword] = React.useState('');

  //handleChange
  const handleIdChange = (event) => setId(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  //handleSubmit
  const handleSubmit = async (event) => {
      event.preventDefault();
      // const data = { id,password };

      try {
          const response = await fetch('/login', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({id, password}),
          });
          // 응답 상태 확인
          if (!response.ok) {
              const errorData = await response.json();
              if (errorData.error === "ID does not exist" || errorData.error === "Invalid Password") {
                  window.alert("아이디 또는 비밀번호가 틀렸습니다.");
              } else {
                  console.error("Error:", errorData.error);
                  window.alert("Error: " + errorData.error);
              }
              resetForm();
              return;
          }
              // 성공 처리
              const responseData = await response.json();
              sessionStorage.setItem("token", responseData.token); // JWT 저장
              sessionStorage.setItem("ID",id);  //Id 저장
              
              if(responseData.isFirstLogin){
                  navigate('/survey');
              }
              else{
                navigate('/');
              }
            }
      catch(error) {
          console.error("Unexpected error:", error);
          window.alert("Unexpected error occurred. Please try again.");
      }
  }
return (
  React.createElement('div', { className: 'login-container',onSubmit: handleSubmit },
    React.createElement('h2', null, '로그인'),
    React.createElement('form', { className: 'login-form' },
        React.createElement('label', null, '아이디 '),
        React.createElement('input', {
            type: 'text',
            name: 'id',
            value: id,
            onChange: handleIdChange,
            required: true
        }),
        React.createElement('label', null, '비밀번호 '),
        React.createElement('input', {
            type: 'password',
            name: 'password',
            value: password,
            onChange: handlePasswordChange,
            required: true
        }),
      React.createElement('button', { type: 'submit' }, '로그인')
    )
  )
);
}
  
  export default Login;
  