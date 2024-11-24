// src/components/Login.js
import React from 'react';
import '../styles/Login.css'; 

function Login() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      fetch('https://your-server-url.com/api/saveData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      .then(response => response.json())
      .then(data => console.log('성공:', data))
      .catch(error => console.error('에러 발생:', error));
    };
  
    return (
      <div className="login-container">
        <h2>로그인</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={name} onChange={(e) => setName(e.target.value)} required />
          <label>Password:</label>
          <input type="password" name="password" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit">로그인</button>
        </form>
      </div>
    );
  }
  
  export default Login;
  