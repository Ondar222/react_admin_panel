import User from "@/entities/user/model/interface";

interface Account extends User {}

interface UseAccount {
  account: Account | undefined;

  me: () => Promise<void>;
  logout: () => void;
}

export type { Account, UseAccount };
