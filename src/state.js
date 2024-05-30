// redux 로그인 상태 관리 파일입니다.
import { createStore } from 'redux';

// 초기 상태 정의
const initialState = {
  isLoggedIn: false,
  userEmail: null,
  //serverPath: 'http://localhost:8080/',
  serverPath: 'http://52.79.56.22:8080/',
};

// 액션 타입 정의
const SET_LOGGED_IN = 'SET_LOGGED_IN';
const SET_USER_EMAIL = 'SET_USER_EMAIL';
const SET_SERVER_PATH = 'SET_SERVER_PATH';

// 액션 생성 함수 정의
export const setLoggedIn = (isLoggedIn) => ({
  type: SET_LOGGED_IN,
  isLoggedIn,
});
export const setUserEmail = (userEmail) => ({
  type: SET_USER_EMAIL,
  userEmail,
});
export const setServerPath = (serverPath) => ({
  type: SET_SERVER_PATH,
  serverPath,
});

// 리듀서 정의
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return { ...state, isLoggedIn: action.isLoggedIn };
    case SET_USER_EMAIL:
      return { ...state, userEmail: action.userEmail };
    case SET_SERVER_PATH:
      return { ...state, serverPath: action.serverPath };
    default:
      return state;
  }
};

// 스토어 생성
const store = createStore(reducer);

export default store;
