
export const axiosErrorHandler = (err, callback) => {
  if (err.response.data.message === "jwt malformed") {
    alert("請先登入會員");
    if (callback) {
      callback();
    }
    return;
  }

  if (err.response.data.message === "jwt expired" || err.response.data.message === "Not authenticated.") {
    alert("身份驗證過期，請重新登入");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    if (callback) {
      callback();
    }
    return;
  }

  alert(err.response.data.message);
};
