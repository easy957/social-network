import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/api";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { UserType } from "./types";

export const actions = {
  toggleFollow: (id: number) =>
    ({
      type: "users/TOGGLE_FOLLOW",
      id,
    } as const),

  toggleIsFetchingFollow: (fetching: boolean, userId: number) =>
    ({
      type: "users/IS_FETCHING_FOLLOW",
      fetching,
      userId,
    } as const),

  setUsers: (users: Array<UserType>) =>
    ({
      type: "users/SET_USERS",
      users,
    } as const),

  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: "users/SET_TOTAL_USERS_COUNT",
      totalUsersCount,
    } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: "users/SET_CURRENT_PAGE",
      currentPage,
    } as const),

  toggleIsLoading: (isLoading: boolean) =>
    ({
      type: "users/TOGGLE_IS_LOADING",
      isLoading,
    } as const),
};

type InitialStateType = typeof initialState;
const initialState = {
  users: [] as Array<UserType>,
  pageSize: 20,
  totalUsersCount: 20,
  currentPage: 1,
  isLoading: false,
  areFetchingFollow: [] as Array<number>,
};

type ActionsTypes = InferActionsTypes<typeof actions>;

function usersReducer(state = initialState, action: ActionsTypes): InitialStateType {
  switch (action.type) {
    case "users/TOGGLE_FOLLOW":
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

    case "users/IS_FETCHING_FOLLOW":
      return {
        ...state,
        areFetchingFollow: action.fetching
          ? [...state.areFetchingFollow, action.userId]
          : state.areFetchingFollow.filter((u) => u !== action.userId),
      };

    case "users/SET_USERS":
      return {
        ...state,
        users: action.users,
      };

    case "users/SET_TOTAL_USERS_COUNT": {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    }

    case "users/SET_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }

    case "users/TOGGLE_IS_LOADING": {
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

// THUNK

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>;

export const getUsersThunk =
  (pageNumber = 1, pageSize = 10): ThunkType =>
  (dispatch) => {
    dispatch(actions.toggleIsLoading(true));
    usersAPI.fetchUsers(pageNumber, pageSize).then((data) => {
      dispatch(actions.setCurrentPage(pageNumber));
      dispatch(actions.toggleIsLoading(false));
      dispatch(actions.setUsers(data.items));
      dispatch(actions.setTotalUsersCount(data.totalCount));
    });
  };

export const toggleFollowThunk =
  (id: number, followed: boolean): ThunkType =>
  (dispatch) => {
    dispatch(actions.toggleIsFetchingFollow(true, id));
    usersAPI.fetchToggleFollow(followed, id).then(() => {
      dispatch(actions.toggleFollow(id));
      dispatch(actions.toggleIsFetchingFollow(false, id));
    });
  };

export default usersReducer;
