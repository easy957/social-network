import { NavigateFunction, Params } from "react-router-dom";

export type PhotosType = {
  small: null | string;
  large: null | string;
};
export type ContactsType = {
  facebook: null | string;
  website: null | string;
  vk: null | string;
  twitter: null | string;
  instagram: null | string;
  youtube: null | string;
  github: null | string;
  mainLink: null | string;
};
export type ProfileType = {
  aboutMe: null | string;
  contacts: ContactsType;
  lookingForAJob: boolean;
  lookingForAJobDescription: null | string;
  fullName: string;
  userId: number;
  photos: PhotosType;
};

export type PostType = {
  id: number;
  text: string;
  likesCount: number;
};

export type UserType = {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
  followed: boolean;
};

export type RouterPropsType = {
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
};

export type FriendType = { id: number; name: string; profilePicture: string };

export type AuthLoginProps = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
