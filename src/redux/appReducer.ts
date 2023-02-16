import { fetchMeThunk } from "./authReducer";

const SET_INITIALIZED = "SET-INITIALIZED";

const initialState = {
  initialized: false as boolean,
};

export type InitialStateType = typeof initialState;

function appReducer(state = initialState, action: any): InitialStateType {
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

type SetInitializedActionType = { type: typeof SET_INITIALIZED };

export const setInitialized = (): SetInitializedActionType => ({
  type: SET_INITIALIZED,
});

//Thunk

export const setInitializedThunk = () => (dispatch: any) => {
  const promiseMe = dispatch(fetchMeThunk());
  Promise.all([promiseMe]).then(() => {
    dispatch(setInitialized());
  });
};

export default appReducer;
