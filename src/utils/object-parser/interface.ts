import Types from "@/shared/types/api-types";

interface IParsedObject {
  [k: string]: {
    type: Types;
    value?: string | number;
    properties?: IParsedObject;
  };
}

export type { IParsedObject };
