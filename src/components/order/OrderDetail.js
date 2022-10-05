import styled from "styled-components";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { converToDateAndTimeStr } from "../../util/dateHelper";
import { useDispatch, useSelector } from "react-redux";
import { setEditOrder, clearEditOrder } from "../../features/order/orderSlice";
import { Config } from "../../util/Constants";
import { axiosErrorHandler } from "../../util/axiosErrorHandler";

const OrderDetail = (props) => {
  const editOrder = useSelector((state) => {
    return state.order.editOrder;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let params = useParams();
  useEffect(() => {
    axios
      .get(Config.url.API_URL + "/feed/order/" + params.orderId)
      .then((result) => {
        // setOrderData(result.data.order);
        // debugger;
        result.data.order.products = JSON.parse(result.data.order.products);
        dispatch(setEditOrder(result.data.order));
      });
  }, [params]);

  const deleteOrder = () => {
    axios
      .delete(Config.url.API_URL + "/feed/order/" + editOrder._id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        dispatch(clearEditOrder());
        navigate("/order");
      })
      .catch((error) => {
        axiosErrorHandler(error, ()=>{
          sessionStorage.setItem("beforeLoginUrl", window.location.href);
          navigate("/login");
        })
      });
  };

  const renderProductList = () => {
    if (!editOrder) {
      return null;
    }
    const products = editOrder.products;
    return (
      <div className="productList">
        {products.length > 0 &&
          products.map((p, index) => (
            <div key={index} className="productRow">
              <span className="product"> {p.productName}</span>
              <span className="price">{p.price}</span>
              <span className="quantity">{"x " + p.quantity}</span>
              <span className="money">{p.price * p.quantity}</span>
            </div>
          ))}
        <div className="productRow totalPrice">
          <span className="product"></span>
          <span className="price"></span>
          <span className="quantity">總金額</span>
          <span className="money">
            {editOrder.totalPrice}
            <span>元</span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <OrderDetailWrap>
      <div className="title">
        訂購明細
        <div
          className="editBtn"
          onClick={() => {
            navigate("/order/edit-order/" + params.orderId);
          }}
        >
          編輯
        </div>
        <div className="deleteBtn" onClick={deleteOrder}>
          刪除
        </div>
      </div>
      <div className="orderData">
        <div className="productRow productHeader">
          <span className="product">商品名稱</span>
          <span className="price">價格</span>
          <span className="quantity">數量</span>
          <span className="money">金額</span>
        </div>
        {renderProductList()}
      </div>
      <div className="title">客戶資訊</div>
      <div className="clientData">
        {editOrder.client._id && (
          <Fragment>
            <div className="row">
              <div className="rowName">客戶名稱</div>
              <div
                className="rowData cursor clientName"
                onClick={() => {
                  navigate("/client/" + editOrder.client._id);
                }}
              >
                {editOrder.client.name}
              </div>
            </div>
            <div className="row">
              <div className="rowName">聯絡電話</div>
              <div className="rowData">{editOrder.phone}</div>
            </div>
          </Fragment>
        )}
        {editOrder && !editOrder.client && (
          <div className="addClientBtn">新增客戶資料＋</div>
        )}
        <div className="row">
          <div className="rowName">運送地址</div>
          <div className="rowData">{editOrder && editOrder.address}</div>
        </div>
      </div>
      <div className="title">
        訂單狀態
        {editOrder && (
          <span className="orderTime">
            {"建立時間：" + converToDateAndTimeStr(editOrder.createdAt)}
          </span>
        )}
      </div>
      <div className="orderStatus">
        <div className="row">
          <div className="rowName">訂單日期</div>
          <div className="rowData">
            {editOrder && converToDateAndTimeStr(editOrder.date)}
          </div>
        </div>
        <div className="row">
          <div className="rowName">訂單備註</div>
          <div className="rowData">{editOrder && editOrder.note}</div>
        </div>
        <div className="row">
          <div className="rowName">運送狀態</div>
          <div className="rowData">
            {editOrder && editOrder.shippingStatus === 0 ? "未送" : "已送"}
          </div>
        </div>
        <div className="row">
          <div className="rowName">付款狀態</div>
          <div className="rowData">
            {editOrder && editOrder.isPaid ? "已付款" : "未付款"}
          </div>
        </div>
      </div>
    </OrderDetailWrap>
  );
};

const OrderDetailWrap = styled.div`
  font-size: 18px;
  background: white;
  width: 700px;
  margin: 50px auto 40px auto;
  padding: 20px;
  box-sizing: border-box;
  min-height: 300px;
  overflow-x: auto;
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
    .editBtn {
      position: absolute;
      border: 5px 10px;
      border: 1px solid lightgray;
      border-radius: 5px;
      padding: 5px 10px;
      top: 10px;
      right: 100px;
      cursor: pointer;
      transition: 0.3s;
      :hover {
        background-color: #d9fb19;
      }
    }
    .deleteBtn {
      position: absolute;
      border: 5px 10px;
      border: 1px solid lightgray;
      border-radius: 5px;
      padding: 5px 10px;
      top: 10px;
      right: 20px;
      cursor: pointer;
      transition: 0.3s;
      :hover {
        background-color: #d9fb19;
      }
    }
    .orderTime {
      font-weight: 400;
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .orderData {
    margin-bottom: 20px;
    text-align: center;
    background: rgba(224, 224, 224, 0.3);
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
    .productRow.productHeader {
      padding-bottom: 10px;
      border-bottom: 1px solid;
      margin-bottom: 5px;
    }
    .productRow {
      margin-bottom: 5px;
      .product {
        width: 150px;
        display: inline-block;
        text-align: left;
      }
      .price {
        width: 200px;
        display: inline-block;
        text-align: center;
      }
      .quantity {
        width: 100px;
        display: inline-block;
        text-align: center;
      }
      .money {
        width: 190px;
        display: inline-block;
        text-align: center;
      }
    }
    .productRow.totalPrice {
      padding-top: 10px;
      border-top: 1px solid;
      .quantity {
        font-weight: bold;
      }
      .money {
        position: relative;
        font-weight: bold;
        span {
          position: absolute;
          top: 0px;
          line-height: 20px;
        }
      }
    }
  }
  .clientData {
    margin-left: 10px;
    margin-bottom: 30px;
    .addClientBtn {
      border-radius: 10px;
      border: 1px solid lightgray;
      display: inline-block;
      padding: 5px 20px;
      margin-bottom: 10px;
      font-size: 16px;
      cursor: pointer;
      -webkit-transition: 0.3s;
      transition: 0.3s;
      margin-left: 10px;
      :hover {
        background: #d9fb19;
      }
    }
  }
  .orderStatus {
    margin-left: 10px;
  }
  .row {
    display: flex;
    margin: 10px 0px;
    .rowName {
      width: 80px;
      margin-right: 20px;
      font-weight: bold;
      white-space: nowrap;
    }
    .clientName {
      text-decoration: underline;
      font-weight: bold;
    }
  }
  .cursor {
    cursor: pointer;
  }
`;

export default OrderDetail;
