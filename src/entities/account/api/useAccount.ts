import { create } from "zustand";
import { UseAccount } from "../model/useAccount";
import { useCredentails } from "@/features/auth";
import axios from "axios";
import { ApiResponse } from "@/app/types";
import { User } from "@/entities";

const useAccount = create<UseAccount>((set) => ({
  account: undefined,
  me: async () => {
    const { access_token } = useCredentails.getState();

    const account = await axios.get<ApiResponse<User>>(
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

  logout: () => { },
}));

export { useAccount };
