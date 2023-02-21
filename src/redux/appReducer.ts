import { ThunkAction } from "redux-thunk";
import { fetchMeThunk } from "./authReducer";
import { AppStateType, InferActionsTypes } from "./redux-store";

const initialState = {
  initialized: false,
};

export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

function appReducer(state = initialState, action: ActionsTypes): InitialStateType {
  switch (action.type) {
    case "SET_INITIALIZED":
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
}

export const actions = {
  setInitialized: () => ({
    type: "SET_INITIALIZED",
  }),
};

//Thunk
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>;

export const setInitializedThunk = (): ThunkType => (dispatch) => {
  const promiseMe = dispatch(fetchMeThunk());
  Promise.all([promiseMe]).then(() => {
    dispatch(actions.setInitialized());
  });
};

export default appReducer;
