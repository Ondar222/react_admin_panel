import { create } from "zustand";
import { IAuthResponse, IUseCredentails } from "../model/interface";
import axios from "axios";
import { IDirectusResponse } from "../../../shared/directus/model/interface";
import Cookies from "js-cookie";

const useCredentails = create<IUseCredentails>((set, get) => ({
  access_token: Cookies.get("access_token") || undefined,
  expires: undefined,
  refresh_token: Cookies.get("refresh_token") || undefined,

  actions: {
    setCredentails: (credentails) => {
      set({
        access_token: credentails.access_token,
        expires: credentails.expires,
        refresh_token: credentails.refresh_token,
      });
    },

    refresh: async () => {
      await axios
        .post<IDirectusResponse<IAuthResponse>>(
          `${import.meta.env.VITE_API}/refresh`,
          null,
          {
            headers: {
              Authorization: `Bearer ${get().actions.getRefreshToken()}`,
            },
          }
        )
        .then((res) => res.data.data);
    },

    getAccessToken: () => get().access_token,
    getRefreshToken: () => get().refresh_token,
  }

}));

export default useCredentails;
