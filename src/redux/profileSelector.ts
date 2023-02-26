import { AppStateType } from "./redux-store";

export const getProfile = (state: AppStateType) => state.profilePage.currentProfile;
export const getStatus = (state: AppStateType) => state.profilePage.status;
export const getEditMode = (state: AppStateType) => state.profilePage.editMode;
