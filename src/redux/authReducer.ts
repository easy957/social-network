import { stopSubmit } from "redux-form";
import { authAPI, profileAPI, resultCodeForCaptcha, resultCodes, securityAPI } from "../api/api";
import { AuthLoginProps } from "./types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";

const initialState = {
  id: null as null | number,
  login: null as null | string,
  email: null as null | string,
  photo: null as null | string,
  isAuth: false,
  captcha: "",
};

export type InitialStateType = typeof initialState;
type ActionsTypes = any;

function authReducer(state = initialState, action: ActionsTypes): InitialStateType {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        ...action.data,
        isAuth: true,
      };
    case "CLEAR_USER_DATA":
      return initialState;

    case "SET_USER_ID":
      return {
        ...state,
        id: action.id,
        isAuth: true,
      };

    case "SET_USER_PHOTO":
      return {
        ...state,
        photo: action.photo,
      };
    case "SET_CAPTCHA":
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

export const actions = {
  setUserData: (data: UserDataType) => ({
    type: "SET_USER_DATA",
    data,
  }),

  clearUserData: () => ({
    type: "CLEAR_USER_DATA",
  }),
  setUserId: (id: number) => ({
    type: "SET_USER_ID",
    id,
  }),

  setUserPhoto: (photo: string | null) => ({
    type: "SET_USER_PHOTO",
    photo,
  }),

  setCaptcha: (captcha: string) => ({
    type: "SET_CAPTCHA",
    captcha,
  }),
};

//Thunk

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>;

export const fetchMeThunk = (): ThunkType => async (dispatch) => {
  const data = await authAPI.me();
  if (data.resultCode === 0) {
    dispatch(actions.setUserData(data.data));
    profileAPI.fetchProfile(data.data.id).then((profileData) => {
      dispatch(actions.setUserPhoto(profileData.photos.small));
    });
  }
};

export const loginThunk =
  (loginData: AuthLoginProps): ThunkType =>
  (dispatch) => {
    authAPI.login(loginData).then((data) => {
      if (data.resultCode === resultCodes.success) {
        dispatch(fetchMeThunk());
      } else {
        if (data.resultCode === resultCodeForCaptcha.captchaIsRequired) {
          dispatch(getCaptchaThunk());
        }
        const message = data.messages.length > 0 ? data.messages[0] : "Something went wrong.";
        dispatch(stopSubmit("login", { _error: message }));
      }
    });
  };

export const logoutThunk = (): ThunkType => (dispatch) => {
  authAPI.logout().then((data) => {
    if (data.resultCode === resultCodes.success) {
      dispatch(actions.clearUserData());
    }
  });
};

export const getCaptchaThunk = (): ThunkType => (dispatch) => {
  securityAPI.getCaptcha().then((data) => {
    dispatch(actions.setCaptcha(data.url));
  });
};

export default authReducer;
