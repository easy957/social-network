import { createSelector } from "reselect";

export const getUsers = (state) => state.usersPage.users;
export const getPageSize = (state) => state.usersPage.pageSize;
export const getTotalUsersCount = (state) => state.usersPage.totalUsersCount;
export const getCurrentPage = (state) => state.usersPage.currentPage;
export const getIsLoading = (state) => state.usersPage.isLoading;
export const getAreFetchingFollow = (state) =>
  state.usersPage.areFetchingFollow;

// Optimized selector with reselect lib.
export const getUsersReselectLib = createSelector(
  getUsers,
  getCurrentPage,
  (users, currentPage) => {
    if (true) {
      return users.filter((user) => true);
    } else {
      return currentPage;
    }
  }
);
