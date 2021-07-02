import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {swal} from "../components/common/errorModal";

const SET_USER_DATA = "auth/SET_USER_DATA";
const IS_LOAD = "auth/IS_LOAD";
const SET_CAPTCHA = "auth/SET_CAPTCHA";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  preloader: false,
  captchaUrl: null
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
    case SET_CAPTCHA:
      return {
        ...state,
        captchaUrl: action.url
      }
    default:
      return state;
  }
}

export const setUserData = (data, isAuth) => ({type: SET_USER_DATA, data, isAuth});
export const setCaptcha = (url) => ({type: SET_CAPTCHA, url});
export const isLoad = (value) => ({type: IS_LOAD, value});

export const auth = () => async (dispatch) => {
  try {
    dispatch(isLoad(true));
    let response = await authAPI.auth();
    if (response.resultCode === 0) {
      dispatch(setUserData(response.data, true));
      dispatch(isLoad(false));
    }
  } catch (error) {
    swal(error.message);
  }
}


export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  try {
    dispatch(isLoad(true));
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === 0) {
      dispatch(auth());
      dispatch(isLoad(false));
    } else {
      if (response.resultCode === 10) {
        dispatch(getCaptchaUrl())
      }
      dispatch(stopSubmit("Login", {_error: response.messages[0]}));
    }
  } catch (error) {
    swal(error.message);
  }
}

export const getCaptchaUrl = () => async (dispatch) => {
  try {
    let response = await securityAPI.getCaptchaUrl();
    if (response.resultCode === 0) {
      dispatch(setCaptcha(response.url));
      debugger
    }
  } catch (error) {
    swal(error.message);
  }
}


export const logout = () => async (dispatch) => {
  try {
    dispatch(isLoad(true));
    let response = await authAPI.logout()
    if (response.resultCode === 0) {
      dispatch(setUserData({userId: null, email: null, login: null}, false));
      dispatch(isLoad(false));
    }
  } catch (error) {
    swal(error.message);
  }
}
