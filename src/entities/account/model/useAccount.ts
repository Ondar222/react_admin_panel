import { User } from "@/entities";

interface Account extends User { }

interface UseAccount {
  account: Account | undefined;

  me: () => Promise<void>;
}

export type { Account, UseAccount };
