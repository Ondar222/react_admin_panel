const CapitalizeString = (str: string): string => {
  const first_char = str.charAt(0).toUpperCase();
  const strWithoutFChar = str.slice(1);
  return String().concat(first_char, strWithoutFChar);
};

export { CapitalizeString };
