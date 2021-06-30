import {profileAPI} from "../api/api";

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
        PostsData: state.PostsData.filter(p => p.id != action.postId)
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
  let response = await profileAPI.getProfileInfo(userId)
  dispatch(setProfile(response))
}


export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getUserStatus(userId)
  dispatch(setStatus(response))
}

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateUserStatus(status)
  if (response.resultCode === 0) {
    dispatch(setStatus(status))
  }
}

export const savePhoto = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file)
  if (response.resultCode === 0) {
    dispatch(setPhoto(response.data.photos))
  }
}
