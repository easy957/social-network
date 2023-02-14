import { stopSubmit } from "redux-form";
import { authAPI, profileAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "SET-USER-DATA";
const CLEAR_USER_DATA = "CLEAR-USER-DATA";
const SET_USER_ID = "SET-USER-ID";
const SET_USER_PHOTO = "SET-USER-PHOTO";
const SET_CAPTCHA = "SET-CAPTCHA";

const initialState = {
  id: null as null | number,
  login: null as null | string,
  email: null as null | string,
  photo: null as null | string,
  isAuth: false as null | boolean,
  captcha: null as null | string,
};

export type InitialStateType = typeof initialState;

function authReducer(state = initialState, action: any): InitialStateType {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: true,
      };
    case CLEAR_USER_DATA:
      return initialState;

    case SET_USER_ID:
      return {
        ...state,
        id: action.id,
        isAuth: true,
      };

    case SET_USER_PHOTO:
      return {
        ...state,
        photo: action.photo,
      };
    case SET_CAPTCHA:
      return {
        ...state,
        captcha: action.captcha,
      };

    default:
      return state;
  }
}

// Action creator

type UserDataType = { email: string; id: number; login: string };
type SetUserDataActionType = {
  type: typeof SET_USER_DATA;
  data: UserDataType;
};
export const setUserData = (data: UserDataType): SetUserDataActionType => ({
  type: SET_USER_DATA,
  data,
});

type ClearUserDataActionType = { type: typeof CLEAR_USER_DATA };
export const clearUserData = (): ClearUserDataActionType => ({
  type: CLEAR_USER_DATA,
});

type SetUserIdActionType = {
  type: typeof SET_USER_ID;
  id: number;
};
export const setUserId = (id: number): SetUserIdActionType => ({
  type: SET_USER_ID,
  id,
});

type SetUserPhotoActionType = {
  type: typeof SET_USER_PHOTO;
  photo: string;
};
export const setUserPhoto = (photo: string): SetUserPhotoActionType => ({
  type: SET_USER_PHOTO,
  photo,
});

type SetCaptchaActionType = {
  type: typeof SET_CAPTCHA;
  captcha: string;
};
export const setCaptcha = (captcha: string): SetCaptchaActionType => ({
  type: SET_CAPTCHA,
  captcha,
});

//Thunk

export const fetchMeThunk = () => (dispatch) => {
  return authAPI.me().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setUserData(data.data));
      profileAPI.fetchProfile(data.data.id).then((data) => {
        dispatch(setUserPhoto(data.photos.small));
      });
    }
  });
};

export const loginThunk = (loginData) => (dispatch) => {
  authAPI.login(loginData).then((data) => {
    if (data.resultCode === 0) {
      dispatch(fetchMeThunk());
    } else {
      if (data.resultCode === 10) {
        dispatch(getCaptchaThunk());
      }
      const message =
        data.messages.length > 0 ? data.messages[0] : "Something went wrong.";
      dispatch(stopSubmit("login", { _error: message }));
    }
  });
};

export const logoutThunk = () => (dispatch) => {
  authAPI.logout().then((data) => {
    if (data.resultCode === 0) {
      dispatch(clearUserData());
    }
  });
};
export const getCaptchaThunk = () => (dispatch) => {
  securityAPI.getCaptcha().then((data) => {
    dispatch(setCaptcha(data.url));
  });
};

export default authReducer;
