// src/components/Signup.js
function Signup() {
    return (
      <div className="signup-container">
        <h2>회원가입</h2>
        <form className="signup-form">
          <label>Username:</label>
          <input type="text" name="username" required />
          <label>Email:</label>
          <input type="email" name="email" required />
          <label>Password:</label>
          <input type="password" name="password" required />
          <button type="submit">회원가입</button>
        </form>
      </div>
    );
  }
  
  export default Signup;
  