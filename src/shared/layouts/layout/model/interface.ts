import { ReactNode } from "react";

interface ILayout {
  header: ReactNode;
  children?: ReactNode;
  footer: ReactNode;
}

export type { ILayout };
