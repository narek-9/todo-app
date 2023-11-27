export const getValidStringDate = (date: string): string => {
  if (!date) {
    return "";
  }

  const validDate = new Date(date);

  const year = validDate.getFullYear();
  const month = validDate.getMonth();
  const day = validDate.getDate();

  const hours = validDate.getHours();
  const minutes = validDate.getMinutes();

  return `${year}-${month + 1 < 10 ? "0" : ""}${month + 1}-${
    day + 1 < 10 ? "0" : ""
  }${day} ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
};
