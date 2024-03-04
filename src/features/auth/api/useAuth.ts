import { create } from "zustand";
import { IAuthResponse, IUseAuth } from "../model/interface";
import axios from "axios";
import useCredentails from "./useCredentails";
import Cookies from "js-cookie";
import { useHotel } from "@/entities/hotel";
import { ApiResponse } from "@/app/types";

const useAuth = create<IUseAuth>((set) => ({
  isAuth: false,
  setIsAuth: (status: boolean) => set({ isAuth: status }),

  checkAuth: async () => {
    const access = Cookies.get("access_token");
    const refresh = Cookies.get("refresh_token");

    const data = {
      refresh: refresh,
    };

    if (access) {
      set({
        isAuth: true,
      });
    } else {
      const {} = await axios.post(
        `${import.meta.env.VITE_API}/auth/refresh`,
        data
      );
    }
  },

  login: async (email, password) => {
    const data = {
      email,
      password,
    };

    const authResponse: IAuthResponse = await axios
      .post<ApiResponse<IAuthResponse>>(
        `${import.meta.env.VITE_API}/auth/login/password`,
        data
      )
      .then((res) => {
        return res.data.data;
      });

    const { access_token, refresh_token, expires } = authResponse;

    if (access_token && refresh_token) {
      Cookies.set("refresh_token", refresh_token, {
        expires: 1000 * 60 * 60 * 24 * 30 * 12, // 1 year refresh token
      });
      Cookies.set("access_token", access_token, {
        expires: expires,
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
