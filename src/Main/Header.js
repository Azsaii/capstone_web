import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setUserEmail, setLoggedIn } from '../state';
import { useDispatch } from 'react-redux';
import '../css/App.css'
const logo = 'https://firebasestorage.googleapis.com/v0/b/capstone-ac206.appspot.com/o/%EC%9B%B9%ED%99%88%EB%9D%BC%EB%B2%A8.jpg?alt=media&token=63425a12-b57b-4035-aa33-f5b11a2f5067'

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const userEmail = useSelector((state) => state.userEmail);
    const navigate = useNavigate();

    useEffect(()=>{
      const localUserEmail = localStorage.getItem('userEmail');
      // 로컬스토리지에 로그인 정보 있으면 로그인 유지 처리
      if(localUserEmail != null){
        dispatch(setUserEmail(localUserEmail)); 
        dispatch(setLoggedIn(true));
      }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        dispatch(setUserEmail(null));
        dispatch(setLoggedIn(false));
        alert('로그아웃 되었습니다.');
        navigate("/");
    };

    return(
        <div className="header">
        <Link to="/"><img src={logo} alt="Logo" style={{ marginLeft: '1em' }} /></Link>
        <div className="right-align">
          {isLoggedIn ? (
            <>
              <span>{userEmail}님 환영합니다. </span>
              <button className="white-background-button" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="white-background-button">
                로그인
              </Link>
              <Link to="/createId" className="white-background-button">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    )
}
export default Header;