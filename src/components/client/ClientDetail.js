import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { axiosErrorHandler } from "../../util/axiosErrorHandler";
import {
  updateEditOrder,
  clearEditOrder,
} from "../../features/order/orderSlice";
import ClientOrderList from "./ClientOrderList";
import ClientRevenue from "../chart/ClientRevenue";
import { Config } from "../../util/Constants";
import styled from "styled-components";

const ClientDetail = (props) => {
  const [clientData, setClientData] = useState("");
  const [mode, setMode] = useState("order");
  let dispatch = useDispatch();
  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(Config.url.API_URL + "/feed/client/" + params.clientId)
      .then((result) => {
        setClientData(result.data.client);
      });
  }, []);

  const addClientOrder = () => {
    dispatch(clearEditOrder());
    dispatch(updateEditOrder({ client: clientData }));
    dispatch(updateEditOrder({ clientName: clientData.name }));
    dispatch(updateEditOrder({ address: clientData.address }));
    dispatch(updateEditOrder({ phone: clientData.phone }));
    navigate("/order/add-order?clientId=" + clientData._id);
  };

  const deleteClient = () => {
    alert("確定要刪除？");
    axios
      .delete(Config.url.API_URL + "/feed/client/" + clientData._id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        navigate("/client");
      })
      .catch((error) => {
        axiosErrorHandler(error);
        // alert(error.message);
      });
  };

  return (
    <ClientDetailWrap>
      <div className="title">
        <div className="tabDiv">
          <span
            className={mode === "order" ? "tab current" : "tab"}
            onClick={() => setMode("order")}
          >
            客戶資訊
          </span>
          <span
            className={mode === "chart" ? "tab current" : "tab"}
            onClick={() => setMode("chart")}
          >
            數據統計
          </span>
        </div>
        <div
          className="editBtn btn"
          onClick={() => {
            navigate("/client/edit-client/" + params.clientId);
          }}
        >
          編輯
        </div>
        <div className="deleteBtn btn" onClick={deleteClient}>
          刪除
        </div>
      </div>
      <div className={mode === "chart" ? "clientInfo small" : "clientInfo"}>
        <div className="image">
          <img
            alt=""
            src={
              clientData.imageUrl
                ? Config.url.API_URL + clientData.imageUrl
                : "/images/userIcon.png"
            }
          />
        </div>
        <div className="detail">
          <div className="clientInfoRow">
            <div className="left">名稱</div>
            <div className="right">{clientData.name}</div>
          </div>
          <div className="clientInfoRow">
            <div className="left">地址</div>
            <div className="right">{clientData.address}</div>
          </div>
          <div className="clientInfoRow">
            <div className="left">手機號碼</div>
            <div className="right">{clientData.cellPhone}</div>
          </div>
          <div className="clientInfoRow">
            <div className="left">電話號碼</div>
            <div className="right">{clientData.phone}</div>
          </div>
          <div className="clientInfoRow">
            <div className="left">備註</div>
            <div className="right">{clientData.note}</div>
          </div>
        </div>
      </div>
      {mode === "order" && clientData.orders && (
        <Fragment>
          <div className="title">
            歷史訂單
            <div className="addOrderBtn btn" onClick={addClientOrder}>
              新增訂單
            </div>
          </div>
          <div className="orderList">
            <ClientOrderList orderList={clientData.orders} />
          </div>
        </Fragment>
      )}
      {mode === "chart" && <ClientRevenue client={clientData} />}
    </ClientDetailWrap>
  );
};

const ClientDetailWrap = styled.div`
  font-size: 18px;
  background: white;
  width: 800px;
  margin: 50px auto 40px auto;
  padding: 20px;
  box-sizing: border-box;
  min-height: 300px;
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
    0 1px 2px 1px rgb(30 35 90 / 40%);
  position: relative;
  @media (max-width: 767px) {
    width: 375px;
  }
  .title {
    font-weight: bold;
    border-bottom: 2px solid rgba(224, 224, 224, 1);
    margin-bottom: 20px;
    padding-bottom: 10px;
    font-size: 20px;
    justify-content: space-between;
    align-items: flex-end;
    display: flex;
    .tab {
      font-weight: 300;
      margin-right: 20px;
      cursor: pointer;
    }
    .tab.current {
      font-weight: bold;
    }
    .btn {
      position: absolute;
      border: 1px solid lightgray;
      border: 5px 10px;
      border-radius: 5px;
      padding: 5px 10px;
      cursor: pointer;
      transition: 0.3s;
      :hover {
        background-color: #d9fb19;
      }
    }
    .editBtn {
      top: 10px;
      right: 100px;
    }
    .deleteBtn {
      top: 10px;
      right: 20px;
    }
    .addOrderBtn {
      right: 20px;
      font-size: 18px;
    }
  }
  .clientInfo {
    display: flex;
    margin-bottom: 20px;
    transition: 0.2s;
    height: 200px;
    .image {
      width: 200px;
      border-radius: 10px;
      overflow: hidden;
      margin-right: 30px;
      display: flex;
      align-items: center;
      img {
        width: 100%;
      }
    }
    .detail {
      .clientInfoRow {
        display: flex;
        margin-bottom: 10px;
        .left {
          font-weight: bold;
          margin-right: 10px;
          width: 100px;
        }
      }
    }
  }
  .clientInfo.small {
    height: 120px;
    overflow: hidden;
    border-bottom: 2px solid rgba(224, 224, 224, 1);
    .image {
      width: 100px;
      height: 100px;
    }
  }
  .orderList {
    margin-top: -25px;
    background: white;
    min-height: 400px;
    box-sizing: border-box;
    .orderRow {
      display: flex;
    }
  }
`;

export default ClientDetail;
