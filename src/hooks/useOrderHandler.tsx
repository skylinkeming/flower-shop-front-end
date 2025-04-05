import axios from "axios";
import { useDispatch } from "react-redux";
import { Config } from "../util/Constants";
import { axiosErrorHandler } from "../util/axiosErrorHandler";

export function useOrderHandler() {

  const updateOrderStatus = (statusType, updateValue, idArray) => {
    let requestBody = {
      statusType: statusType, //1:付款狀態 2:運送狀態
      updateValue: updateValue, //true:已付款/已運送 false:未付款/未運送
      idArray: idArray,
    };
    return axios
      .put(Config.url.API_URL + "/feed/orders/updateOrderStatus", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        axiosErrorHandler(err);
      });
  };

  return { updateOrderStatus };
}
