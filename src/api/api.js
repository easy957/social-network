import axios from "axios";

const API = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "7469f494-303a-4f81-b23e-20412edda770",
  },
});

export const usersAPI = {
  fetchUsers(currentPage = 1, pageSize = 10) {
    return API.get(`users?page=${currentPage}&count=${pageSize}`).then(
      (response) => response.data
    );
  },

  fetchToggleFollow(id, followed) {
    if (!followed) {
      return API.post(`follow/${id}`).then((response) => response.data);
    }

    if (followed) {
      return API.delete(`follow/${id}`).then((response) => response.data);
    }
  },
};

export const profileAPI = {
  fetchProfile(id) {
    return API.get(`profile/${id}`).then((response) => response.data);
  },
  fetchStatus(id) {
    return API.get(`profile/status/${id}`).then((response) => response.data);
  },
  updateStatus(status) {
    return API.put(`profile/status`, { status }).then(
      (response) => response.data
    );
  },
  updateProfile(profile) {
    return API.put(`profile`, profile).then((response) => response.data);
  },
  uploadPhoto(photo) {
    let data = new FormData();
    data.append("image", photo);
    console.log(data);
    return API.put(`profile/photo`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => response.data);
  },
};

export const authAPI = {
  me() {
    return API.get("auth/me").then((response) => response.data);
  },

  login({ email, password, rememberMe, captcha }) {
    return API.post("auth/login", {
      email,
      password,
      rememberMe,
      captcha,
    }).then((response) => response.data);
  },
  logout() {
    return API.delete("auth/login").then((response) => response.data);
  },
};

export const securityAPI = {
  getCaptcha() {
    return API.get("security/get-captcha-url").then(
      (response) => response.data
    );
  },
};
