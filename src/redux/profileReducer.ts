import { FormAction, stopSubmit } from "redux-form";
import { profileAPI, resultCodes } from "../api/api";
import { PhotosType, PostType, ProfileType } from "./types";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";

const initialState = {
  currentProfile: null as null | ProfileType,
  status: null as null | string,
  editMode: false as boolean,
  posts: [
    {
      id: 1,
      text: "No API for posts on this server :(",
      likesCount: 548,
    },
    {
      id: 2,
      text: "Hi, how are you?",
      likesCount: 43,
    },
    {
      id: 3,
      text: "It's my first post.",
      likesCount: 65,
    },
  ] as Array<PostType>,
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

function profileReducer(state = initialState, action: ActionsTypes): InitialStateType {
  switch (action.type) {
    case "ADD_POST":
      const newPost = {
        id: state.posts.length + 1,
        text: action.newPostText,
        likesCount: 0,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
      };

    case "DELETE_POST":
      return {
        ...state,
        posts: [...state.posts.filter((post) => post.id !== action.id)],
      };

    case "SET_CURRENT_PROFILE":
      return {
        ...state,
        currentProfile: action.profile,
      };

    case "SET_CURRENT_PROFILE_PHOTO":
      return {
        ...state,
        currentProfile: {
          ...state.currentProfile,
          photos: action.photos,
        } as ProfileType,
      };

    case "SET_STATUS":
      return {
        ...state,
        status: action.status,
      };

    case "SET_EDIT_MODE":
      return {
        ...state,
        editMode: action.editMode,
      };

    default:
      return state;
  }
}

// Action creators

export const actions = {
  addPost: (newPostText: string) =>
    ({
      type: "ADD_POST",
      newPostText,
    } as const),
  deletePost: (id: number) =>
    ({
      type: "DELETE_POST",
      id,
    } as const),

  setCurrentProfile: (profile: ProfileType) =>
    ({
      type: "SET_CURRENT_PROFILE",
      profile,
    } as const),

  setCurrentProfilePhoto: (photos: PhotosType) =>
    ({
      type: "SET_CURRENT_PROFILE_PHOTO",
      photos,
    } as const),

  setStatus: (status: string) =>
    ({
      type: "SET_STATUS",
      status,
    } as const),
  setEditMode: (editMode: boolean) =>
    ({
      type: "SET_EDIT_MODE",
      editMode,
    } as const),
};

// THUNK

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>;

export const getUserByIdThunk =
  (userId: number | null): ThunkType =>
  (dispatch) => {
    profileAPI.fetchProfile(userId).then((data) => {
      dispatch(actions.setCurrentProfile(data));
    });
  };

export const getStatusByIdThunk =
  (userId: number): ThunkType =>
  (dispatch) => {
    profileAPI.fetchStatus(userId).then((data) => {
      dispatch(actions.setStatus(data));
    });
  };

export const updateStatusThunk =
  (status: string): ThunkType =>
  (dispatch) => {
    profileAPI.updateStatus(status).then((data) => {
      if (data.resultCode === resultCodes.success) {
        dispatch(actions.setStatus(status));
      }
    });
  };

export const uploadPhotoThunk =
  (photo: any): ThunkType =>
  (dispatch) => {
    profileAPI.uploadPhoto(photo).then((data) => {
      if (data.resultCode === resultCodes.success) {
        dispatch(actions.setCurrentProfilePhoto(data.data.photos));
      }
    });
  };

//

export const updateProfileThunk =
  (profile: ProfileType): ThunkAction<void, AppStateType, unknown, ActionsTypes | FormAction> =>
  (dispatch, getState: () => AppStateType) => {
    profileAPI.updateProfile(profile).then((data) => {
      const userId = getState().auth.id;
      if (data.resultCode === 0) {
        dispatch(actions.setEditMode(false));
        dispatch(getUserByIdThunk(userId));
      } else {
        const message = data.messages.length > 0 ? data.messages[0] : "Something went wrong.";
        dispatch(stopSubmit("edit-profile", { _error: message }));
      }
    });
  };

export default profileReducer;
