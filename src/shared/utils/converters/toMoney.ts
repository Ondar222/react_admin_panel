const convertToMoneyString = (money: number) => {
  const result = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(money / 100);
  return result;
};

export { convertToMoneyString };
