import {createSelector} from "reselect";

const getUsers = (state) => {
  return state.UsersPage.UsersData;
}

export const getUsersFromState = createSelector(getUsers, (users) => {
  return users;
});

export const getPageSize = (state) => {
  return state.UsersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
  return state.UsersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
  return state.UsersPage.currentPage;
}

export const getPreloader = (state) => {
  return state.UsersPage.preloader;
}

export const getIsFollowing = (state) => {
  return state.UsersPage.isFollowing;
}
