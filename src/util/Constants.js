const prod = {
  url: {
    // API_URL: "https://flower-shop-back-end.herokuapp.com",
    // API_URL: "https://real-erin-dove-sari.cyclic.app/",
    API_URL: "https://flower-shop-backend-9cq3.onrender.com",
  },
};
const dev = {
  url: {
    API_URL: "http://localhost:8080",
    // API_URL: "https://flower-shop-backend-9cq3.onrender.com",
  },
};
export const Config = process.env.NODE_ENV === "development" ? dev : prod;
