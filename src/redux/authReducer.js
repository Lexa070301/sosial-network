import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA";
const IS_LOAD = "auth/IS_LOAD";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  preloader: false
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        userId: action.data.id,
        isAuth: action.isAuth
      }
    case IS_LOAD:
      return {
        ...state,
        preloader: action.value
      }
    default:
      return state;
  }
}

export const setUserData = (data, isAuth) => ({type: SET_USER_DATA, data, isAuth});
export const isLoad = (value) => ({type: IS_LOAD, value});

export const auth = () => async (dispatch) => {
  dispatch(isLoad(true));
  let response = await authAPI.auth();
  if (response.resultCode === 0) {
    dispatch(setUserData(response.data, true));
    dispatch(isLoad(false));
  }
}


export const login = (email, password, rememberMe) => async (dispatch) => {
  dispatch(isLoad(true));
  let response = await authAPI.login(email, password, rememberMe);
  if (response.resultCode === 0) {
    dispatch(auth());
    dispatch(isLoad(false));
  } else {
    dispatch(stopSubmit("Login", {_error: response.messages[0]}));
  }
}

export const logout = () => async (dispatch) => {
  dispatch(isLoad(true));
  let response = await authAPI.logout()
  if (response.resultCode === 0) {
    dispatch(setUserData({userId: null, email: null, login: null}, false));
    dispatch(isLoad(false));
  }
}
