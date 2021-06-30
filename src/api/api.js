import * as axios from "axios";


const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "77e9a31a-c3e8-44e3-857f-f3ed39be205a"
  }
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 5) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => response.data);
  },
  unFollow(userId) {
    return instance.delete(`follow/${userId}`)
        .then(response => response.data);
  },
  follow(userId) {
    return instance.post(`follow/${userId}`, null)
        .then(response => response.data);
  }
}

export const authAPI = {
  auth() {
    return instance.get(`auth/me`).then(response => response.data);
  },
  login(email, password, rememberMe = false) {
    return instance.post(`auth/login`, {
      email,
      password,
      rememberMe
    }).then(response => response.data);
  },
  logout() {
    return instance.delete(`auth/login`).then(response => response.data);
  }
}

export const profileAPI = {
  getProfileInfo(userId) {
    return instance.get(`/profile/${userId}`).then(response => response.data);
  },
  getUserStatus(userId) {
    return instance.get(`/profile/status/${userId}`).then(response => response.data);
  },
  updateUserStatus(status) {
    return instance.put(`/profile/status/`, {status}).then(response => response.data);
  },
  savePhoto(file) {
    const formData = new FormData();
    formData.append("image", file)
    return instance.put(`/profile/photo/`, formData, {
      headers: {
       "Content-Type": "multipart/form-data"
      }
    }).then(response => response.data);
  }
}


