import { usersAPI } from "../api/api";
import { AppDispatchType } from "./redux-store";
import { UserType } from "./types";

const TOGGLE_FOLLOW = "TOGGLE-FOLLOW";
const SET_USERS = "SET-USERS";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const TOGGLE_IS_LOADING = "TOGGLE-IS-LOADING";
const IS_FETCHING_FOLLOW = "IS-FETCHING-FOLLOW";

type ToggleFollowActionType = {
  type: typeof TOGGLE_FOLLOW;
  id: number;
};
export const toggleFollow = (id: number): ToggleFollowActionType => ({
  type: TOGGLE_FOLLOW,
  id,
});

type ToggleIsFetchingFollowActionType = {
  type: typeof IS_FETCHING_FOLLOW;
  fetching: boolean;
  userId: number;
};
export const toggleIsFetchingFollow = (
  fetching: boolean,
  userId: number
): ToggleIsFetchingFollowActionType => ({
  type: IS_FETCHING_FOLLOW,
  fetching,
  userId,
});

type SetUsersActionType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
  type: SET_USERS,
  users,
});

type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalUsersCount: number;
};
export const setTotalUsersCount = (
  totalUsersCount: number
): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});

type SetCurrentPageActionCreator = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
export const setCurrentPage = (
  currentPage: number
): SetCurrentPageActionCreator => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type ToggleIsLoadingActionType = {
  type: typeof TOGGLE_IS_LOADING;
  isLoading: boolean;
};
export const toggleIsLoading = (
  isLoading: boolean
): ToggleIsLoadingActionType => ({
  type: TOGGLE_IS_LOADING,
  isLoading,
});

type InitialStateType = typeof initialState;
const initialState = {
  users: [] as Array<UserType>,
  pageSize: 20,
  totalUsersCount: 20,
  currentPage: 1,
  isLoading: false,
  areFetchingFollow: [] as Array<number>,
};

function usersReducer(state = initialState, action: any): InitialStateType {
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
  (dispatch: AppDispatchType) => {
    dispatch(toggleIsLoading(true));
    usersAPI.fetchUsers(pageNumber, pageSize).then((data) => {
      dispatch(setCurrentPage(pageNumber));
      dispatch(toggleIsLoading(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
    });
  };

export const toggleFollowThunk =
  (id: number, followed: boolean) => (dispatch: AppDispatchType) => {
    dispatch(toggleIsFetchingFollow(true, id));
    usersAPI.fetchToggleFollow(followed, id).then(() => {
      dispatch(toggleFollow(id));
      dispatch(toggleIsFetchingFollow(false, id));
    });
  };

export default usersReducer;
