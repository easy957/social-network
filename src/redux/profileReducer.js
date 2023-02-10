import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE-POST";
const SET_CURRENT_PROFILE = "SET-CURRENT-PROFILE";
const SET_STATUS = "SET-STATUS";

const initialState = {
  currentProfile: null,
  status: null,
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
  ],
};

function profileReducer(state = initialState, action) {
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
        newPostText: "",
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

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };

    default:
      return state;
  }
}

export const addPost = (newPostText) => ({ type: ADD_POST, newPostText });
export const deletePost = (id) => ({ type: DELETE_POST, id });

export const setCurrentProfile = (profile) => ({
  type: SET_CURRENT_PROFILE,
  profile,
});
export const setStatus = (status) => ({
  type: SET_STATUS,
  status,
});

// THUNK

export const getUserByIdThunk = (userId) => (dispatch) => {
  profileAPI.fetchProfile(userId).then((data) => {
    dispatch(setCurrentProfile(data));
  });
};

export const getStatusByIdThunk = (userId) => (dispatch) => {
  profileAPI.fetchStatus(userId).then((data) => {
    dispatch(setStatus(data));
  });
};

export const updateStatusThunk = (status) => (dispatch) => {
  profileAPI.updateStatus(status).then((data) => {
    if (data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};

export default profileReducer;
