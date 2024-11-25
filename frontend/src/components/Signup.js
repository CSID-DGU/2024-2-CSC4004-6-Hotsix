// src/components/Signup.js
import React from "react";
import '../styles/Signup.css';

function Signup() {
  return (
    React.createElement('div', { className: 'signup-container' },
      React.createElement('h2', null, '회원가입'),
      React.createElement('form', { className: 'signup-form' },
        React.createElement('label', null, 'Username:'),
        React.createElement('input', { type: 'text', name: 'username', required: true }),
        React.createElement('label', null, 'Email:'),
        React.createElement('input', { type: 'email', name: 'email', required: true }),
        React.createElement('label', null, 'Password:'),
        React.createElement('input', { type: 'password', name: 'password', required: true }),
        React.createElement('button', { type: 'submit' }, '회원가입')
      )
    )
  );
}
  
  export default Signup;
  