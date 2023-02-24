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

  setCurrentPage: (currentPage = 1) =>
    ({
      type: "users/SET_CURRENT_PAGE",
      currentPage,
    } as const),

  toggleIsLoading: (isLoading: boolean) =>
    ({
      type: "users/TOGGLE_IS_LOADING",
      isLoading,
    } as const),
  setFilter: (payload: UsersFilterType) =>
    ({
      type: "users/SET_FILTER",
      payload,
    } as const),
};

export type InitialStateType = typeof initialState;
export type UsersFilterType = typeof initialState.filter;
const initialState = {
  users: [] as Array<UserType>,
  pageSize: 20,
  totalUsersCount: 20,
  currentPage: 1,
  isLoading: false,
  areFetchingFollow: [] as Array<number>,
  filter: {
    term: "",
    friend: null as null | boolean,
  },
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
      };
    }

    case "users/SET_FILTER": {
      return {
        ...state,
        filter: action.payload,
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
  (pageNumber: number, pageSize: number, filter: UsersFilterType): ThunkType =>
  (dispatch) => {
    dispatch(actions.toggleIsLoading(true));
    dispatch(actions.setFilter(filter));
    usersAPI.fetchUsers(pageNumber, pageSize, filter).then((data) => {
      dispatch(actions.setCurrentPage(pageNumber));
      dispatch(actions.toggleIsLoading(false));
      dispatch(actions.setUsers(data.items));
      dispatch(actions.setTotalUsersCount(data.totalCount));
    });
  };

export const toggleFollowThunk =
  (id: number, followed: boolean): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleIsFetchingFollow(true, id));
    await usersAPI.fetchToggleFollow(followed, id);
    dispatch(actions.toggleFollow(id));
    dispatch(actions.toggleIsFetchingFollow(false, id));
  };

export default usersReducer;
