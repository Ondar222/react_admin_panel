import axios from "axios";
import { create } from "zustand";
import { IUseUsers } from "../model/interface";
import { useCredentails } from "@/features/auth";
import { ApiResponse } from "@/app/types";
import { useAccount } from "@/entities/account";

const useUsers = create<IUseUsers>((set) => ({
  users: [],
  getUsers: async () => {
    const { access_token } = useCredentails.getState();
    const users = await axios
      .get<ApiResponse<any>>(
        `${import.meta.env.VITE_API}/users`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => res.data.data);

    return set({
      users: users,
    });
  },

  findUserByPhone: async (phone, callback: Function) => {
    const { access_token } = useCredentails.getState();
    const users = await axios
      .get<ApiResponse<any>>(
        `${import.meta.env.VITE_API}/user/findManyByPhone?phone=${phone}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => res.data.data);

    set({
      users: users,
    });

    callback();
  },

  deleteAccount: async () => {
    const { access_token } = useCredentails.getState();
    const { logout } = useAccount.getState()
    const user = await axios.delete(`${import.meta.env.VITE_API}/user/me`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
      .then((res) => {
        logout()
        localStorage.clear()
        return res.data.data
      });
  }
}));

export default useUsers;
