export const checkIfDateValid = (date: string): boolean => {
  const selectedDate = new Date(date);
  const currentDate = new Date();

  return selectedDate.getTime() > currentDate.getTime();
};
