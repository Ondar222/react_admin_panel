import { IImage } from "@/app/types";

interface IUseUsers {
  users: User[];
  getUsers: () => Promise<void>;
  findUserByPhone: (phone: string, callback: Function) => Promise<void>;
  deleteAccount: () => Promise<void>
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

export type { User };
export type { IUseUsers };
