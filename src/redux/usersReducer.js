import { usersAPI } from "../api/api";

const TOGGLE_FOLLOW = "TOGGLE-FOLLOW";
const SET_USERS = "SET-USERS";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const TOGGLE_IS_LOADING = "TOGGLE-IS-LOADING";
const IS_FETCHING_FOLLOW = "IS-FETCHING-FOLLOW";

export const toggleFollow = (id) => ({ type: TOGGLE_FOLLOW, id });
export const toggleIsFetchingFollow = (fetching, userId) => ({
  type: IS_FETCHING_FOLLOW,
  fetching,
  userId,
});

export const setUsers = (users) => ({
  type: SET_USERS,
  users,
});

export const setTotalUsersCount = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

export const toggleIsLoading = (isLoading) => ({
  type: TOGGLE_IS_LOADING,
  isLoading,
});

const initialState = {
  users: [],
  pageSize: 20,
  totalUsersCount: 20,
  currentPage: 1,
  isLoading: false,
  areFetchingFollow: [],
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.id) {
            return {
              ...u,
              followed: !u.followed,
            };
          }
          return u;
        }),
      };

    case IS_FETCHING_FOLLOW:
      return {
        ...state,
        areFetchingFollow: action.fetching
          ? [...state.areFetchingFollow, action.userId]
          : state.areFetchingFollow.filter((u) => u !== action.userId),
      };

    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };

    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    }

    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }

    case TOGGLE_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
        // isLoading: true,
      };
    }

    default:
      return state;
  }
}

export const getUsersThunk =
  (pageNumber = 1, pageSize = 10) =>
  (dispatch) => {
    dispatch(toggleIsLoading(true));
    usersAPI.fetchUsers(pageNumber, pageSize).then((data) => {
      dispatch(setCurrentPage(pageNumber));
      dispatch(toggleIsLoading(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
    });
  };

export const toggleFollowThunk = (id, followed) => (dispatch) => {
  dispatch(toggleIsFetchingFollow(true, id));
  usersAPI.fetchToggleFollow(id, followed).then(() => {
    dispatch(toggleFollow(id));
    dispatch(toggleIsFetchingFollow(false, id));
  });
};

export default usersReducer;
