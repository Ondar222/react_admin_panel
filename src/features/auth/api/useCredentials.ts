import { create } from "zustand";
import { IUseCredentials } from "../model/interface";

const useCredentails = create<IUseCredentials>((set, get) => ({
  access_token: localStorage.getItem("access_token") || undefined,
  expires: undefined,
  refresh_token: localStorage.getItem("refresh_token") || undefined,

  setCredentials: (credentails) => {
    const { access_token, refresh_token, expires } = credentails

    localStorage.setItem("refresh_token", refresh_token)
    localStorage.setItem("access_token", access_token)
    localStorage.setItem("expires", String(expires))
    localStorage.setItem("isAuth", "true")

    set({
      access_token: credentails.access_token,
      expires: credentails.expires,
      refresh_token: credentails.refresh_token,
    });
  },

  removeCredentials: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('expires')
    localStorage.removeItem('isAuth')
  },

  getAccessToken: () => get().access_token,
  getRefreshToken: () => get().refresh_token,
}));

export default useCredentails;
