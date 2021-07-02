import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {swal} from "../components/common/errorModal";

const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET_USERS";
const SET_CURRENT_PAGE = "users/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "users/SET_TOTAL_USERS_COUNT";
const IS_LOAD = "users/IS_LOAD";
const IS_FOLLOWING = "users/IS_FOLLOWING";

let initialState = {
  UsersData: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  preloader: false,
  isFollowing: []
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        // UsersData: state.UsersData.map(user => {
        //   if (user.id === action.userId) {
        //     return {
        //       ...user,
        //       followed: true
        //     }
        //   }
        //   return user;
        // })
        UsersData: updateObjectInArray(state.UsersData, action.userId, "id", {followed: true})
      }
    case UNFOLLOW:
      return {
        ...state,
        // UsersData: state.UsersData.map(user => {
        //   if (user.id === action.userId) {
        //     return {
        //       ...user,
        //       followed: false
        //     }
        //   }
        //   return user;
        // })
        UsersData: updateObjectInArray(state.UsersData, action.userId, "id", {followed: false})
      }
    case SET_USERS:
      return {
        ...state,
        UsersData: [...action.users]
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      }
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount
      }
    case IS_LOAD:
      return {
        ...state,
        preloader: action.value
      }
    case IS_FOLLOWING:
      return {
        ...state,
        isFollowing: action.value ?
            [...state.isFollowing, action.userId] :
            state.isFollowing.filter(id => id !== action.userId)
      }
    default:
      return state;
  }
}
export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const isLoad = (value) => ({type: IS_LOAD, value});
export const setIsFollowing = (value, userId) => ({type: IS_FOLLOWING, value, userId});

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
  try {
    dispatch(isLoad(true));
    let response = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(isLoad(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
  } catch (error) {
    swal(error.message);
  }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  try {
    dispatch(setIsFollowing(true, userId));
    let response = await apiMethod(userId)
    if (response.resultCode === 0) {
      dispatch(actionCreator(userId))
    }
    dispatch(setIsFollowing(false, userId));
  } catch (error) {
    swal(error.message);
  }
}

export const unfollow = (userId) => async (dispatch) => {
  try {
    followUnfollowFlow(dispatch, userId,
        usersAPI.unFollow.bind(usersAPI), unfollowSuccess);
  } catch (error) {
    swal(error.message);
  }
}

export const follow = (userId) => async (dispatch) => {
  try {
    followUnfollowFlow(dispatch, userId,
        usersAPI.follow.bind(usersAPI), followSuccess);
  } catch (error) {
    swal(error.message);
  }

}
