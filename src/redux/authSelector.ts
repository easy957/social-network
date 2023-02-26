import { AppStateType } from "./redux-store";

export const getMyId = (state: AppStateType) => state.auth.id;
