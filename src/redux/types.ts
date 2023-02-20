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
