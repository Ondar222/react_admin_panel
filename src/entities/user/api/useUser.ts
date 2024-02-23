import { IDirectusResponse } from "@/shared/directus/model/interface";
import axios from "axios";
import { create } from "zustand";
import { IUseUsers } from "../model/interface";
import { useCredentails } from "@/features/auth";
import { DirectusUserResponse } from "../model/decoder";

const useUsers = create<IUseUsers>((set) => ({
  users: [],
  getUsers: async () => {
    const { access_token } = useCredentails.getState();
    const users = await axios
      .get<IDirectusResponse<DirectusUserResponse[]>>(
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
      .get<IDirectusResponse<DirectusUserResponse[]>>(
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

  register: async (user, code, callback) => {
    const createdUser = await axios
      .post(`${import.meta.env.VITE_API}/user`)
      .then((res) => res);
  },
}));

export default useUsers;
