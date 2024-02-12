import { create } from "zustand";
import { IAuthResponse, IUseAuth } from "../model/interface";
import axios from "axios";
import { IDirectusResponse } from "../../../shared/directus/model/interface";
import useCredentails from "./useCredentails";
import Cookies from "js-cookie";

const useAuth = create<IUseAuth>((set) => ({
  isAuth: false,
  setIsAuth: (status: boolean) => set({ isAuth: status }),
  checkAuth: async () => {
    const access = Cookies.get("access_token");
    const refresh = Cookies.get("refresh_token");

    const data = {
      refresh_token: refresh,
      mode: "json",
    };

    if (access) {
      set({
        isAuth: true,
      });
    }
    else {
      const { } = await axios.post("https://yurta.site/api/cms/auth/refresh", data)
    }
  },

  login: async (email, password) => {
    const data = {
      email,
      password,
    };

    const authResponse: IAuthResponse = await axios
      .post<IDirectusResponse<IAuthResponse>>(
        `${import.meta.env.VITE_API}/auth/login/password`,
        data
      )
      .then((res) => res.data.data);

    const { access_token, refresh_token, expires } = authResponse

    if (access_token && refresh_token) {
      Cookies.set("refresh_token", refresh_token, {
        expires: 1000 * 60 * 60 * 24 * 30 * 12, // 1 year refresh token
      });
      Cookies.set("access_token", access_token, {
        expires: expires
      });
      useCredentails.getState().actions.setCredentails(authResponse);
      set({ isAuth: true });
    }
  },
  logout: () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    set({
      isAuth: false,
    });
  },
}));

export default useAuth;
