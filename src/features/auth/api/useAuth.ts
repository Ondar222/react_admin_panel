import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"
import { IAuthResponse, IUseAuth } from "../model/interface";
import axios from "axios";
import useCredentails from "./useCredentails";
import Cookies from "js-cookie";
import { ApiResponse } from "@/app/types";
import { notification } from "antd";

const useAuth = create(
  persist<IUseAuth>((set) => ({
    isAuth: false,
    error: undefined,
    isLoading: false,

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
        })

        useCredentails.getState().setCredentails({
          access_token: access,
          refresh_token: refresh,
          expires: 1800000000
        })

      } else {
        const authResponse = await axios.post<ApiResponse<IAuthResponse>>(
          `${import.meta.env.VITE_API}/auth/refresh`,
          data
        )
          .then((res) => {
            return res.data.data
          })
          .catch((e) => {
            throw e
          })

        useCredentails.getState().setCredentails(authResponse);

        set({
          isAuth: true
        })
      }
    },

    login: async (email, password) => {
      try {
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
          useCredentails.getState().setCredentails(authResponse);
          set({ isAuth: true });
        }
      } catch (e) {
        notification.error({
          message: "Не удалось войти",
          placement: "topRight"
        })
      }
    },

    logout: () => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

      set({
        isAuth: false,
      });
    },
  }), {
    name: "auth_store",
    storage: createJSONStorage(() => sessionStorage)
  }));

export { useAuth };
