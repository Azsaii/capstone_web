import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import '../css/Login.css'; // Login 컴포넌트의 CSS 파일을 불러옵니다.
import SocialLoginKakao from './KakaoLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('userEmail', email);
      navigate('/');
      window.location.reload(); // 페이지를 새로고침합니다.
    } catch (error) {
      setError("아이디, 비밀번호를 잘못 입력하셨습니다.");
    }
  };

  return (
    <div className="logincontainer">
      <div className="form">
        <h2 className="center">로그인</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin} style={{ textAlign: 'center' }}>
          <div className="input-field">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ width: '290px', height: '30px', fontSize: '15px' }}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ width: '290px', height: '30px', fontSize: '15px' }}
            />
          </div>
          <button type="submit" class="login-button">로그인</button>
        </form>
        
      </div>
      <SocialLoginKakao />
    </div>
  );
  
};

export default Login;
