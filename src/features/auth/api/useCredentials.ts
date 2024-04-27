import { create } from "zustand";
import { IAuthResponse, IUseCredentails } from "../model/interface";
import axios from "axios";
import { ApiResponse } from "@/app/types";

const useCredentails = create<IUseCredentails>((set, get) => ({
  access_token: localStorage.getItem("access_token") || undefined,
  expires: undefined,
  refresh_token: localStorage.getItem("refresh_token") || undefined,

  setCredentails: (credentails) => {
    set({
      access_token: credentails.access_token,
      expires: credentails.expires,
      refresh_token: credentails.refresh_token,
    });
  },

  refresh: async () => {
    await axios
      .post<ApiResponse<IAuthResponse>>(
        `${import.meta.env.VITE_API}/refresh`,
        null,
        {
          headers: {
            Authorization: `Bearer ${get().getRefreshToken()}`,
          },
        }
      )
      .then((res) => res.data.data);
  },

  getAccessToken: () => get().access_token,
  getRefreshToken: () => get().refresh_token,
}));

export default useCredentails;
