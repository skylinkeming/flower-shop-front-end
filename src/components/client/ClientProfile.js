import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import ClientOrderList from "./ClientOrderList";
import { useNavigate } from "react-router-dom";
import { updateEditOrder } from "../../features/order/orderSlice";
import { Config } from "../../util/Constants";
import { axiosErrorHandler } from "../../util/axiosErrorHandler";
import ClientRevenue from "../chart/ClientRevenue";

const ClientProfile = () => {
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
    <ClientProfileＷrap>
      <div className="clientMainPage">
        <div className="clientInfo">
          <div
            className="editBtn"
            onClick={() => {
              navigate("/client/edit-client/" + params.clientId);
            }}
          >
            編輯
          </div>
          <div className="deleteBtn" onClick={deleteClient}>
            刪除
          </div>
          <div className="headDiv">
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
            <div
              className="addOrderBtn"
              onClick={() => {
                dispatch(updateEditOrder({ client: clientData }));
                dispatch(updateEditOrder({ clientName: clientData.name }));
                dispatch(updateEditOrder({ address: clientData.address }));
                dispatch(updateEditOrder({ phone: clientData.phone }));
                navigate("/order/add-order?clientId=" + clientData._id);
              }}
            >
              新增訂單+
            </div>
          </div>
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
        <div className="otherInfo">
          <div className="tab">
            <span
              className={mode === "order" && "current"}
              onClick={() => {
                setMode("order");
              }}
            >
              歷史訂單
            </span>
            <span
              className={mode === "chart" && "current"}
              onClick={() => {
                setMode("chart");
              }}
            >
              統計數據
            </span>
          </div>
          <div className="orderList">
            {mode === "order" && clientData.orders && (
              <ClientOrderList orderList={clientData.orders} />
            )}
            {mode === "chart" && <ClientRevenue client={clientData}/>}
          </div>
        </div>
      </div>
    </ClientProfileＷrap>
  );
};

const ClientProfileＷrap = styled.div`
  display: flex;
  justify-content: center;
  background-color: #e7ebf0;
  height: 90vh;
  padding-top: 50px;
  padding-bottom: 100px;
  .clientMainPage {
    display: flex;
    justify-content: center;
    padding: 20px;
    .clientInfo {
      width: 360px;
      min-height: 600px;
      padding-top: 30px;
      text-align: center;
      margin-right: 20px;
      background: white;
      border-radius: 10px;
      box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
        rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
      position: relative;
      .editBtn {
        position: absolute;
        border: 5px 10px;
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 5px 10px;
        top: 10px;
        right: 70px;
        cursor: pointer;
        transition: 0.3s;
        :hover {
          background-color: #02b2ed;
          color: white;
        }
      }
      .deleteBtn {
        position: absolute;
        border: 5px 10px;
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 5px 10px;
        top: 10px;
        right: 10px;
        cursor: pointer;
        transition: 0.3s;
        :hover {
          background-color: #02b2ed;
          color: white;
        }
      }
      .headDiv {
        border-bottom: 1px solid lightgray;
        width: 320px;
        text-align: center;
        margin: 0 auto;
        .image {
          padding: 10px;
          margin-bottom: 10px;
          img {
            width: 130px;
            border: 1px solid lightgray;
            border-radius: 50%;
            height: 130px;
          }
        }
        .addOrderBtn {
          border-radius: 10px;
          border: 1px solid lightgray;
          display: inline-block;
          padding: 5px 20px;
          margin-bottom: 20px;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
          :hover {
            background: #d9fb19;
          }
        }
      }

      .clientInfoRow {
        margin-top: 20px;
        display: flex;
        padding: 0 20px;
        .left {
          display: inline-block;
          width: 30%;
          text-align: left;
          font-weight: bold;
          box-sizing: border-box;
        }
        .right {
          display: inline-block;
          width: 70%;
          text-align: left;
        }
      }
    }
    .otherInfo {
      width: 500px;
      .tab {
        border-radius: 10px;
        margin: 0 auto;
        padding: 15px 20px;
        font-size: 20px;
        box-sizing: border-box;
        margin-bottom: 20px;
        background: white;
        box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
          rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
        width: 600px;
        span {
          margin-right: 20px;
          cursor: pointer;
          padding: 5px;
          color: #555;
          :hover {
            border-bottom: 3px solid #02b2ed;
            color: black;
          }
        }
        span.current {
          border-bottom: 3px solid #02b2ed;
          color: black;
        }
      }
      .orderList {
        background: white;
        box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
          rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
        background: white;
        border-radius: 10px;
        padding: 15px;
        width: 600px;
        min-height: 400px;
        box-sizing: border-box;
        .orderRow {
          display: flex;
        }
      }
    }
  }
`;

export default ClientProfile;
