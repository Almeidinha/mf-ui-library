import { isDefined } from "./safe-navigation";

export const toKebabCase = (str: string) => {
  return isDefined(str)
    ? str
        .replace(/[^a-zA-Z0-9\\-]/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/([0-9]+)(.*)/g, "$1-$2")
        .replace(/(.*)([0-9]+)/g, "$1-$2")
        .replace(/^[\s_]+/g, "")
        .replace(/[\s_]+$/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/[^a-zA-Z0-9\\-]/g, "")
        .toLowerCase()
    : "";
};
