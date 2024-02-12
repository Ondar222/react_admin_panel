import { useEffect, useState } from "react";
import { IParsedObject } from "./interface";
import { ObjectParser } from ".";
import Types from "@/shared/types/api-types";

const useKeyTypes = (object: {
  [k: string]: any;
}): [
  string,
  {
    type: Types;
    value?: string | number;
    properties?: IParsedObject;
  }
][] => {
  const objectParser = new ObjectParser();
  const [keyTypes, setKeyTypes] = useState<
    [
      string,
      {
        type: Types;
        value?: string | number;
        properties?: IParsedObject;
      }
    ][]
  >();

  let parsedObjet;
  let entries: [string, any][];

  useEffect(() => {
    parsedObjet = objectParser.getObjectKeys(object);
    if (parsedObjet) {
      entries = Object.entries(parsedObjet);
    }
    if (entries) setKeyTypes(entries);
  }, [object]);

  if (keyTypes != undefined) return keyTypes;

  return [];
};

export { useKeyTypes };
