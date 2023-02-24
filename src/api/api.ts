import axios from "axios";
import { AuthLoginProps, ProfileType, UserType } from "../redux/types";
import { UsersFilterType } from "../redux/usersReducer";

const API = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "7469f494-303a-4f81-b23e-20412edda770",
  },
});

export enum resultCodes {
  success = 0,
  error = 1,
}
export enum resultCodeForCaptcha {
  captchaIsRequired = 10,
}

type UsersResponseType = {
  items: Array<UserType>;
  totalCount: number;
  error: string;
};

export type ToggleFollowResponseType = {
  resultCode: resultCodes;
  messages: Array<string>;
  data: {};
};

export const usersAPI = {
  async fetchUsers(currentPage = 1, pageSize = 10, filter: UsersFilterType) {
    const response = await API.get<UsersResponseType>(
      `users?page=${currentPage}&count=${pageSize}&term=${filter.term}&friend=${filter.friend}`
    );
    return response.data;
  },

  async fetchToggleFollow(followed: boolean, id: number) {
    if (!followed) {
      const response = await API.post<ToggleFollowResponseType>(`follow/${id}`);
      return response.data;
    }

    const response = await API.delete<ToggleFollowResponseType>(`follow/${id}`);
    return response.data;
  },
};

type UpdateProfileDataResponseType = {
  resultCode: resultCodes;
  messages: Array<string>;
  data: {};
};
type UpdateProfilePhotoResponseType = {
  resultCode: resultCodes;
  messages: Array<string>;
  data: {
    photos: {
      small: string;
      large: string;
    };
  };
};

export const profileAPI = {
  async fetchProfile(id: number | null) {
    const response = await API.get<ProfileType>(`profile/${id}`);
    return response.data;
  },
  async fetchStatus(id: number) {
    const response = await API.get<string>(`profile/status/${id}`);
    return response.data;
  },
  async updateStatus(status: string) {
    const response = await API.put<UpdateProfileDataResponseType>(`profile/status`, {
      status,
    });
    return response.data;
  },
  async updateProfile(profile: ProfileType) {
    const response = await API.put<UpdateProfileDataResponseType>(`profile`, profile);
    return response.data;
  },

  async uploadPhoto(photo: File) {
    let data = new FormData();
    data.append("image", photo);
    const response = await API.put<UpdateProfilePhotoResponseType>(`profile/photo`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

type MeResponseType = {
  resultCode: resultCodes;
  messages: Array<string>;
  data: {
    id: number;
    email: string;
    login: string;
  };
};
type LoginResponseType = {
  resultCode: resultCodes | resultCodeForCaptcha;
  messages: Array<string>;
  data: {
    userId: number;
  };
};
type LogoutResponseType = {
  resultCode: resultCodes;
  messages: Array<string>;
  data: {};
};

export const authAPI = {
  async me() {
    const response = await API.get<MeResponseType>("auth/me");
    return response.data;
  },

  async login({ email, password, rememberMe, captcha }: AuthLoginProps) {
    const response = await API.post<LoginResponseType>("auth/login", {
      email,
      password,
      rememberMe,
      captcha,
    });
    return response.data;
  },
  async logout() {
    const response = await API.delete<LogoutResponseType>("auth/login");
    return response.data;
  },
};

type GetCaptchaResponseType = { url: string };

export const securityAPI = {
  async getCaptcha() {
    const response = await API.get<GetCaptchaResponseType>("security/get-captcha-url");
    return response.data;
  },
};
