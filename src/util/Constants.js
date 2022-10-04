const prod = {
  url: {
    API_URL: "https://flower-shop-back-end.herokuapp.com",
  },
};
const dev = {
  url: {
    API_URL: "http://localhost:8080",
  },
};
export const Config = process.env.NODE_ENV === "development" ? dev : prod;
