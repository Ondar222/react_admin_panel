const convertToMoneyString = (money: number) => {
  const result = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(money / 100);

  console.log(money / 100, Math.floor(money % 100), 2);
  return result;
};

export { convertToMoneyString };
