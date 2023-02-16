import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE-POST";
const SET_CURRENT_PROFILE = "SET-CURRENT-PROFILE";
const SET_CURRENT_PROFILE_PHOTO = "SET-CURRENT-PROFILE-PHOTO";
const SET_STATUS = "SET-STATUS";
const SET_EDIT_MODE = "SET-EDIT-MODE";

type AddPostActionType = {
  type: typeof ADD_POST;
  newPostText: string;
};
type DeletePostActionType = {
  type: typeof DELETE_POST;
  id: number;
};
type SetCurrentProfileActionType = {
  type: typeof SET_CURRENT_PROFILE;
  profile: ProfileType;
};
type SetCurrentProfilePhotoActionType = {
  type: typeof SET_CURRENT_PROFILE_PHOTO;
  photos: PhotosType;
};
type SetStatusPostActionType = {
  type: typeof SET_STATUS;
  status: string;
};
type SetEditModeActionType = {
  type: typeof SET_EDIT_MODE;
  editMode: boolean;
};

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
type ProfileType = {
  aboutMe: null | string;
  contacts: {
    facebook: null | string;
    website: null | string;
    vk: null | string;
    twitter: null | string;
    instagram: null | string;
    youtube: null | string;
    github: null | string;
    mainLink: null | string;
  };
  lookingForAJob: boolean;
  lookingForAJobDescription: null | string;
  fullName: string;
  userId: number;
  photos: PhotosType;
};
type PhotosType = {
  small: null | string;
  large: null | string;
};
type PostType = {
  id: number;
  text: string;
  likesCount: number;
};

function profileReducer(state = initialState, action: any): InitialStateType {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.posts.length + 1,
        text: action.newPostText,
        likesCount: 0,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
      };

    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts.filter((post) => post.id !== action.id)],
      };

    case SET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: action.profile,
      };

    case SET_CURRENT_PROFILE_PHOTO:
      return {
        ...state,
        currentProfile: {
          ...state.currentProfile,
          photos: action.photos,
        } as ProfileType,
      };

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };

    case SET_EDIT_MODE:
      return {
        ...state,
        editMode: action.editMode,
      };

    default:
      return state;
  }
}

// Action creators

export const addPost = (newPostText: string): AddPostActionType => ({
  type: ADD_POST,
  newPostText,
});
export const deletePost = (id: number): DeletePostActionType => ({
  type: DELETE_POST,
  id,
});

export const setCurrentProfile = (
  profile: ProfileType
): SetCurrentProfileActionType => ({
  type: SET_CURRENT_PROFILE,
  profile,
});

export const setCurrentProfilePhoto = (
  photos: PhotosType
): SetCurrentProfilePhotoActionType => ({
  type: SET_CURRENT_PROFILE_PHOTO,
  photos,
});

export const setStatus = (status: string): SetStatusPostActionType => ({
  type: SET_STATUS,
  status,
});
export const setEditMode = (editMode: boolean): SetEditModeActionType => ({
  type: SET_EDIT_MODE,
  editMode,
});

// THUNK

export const getUserByIdThunk = (userId: number) => (dispatch: any) => {
  profileAPI.fetchProfile(userId).then((data) => {
    dispatch(setCurrentProfile(data));
  });
};

export const getStatusByIdThunk = (userId: number) => (dispatch: any) => {
  profileAPI.fetchStatus(userId).then((data) => {
    dispatch(setStatus(data));
  });
};

export const updateStatusThunk = (status: string) => (dispatch: any) => {
  profileAPI.updateStatus(status).then((data) => {
    if (data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};

export const uploadPhotoThunk = (photo: any) => (dispatch: any) => {
  profileAPI.uploadPhoto(photo).then((data) => {
    if (data.resultCode === 0) {
      dispatch(setCurrentProfilePhoto(data.data.photos));
    }
  });
};

export const updateProfileThunk =
  (profile: ProfileType) => (dispatch: any, getState: any) => {
    profileAPI.updateProfile(profile).then((data) => {
      const userId = getState().auth.id;
      if (data.resultCode === 0) {
        dispatch(setEditMode(false));
        dispatch(getUserByIdThunk(userId));
      } else {
        const message =
          data.messages.length > 0 ? data.messages[0] : "Something went wrong.";
        dispatch(stopSubmit("edit-profile", { _error: message }));
      }
    });
  };

export default profileReducer;
