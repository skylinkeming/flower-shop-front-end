export const highlightText = (searchKey, content) => {
  var arr = content.split(searchKey);
  var newStr = arr.join("<span class='highlight'>" + searchKey + "</span>");
  return newStr;
};
