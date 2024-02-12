import Types from "@/shared/types/api-types";
import { IParsedObject } from "./interface";

class ObjectParser {
  getObjectKeys(obj: any, previousPath = ""): IParsedObject {
    try {
      const data = getProps(obj, previousPath);

      return data;
    } catch (e) {
      return {};
    }

    function getProps(obj: any, previousPath = ""): IParsedObject {
      if (previousPath) {

      }
      const keys: string[] = Object.keys(obj);
      let res: IParsedObject = {};

      keys.forEach((key) => {
        const currentPath = key;

        switch (typeof obj[key]) {
          case "number":
            if (
              new Date(obj[key] * 1000) instanceof Date &&
              Number(obj[key]) > 1700000000
            ) {
              return (res = {
                ...res,
                [currentPath]: {
                  type: Types.date,
                  value: obj[key],
                },
              });
            }

            return (res = {
              ...res,
              [currentPath]: {
                type: Types.number,
                value: obj[key],
              },
            });

          case "string":
            return (res = {
              ...res,
              [currentPath]: {
                type: Types.string,
                value: obj[key],
              },
            });

          case "object":
            if (Array.isArray(obj[key]) && (obj[key] as []).length != 0) {
              return (res = {
                ...res,
                [currentPath]: {
                  type: Types.array,
                  properties: getProps(obj[key][0]),
                },
              });
            }
            if (
              new Date(obj[key] * 1000) instanceof Date &&
              Number(obj[key]) > 1700000000
            ) {
              return (res = {
                ...res,
                [currentPath]: {
                  type: Types.date,
                  value: obj[key],
                },
              });
            }

            return (res = {
              ...res,
              [currentPath]: {
                type: Types.object,
                properties: getProps(obj[key]),
              },
            });
        }
      });

      return res;
    }
  }
}

export { ObjectParser };
