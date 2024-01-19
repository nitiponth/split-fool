export const toAmountString = (amount: number) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "THB",
  });
};

export const toShortName = (name: string) => {
  const [first, last] = name.split(" ");
  const capFirst = first.charAt(0).toUpperCase() + first.slice(1);

  const resp = [capFirst];
  if (last?.length) {
    const shortLast = last.charAt(0).toUpperCase() + ".";
    resp.push(shortLast);
  }

  return resp.join(" ");
};
