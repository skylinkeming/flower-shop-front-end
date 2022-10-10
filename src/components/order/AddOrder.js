import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import MUIDatePicker from "../ui/MUIDatePicker";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditOrderSummary from "./EditOrderSummary";
import { useState } from "react";
import SelectClient from "../client/SelectClient";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEditOrder,
  clearEditOrder,
} from "../../features/order/orderSlice";
import { Config } from "../../util/Constants";
import { axiosErrorHandler } from "../../util/axiosErrorHandler";
import { useLocation } from "react-router-dom";

const AddOrder = (props) => {
  const editOrder = useSelector((state) => {
    return state.order.editOrder;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    if (window.location.href.includes("/add-order")) {
      setIsEdit(false);
      if (editOrder._id && !window.location.href.includes("clientId")) {
        dispatch(clearEditOrder());
      }
    } else {
      setIsEdit(true);
    }
  }, [location]);

  const checkInfo = () => {
    let isProductOK = true;
    let msg = "";
    if (!editOrder.products || !editOrder.products.length) {
      alert("請輸入商品");
      return;
    }
    editOrder.products.forEach((p) => {
      if (!p.productName) {
        isProductOK = false;
        msg = "請填入商品名稱";
        return;
      }
      if (!p.price) {
        isProductOK = false;
        msg = "請填入商品價格";
        return;
      }
      if (!p.quantity) {
        isProductOK = false;
        msg = "請填入商品數量";
        return;
      }
    });
    if (!isProductOK) {
      alert(msg);
      return;
    }
    if (!editOrder.client._id) {
      alert("請選擇訂購客戶");
      return;
    }
    if (!editOrder.phone) {
      alert("請填入聯絡電話");
      return;
    }
    if (!editOrder.address) {
      alert("請填入運送地址");
      return;
    }
    if (!editOrder.date) {
      alert("請選擇日期");
      return;
    }
    return true;
  };

  const getRequestData = () => {
    return {
      products: JSON.stringify(editOrder.products),
      totalPrice: editOrder.totalPrice,
      date: editOrder.date,
      client: editOrder.client._id,
      note: editOrder.note,
      isPaid: editOrder.isPaid ? true : false,
      shippingStatus: editOrder.shippingStatus,
      phone: editOrder.phone,
      address: editOrder.address,
      clientName: editOrder.client.name,
    };
  };

  const createOrder = () => {
    axios
      .post(Config.url.API_URL + "/feed/order", getRequestData(), {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        navigate("/order");
      })
      .catch((err) => {
        axiosErrorHandler(err);
      });
  };

  const updateOrder = () => {
    axios({
      method: "PUT",
      url: Config.url.API_URL + "/feed/order/" + params.orderId,
      data: getRequestData(),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        navigate("/order/" + params.orderId);
      })
      .catch((err) => {
        axiosErrorHandler(err, () => {
          navigate("/login");
        });
      });
  };

  return (
    <AddOrderWrap>
      <div className="title">訂購明細</div>
      <div className="orderSummary">
        <EditOrderSummary />
      </div>
      <div className="title">客戶資訊</div>
      <div className="row clientName">
        <label>訂購客戶</label>
        {editOrder.client._id && (
          <div
            className="clientHead"
            onClick={() => {
              if (!editOrder.client) {
                return;
              }
              navigate("/client/" + editOrder.client._id);
            }}
          >
            <div className="clientImage">
              <img
                alt=""
                src={
                  editOrder.client.imageUrl
                    ? Config.url.API_URL + editOrder.client.imageUrl
                    : "/images/userIcon.png"
                }
              />
            </div>
            <span>{editOrder.client.name}</span>
          </div>
        )}
        <SelectClient
          key={editOrder.client}
          defaultClient={editOrder.client}
          handleConfirmClient={(client) => {
            if (client) {
              dispatch(updateEditOrder({ client: client }));
              dispatch(updateEditOrder({ clientName: client.name }));
              dispatch(updateEditOrder({ address: client.address }));
              dispatch(updateEditOrder({ phone: client.phone }));
            }
          }}
        />
      </div>
      <div className="row">
        <label>聯絡電話</label>
        <div>
          <input
            value={editOrder.phone}
            onChange={(e) => {
              dispatch(updateEditOrder({ phone: e.target.value }));
            }}
          />
        </div>
      </div>
      <div className="row">
        <label>運送地址</label>
        <div>
          <input
            value={editOrder.address}
            onChange={(e) => {
              dispatch(updateEditOrder({ address: e.target.value }));
            }}
          />
        </div>
      </div>
      <div className="row">
        <label>備註</label>
        <textarea
          value={editOrder.note}
          onChange={(event) => {
            dispatch(updateEditOrder({ note: event.target.value }));
          }}
        />
      </div>
      <div className="title">訂單狀態</div>
      <div className="statusRow">
        <span className="rowName">訂單日期</span>
        <MUIDatePicker
          date={editOrder.date}
          onChange={(dateStr) => {
            // console.log(dateStr);
            dispatch(updateEditOrder({ date: dateStr }));
          }}
        />
      </div>
      <div className="statusRow">
        <span className="rowName">運送狀態</span>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">運送狀態</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={editOrder.shippingStatus}
              label="Age"
              onChange={(event) => {
                dispatch(
                  updateEditOrder({ shippingStatus: event.target.value })
                );
              }}
            >
              <MenuItem value={0}>未送</MenuItem>
              <MenuItem value={1}>已送</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="statusRow">
        <span className="rowName">付款狀態</span>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">付款狀態</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={editOrder.isPaid ? 1 : 0}
              label="付款狀態"
              onChange={(event) => {
                dispatch(updateEditOrder({ isPaid: event.target.value }));
              }}
            >
              <MenuItem value={0}>未付款</MenuItem>
              <MenuItem value={1}>已付款</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="btnArea">
        <div
          className="confirm btn"
          onClick={() => {
            if (!checkInfo()) {
              return;
            }
            if (isEdit) {
              updateOrder();
            } else {
              createOrder();
            }
          }}
        >
          {isEdit ? "確認修改" : "新增"}
        </div>
        <div
          className="cancel btn"
          onClick={() => {
            navigate(-1);
          }}
        >
          取消
        </div>
      </div>
    </AddOrderWrap>
  );
};

const AddOrderWrap = styled.div`
  font-size: 18px;
  background: white;
  width: 700px;
  margin: 50px auto 40px auto;
  padding: 20px;
  box-sizing: border-box;
  min-height: 300px;
  overflow-x: scroll;
  border-radius: 10px;
  box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
    0 1px 2px 1px rgb(30 35 90 / 40%);
  position: relative;
  .title {
    font-weight: bold;
    border-bottom: 2px solid rgba(224, 224, 224, 1);
    margin-bottom: 20px;
    padding-bottom: 10px;
    font-size: 20px;
    justify-content: space-between;
    align-items: flex-end;
    display: flex;
  }
  .row {
    font-size: 18px;
    margin-bottom: 10px;
    padding-left: 10px;
    display: flex;
    align-items: flex-start;
    label {
      font-weight: bold;
      margin-right: 20px;
      width: 72px;
      display: inline-block;
    }
    .selectClientBtn {
      border-radius: 10px;
      border: 1px solid lightgray;
      display: inline-block;
      padding: 5px 20px;
      font-size: 16px;
      cursor: pointer;
      -webkit-transition: 0.3s;
      -webkit-transition: 0.3s;
      transition: 0.3s;
    }
    input {
      font-size: 16px;
      width: 400px;
      border: 1px solid gray;
      padding: 5px 10px;
    }
    .sameAsClient {
      margin-left: 10px;
      font-size: 14px;
      cursor: pointer;
    }
    textArea {
      font-size: 16px;
      width: 400px;
      padding: 5px 10px;
      height: 100px;
    }
  }
  .row.clientName {
    margin-bottom: 10px;
    height: 50px;
    align-items: center;
    .clientHead {
      display: flex;
      align-items: center;
      margin-right: 20px;
      border-radius: 20px;
      border: 1px solid lightgray;
      padding: 0 10px;
      cursor: pointer;
      .clientImage {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        border: 1px solid lightgray;
        margin: 5px 10px 5px 0px;
        img {
          width: 100%;
        }
      }
    }
  }
  .statusRow {
    padding-left: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    span.rowName {
      font-weight: bold;
      margin-right: 20px;
      width: 72px;
      display: inline-block;
    }
  }
  .btnArea {
    text-align: center;
    margin-top: 40px;
    .confirm {
      margin-right: 20px;
    }
    .btn {
      display: inline-block;
      border: 5px 10px;
      border: 1px solid lightgray;
      border-radius: 5px;
      padding: 5px 10px;
      cursor: pointer;
      -webkit-transition: 0.3s;
      transition: 0.3s;
    }
  }
`;

export default AddOrder;
