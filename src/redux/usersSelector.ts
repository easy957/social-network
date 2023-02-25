import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

export const getUsers = (state: AppStateType) => state.usersPage.users;
export const getPageSize = (state: AppStateType) => state.usersPage.pageSize;
export const getTotalUsersCount = (state: AppStateType) => state.usersPage.totalUsersCount;
export const getCurrentPage = (state: AppStateType) => state.usersPage.currentPage;
export const getIsLoading = (state: AppStateType) => state.usersPage.isLoading;
export const getAreFetchingFollow = (state: AppStateType) => state.usersPage.areFetchingFollow;
export const getUsersFilter = (state: AppStateType) => state.usersPage.filter;

// Optimized selector with reselect lib.
export const getUsersReselectLib = createSelector(getUsers, getCurrentPage, (users, currentPage) => {
  if (true) {
    return users.filter((user) => true);
  } else {
    return users;
  }
});
