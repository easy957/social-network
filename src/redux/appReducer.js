import { fetchMeThunk } from "./authReducer";

const SET_INITIALIZED = "SET-INITIALIZED";

const initialState = {
  initialized: false,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
}

export const setInitialized = () => ({
  type: SET_INITIALIZED,
});

//Thunk

export const setInitializedThunk = () => (dispatch) => {
  const promiseMe = dispatch(fetchMeThunk());
  Promise.all([promiseMe]).then(() => {
    dispatch(setInitialized());
  });
};

export default appReducer;
