export const converToDateAndTimeStr = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month =
    dateObj.getMonth() + 1 < 10
      ? "0" + (dateObj.getMonth() + 1)
      : dateObj.getMonth() + 1;
  const dateStr =
    dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate();

  const hour =
    dateObj.getHours() < 10 ? "0" + dateObj.getHours() : dateObj.getHours();
  const min =
    dateObj.getMinutes() === 0
      ? "00"
      : dateObj.getMinutes() < 10
      ? "0" + dateObj.getMinutes()
      : dateObj.getMinutes();

  return year + "-" + month + "-" + dateStr + " " + hour + ":" + min;
};
