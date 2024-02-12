import User from "@/entities/user/model/interface";

interface IUseAccount {
  account?: Pick<User, "id" | "surname" | "name" | "phone" | "email" | "role">;

  me: () => Promise<void>;
}

export type { IUseAccount };
