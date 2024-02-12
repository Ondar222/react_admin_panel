import { create } from "zustand";
import { IUseAccount } from "./interface";
import { useCredentails } from "@/features/auth";
import axios, { AxiosRequestConfig } from "axios";
import { ApiResponse } from "@/app/types";

const useAccount = create<IUseAccount>((set) => ({
  account: undefined,
  me: async () => {
    const { access_token } = useCredentails.getState();
    const headers: AxiosRequestConfig["headers"] = {
      Authorization: `Bearer ${access_token}`,
    };

    const account = await axios.get<ApiResponse<any>>(
      `${import.meta.env.VITE_API}/user/me`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    set({
      account: account.data.data,
    });
  },
}));

export { useAccount };
