import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {swal} from "../components/common/errorModal";

const ADD_POST = "profile/ADD-POST";
const SET_PROFILE = "profile/SET_PROFILE";
const SET_STATUS = "profile/SET_STATUS";
const UPDATE_STATUS = "profile/UPDATE_STATUS";
const DELETE_POST = "profile/DELETE_POST";
const SET_PHOTO = "profile/SET_PHOTO";

let initialState = {
  PostsData: [
    {
      id: 1,
      text: "test1",
      likesCount: 23
    },
    {
      id: 2,
      text: "test2",
      likesCount: 11
    },
  ],
  profile: null,
  status: ''
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case(ADD_POST):
      return {
        ...state,
        PostsData: [
          ...state.PostsData,
          {
            id: state.PostsData.length + 1,
            text: action.value,
            likesCount: 0
          },
        ]
      };
    case(SET_PROFILE):
      return {
        ...state,
        profile: action.profile
      };
    case(SET_STATUS):
      return {
        ...state,
        status: action.status
      };
    case(UPDATE_STATUS):
      return {
        ...state,
        status: action.status
      };
    case(DELETE_POST):
      return {
        ...state,
        PostsData: state.PostsData.filter(p => p.id !== action.postId)
      };
    case(SET_PHOTO):
      return {
        ...state,
        profile: {...state.profile, photos: action.photos}
      };
    default:
      return state;
  }
}


export const addPost = value => ({type: ADD_POST, value});

export const deletePost = postId => ({type: DELETE_POST, postId});

export const setProfile = profile => ({type: SET_PROFILE, profile});

export const setStatus = status => ({type: SET_STATUS, status});

export const setPhoto = photos => ({type: SET_PHOTO, photos});

export const getProfileInfo = (userId) => async (dispatch) => {
  try {
    const response = await profileAPI.getProfileInfo(userId)
    dispatch(setProfile(response))
  } catch (error) {
    swal(error.message);
  }
}


export const getStatus = (userId) => async (dispatch) => {
  try {
    const response = await profileAPI.getUserStatus(userId)
    dispatch(setStatus(response))
  } catch (error) {
    swal(error.message);
  }
}

export const updateStatus = (status) => async (dispatch) => {
  try {
    const response = await profileAPI.updateUserStatus(status)
    if (response.resultCode === 0) {
      dispatch(setStatus(status))
    }
  } catch (error) {
    swal(error.message);
  }
}

export const savePhoto = (file) => async (dispatch) => {
  try {
    const response = await profileAPI.savePhoto(file)
    if (response.resultCode === 0) {
      dispatch(setPhoto(response.data.photos))
    }
  } catch (error) {
    swal(error.message);
  }
}

export const saveProfile = (data) => async (dispatch, getState) => {
  try {
    const userId = getState().Auth.userId;
    const response = await profileAPI.saveProfile(data)
    if (response.resultCode === 0) {
      dispatch(getProfileInfo(userId));
    } else {
      dispatch(stopSubmit("edit-profile", {_error: response.messages[0]}));
      return Promise.reject(response.messages[0]);
    }
  } catch (error) {
    swal(error.message);
  }
}
