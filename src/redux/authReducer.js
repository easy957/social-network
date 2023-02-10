import { stopSubmit } from "redux-form";
import { authAPI, profileAPI } from "../api/api";

const SET_USER_DATA = "SET-USER-DATA";
const CLEAR_USER_DATA = "CLEAR-USER-DATA";
const SET_USER_ID = "SET-USER-ID";
const SET_USER_PHOTO = "SET-USER-PHOTO";

const initialState = {
  id: null,
  login: null,
  email: null,
  photo: null,
  isAuth: false,
};

function authReducer(state = initialState, action) {
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

    default:
      return state;
  }
}

export const setUserData = (data) => ({
  type: SET_USER_DATA,
  data,
});
export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});

export const setUserId = (id) => ({
  type: SET_USER_ID,
  id,
});

export const setUserPhoto = (photo) => ({
  type: SET_USER_PHOTO,
  photo,
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

export default authReducer;
