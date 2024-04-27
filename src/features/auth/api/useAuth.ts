import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"
import { IAuthResponse, IUseAuth } from "../model/interface";
import axios from "axios";
import useCredentails from "./useCredentials";
import { ApiResponse } from "@/app/types";
import { notification } from "antd";

const useAuth = create(
  persist<IUseAuth>((set) => ({
    isAuth: false,
    error: undefined,
    isLoading: false,

    setIsAuth: (status: boolean) => set({ isAuth: status }),

    checkAuth: async () => {
      const access = localStorage.getItem("access_token");
      const refresh = localStorage.getItem("refresh_token");

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
          localStorage.setItem("refresh_token", refresh_token)
          localStorage.setItem("access_token", access_token)

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
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")

      set({
        isAuth: false,
      });
    },
  }), {
    name: "auth_store",
    storage: createJSONStorage(() => localStorage)
  }));

export { useAuth };
