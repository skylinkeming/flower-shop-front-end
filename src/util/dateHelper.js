export const convertToDateStr = (date) => {
  const dateObj = new Date(date);
  const dateStr =
    dateObj.getFullYear() +
    "-" +
    (dateObj.getMonth() + 1) +
    "-" +
    dateObj.getDate();
  return dateStr;
};

export const convertToTimeStr = (date) => {
  const dateObj = new Date(date);
  const timeStr =
    dateObj.getHours() +
    ":" +
    (dateObj.getMinutes() == 0 ? "00" : dateObj.getMinutes());
  return timeStr;
};

export const converToDateAndTimeStr = (date) => {
  const dateObj = new Date(date);
  const dateStr =
    dateObj.getFullYear() +
    "-" +
    (dateObj.getMonth() + 1) +
    "-" +
    dateObj.getDate();
  const timeStr =
    dateObj.getHours() +
    ":" +
    (dateObj.getMinutes() == 0 ? "00" : dateObj.getMinutes());

  return dateStr + " " + timeStr;
};
