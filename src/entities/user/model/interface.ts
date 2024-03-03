import { IImage } from "@/app/types";
import { DirectusUserResponse } from "./decoder";

interface IUseUsers {
  users: DirectusUserResponse[];
  getUsers: () => Promise<void>;
  findUserByPhone: (phone: string, callback: Function) => Promise<void>;
  register: (user: UserCreateDto, code: string, callback: void) => Promise<unknown>;
}

class User {
  constructor(
    id: string = "",
    surname: string = "",
    name: string = "",
    email: string = "",
    role: string = "",
    phone: string = "",
    avatar: IImage = {
      id: "",
      link: ""
    },
  ) {
    this.id = id;
    this.surname = surname;
    this.name = name;
    this.email = email;
    this.role = role;
    this.phone = phone;
    this.avatar = avatar;
  }
  id: string;
  surname: string;
  name: string;
  email: string;
  avatar: IImage
  // password: string;
  // location: string;
  // title: string;
  // description: null;
  // tags: null;
  // avatar: null;
  // language: string;
  // theme: string;
  // tfa_secret: null;
  // status: string;
  role: string;
  // token: null;
  // last_access: string;
  // last_page: string;
  phone: string;
}

class UserCreateDto {
  constructor(phone: string, surname?: string, name?: string,  email?: string, avatar?: IImage) {
    this.surname = surname;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.avatar = avatar;
  }

  surname: string | undefined;
  name: string | undefined;
  phone: string;
  email: string | undefined;
  avatar: IImage | undefined;
}

export { User as default };
export type { IUseUsers };
