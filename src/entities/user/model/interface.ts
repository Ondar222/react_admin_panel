import { IImage } from "@/app/types";
import { DirectusUserResponse } from "./decoder";

interface IUseUsers {
  users: DirectusUserResponse[];
  getUsers: () => Promise<void>;
  findUserByPhone: (phone: string, callback: Function) => Promise<void>;
}

type User = {
  id: string;
  surname: string;
  name: string;
  email: string;
  avatar: IImage;
  role: string;
  phone: string;
};

type UserCreateDto = {
  surname: string | undefined;
  name: string | undefined;
  phone: string;
  email: string | undefined;
};

export type { User as default };
export type { IUseUsers };
