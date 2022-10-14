import { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../features/order/orderSlice";
import { useEffect, useRef } from "react";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import OrderItem from "./OrderItem";
import Pagination from "../ui/Pagination";
import SearchInput from "../ui/SearchInput";
import Loading from "../ui/Loading";
import { Config } from "../../util/Constants";
import { axiosErrorHandler } from "../../util/axiosErrorHandler";
import DateRangePicker from "../ui/DateRangePicker";

const OrderList = (props) => {
  const order = useSelector((state) => {
    return state.order;
  });
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectOrders, setSelectOrders] = useState([]);
  const [batchActionType, setBatchActionType] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => {
    setSelectOrders([]);
    setSelectAll(false);
    dispatch(
      fetchOrders({
        page: page,
        searchKey: sessionStorage.getItem("searchKey"),
      })
    );
  }, [page]);

  useEffect(() => {
    if (selectAll) {
      if (order.orderList) {
        setSelectOrders(order.orderList.map((order) => order._id));
      }
    } else {
      setSelectOrders([]);
    }
  }, [selectAll]);

  const updateOrderStatus = (statusType, updateValue) => {
    let requestBody = {
      statusType: statusType, //1:付款狀態 2:運送狀態
      updateValue: updateValue,
      idArray: selectOrders,
    };
    axios
      .put(Config.url.API_URL + "/feed/orders/updateOrderStatus", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        clearSelect();
        dispatch(
          fetchOrders({
            page: page,
            searchKey: sessionStorage.getItem("searchKey"),
          })
        );
        // navigate("/order/" + params.orderId);
      })
      .catch((err) => {
        axiosErrorHandler(err);
      });
  };

  const deleteManyOrders = () => {
    let requestBody = {
      idArray: selectOrders,
    };
    axios
      .delete(Config.url.API_URL + "/feed/orders/deleteManyOrders", {
        data: requestBody,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        clearSelect();
        dispatch(
          fetchOrders({
            page: page,
            searchKey: sessionStorage.getItem("searchKey"),
          })
        );
      })
      .catch((err) => {
        axiosErrorHandler(err);
      });
  };

  const handleBatchAction = (actionType) => {
    if (selectOrders.length === 0) {
      setBatchActionType("");
      return;
    }
    setBatchActionType(actionType);
    switch (actionType) {
      case "1": {
        updateOrderStatus(1, true);
        break;
      }
      case "2": {
        updateOrderStatus(1, false);
        break;
      }
      case "3": {
        updateOrderStatus(2, 1);
        break;
      }
      case "4": {
        updateOrderStatus(2, 0);
        break;
      }
      case "5": {
        deleteManyOrders();
        break;
      }
      default: {
        break;
      }
    }
  };

  const clearSelect = () => {
    setSelectOrders([]);
    setBatchActionType("");
    setSelectAll(false);
  };

  return (
    <OrderListWrap>
      <div className="pageTop">
        <div className="pageTitle">訂單資料</div>
        <select
          className="batchAction"
          value={batchActionType}
          onChange={(e) => {
            handleBatchAction(e.target.value);
          }}
        >
          <option disabled={true} value="">
            --選擇編輯行動--
          </option>
          <option value="1">批次改為已付款</option>
          <option value="2">批次改為未付款</option>
          <option value="3">批次改為已送貨</option>
          <option value="4">批次改為未送貨</option>
          <option value="5">批次刪除</option>
        </select>
      </div>
      <div className="table">
        <div className="functionHeader">
          <SearchInput
            placeholder="請輸入商品名稱.送貨地址.客戶名稱..."
            handleClickSearch={(term) => {
              setPage(1);
              dispatch(
                fetchOrders({
                  page: 1,
                  searchKey: term,
                })
              );
              setSearchKey(term)
            }}
            handleClearSearch={() => {
              dispatch(
                fetchOrders({
                  page: page,
                })
              );
              setSearchKey("")
            }}
          />
          <DateRangePicker
            handleSearchRange={(startDate, endDate) => {
              dispatch(
                fetchOrders({
                  page: 1,
                  startDate: startDate,
                  endDate: endDate,
                })
              );
            }}
            handleClearSearch={() => {
              dispatch(
                fetchOrders({
                  page: 1,
                })
              );
              setPage(1);
            }}
          />
        </div>
        <div className="tableHeader">
          <span className="column checkbox">
            <Checkbox
              {...label}
              checked={selectAll}
              onChange={(e) => {
                setSelectAll(!selectAll);
              }}
            />
          </span>
          <div className="column header date">日期</div>
          <div className="column header time">時間</div>
          <div className="column header client">客戶名稱</div>
          <div className="column header products">商品</div>
          <div className="column header totalPrice">總金額</div>
          <div className="column header address">送貨地址</div>
          <div className="column header isPaid">付款狀態</div>
          <div className="column header shippingStatus">取貨狀態</div>
          <div className="column"></div>
          <div className="column"></div>
        </div>
        <div className="tableBody">
          <div className="orderList">
            {order.isLoading && <Loading />}
            {!order.isLoading &&
              order.orderList.map((orderData) => (
                <OrderItem
                  key={orderData.createdAt}
                  searchKey={searchKey}
                  {...orderData}
                  isSelected={selectOrders.includes(orderData._id)}
                  handleTickCheckbox={(selected) => {
                    let updateList = [...selectOrders];
                    if (selected) {
                      updateList.push(orderData._id);
                      setSelectOrders(updateList);
                    } else {
                      let newList = updateList.filter(
                        (orderId) => orderId !== orderData._id
                      );
                      setSelectOrders(newList);
                    }
                  }}
                />
              ))}
            {!order.isLoading && order && order.orderList.length === 0 && (
              <div className="noResult">查無訂單</div>
            )}
          </div>
        </div>
        <div className="tableBottom">
          {order.totalPages && (
            <Pagination
              key={page}
              currentPage={page}
              totalPages={order.totalPages}
              onClickPage={(pageNum) => setPage(pageNum)}
            />
          )}
        </div>
      </div>
    </OrderListWrap>
  );
};

const OrderListWrap = styled.div`
  text-align: center;
  background-color: #e7ebf0;
  height: 100%;
  width: 100%;
  .highlight {
    color:#1976D2;
  }
  .pageTop {
    display: inline-block;
    width: 1100px;
    margin-top: 30px;
    position: relative;
    text-align: left;
    @media (max-width:767px) {
      width:375px;
    }
    .pageTitle {
      display: inline-block;
      font-size: 30px;
    }
    .batchAction {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 16px;
      padding: 0;
      height: 33px;
      padding: 0 10px;
      border-radius: 5px;
      border: 1px solid rgba(224, 224, 224, 1);
    }
  }
  .table {
    display: inline-block;
    background-color: white;
    margin-top: 20px;
    font-size: 18px;
    min-height: 200px;
    max-height: 800px;
    overflow-x: auto;
    border-radius: 10px;
    box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
      0 1px 2px 1px rgba(30, 35, 90, 0.4);
    overflow-y: hidden;
    @media (max-width: 767px) {
      width:375px;
    }
    .functionHeader {
      padding: 0px 20px;
      display: flex;
      justify-content: space-between;
      @media (max-width:767px) {
        display:block;
        text-align: left;
      }
      .search {
        margin-top: 20px;
      }
    }
    .tableHeader {
      border-bottom: 2px solid rgba(224, 224, 224, 1);
      display: flex;
      align-items: center;
      white-space: nowrap;
    }
    .tableBody {
      height: calc(100% - 192px);
      overflow: auto;
      .noResult {
        text-align: center;
        padding-top: 100px;
        font-size: 24px;
      }
    }
    .tableBottom {
      height: 40px;
      padding: 0 20px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .column {
      padding: 10px 5px;
      text-align: center;
    }
    .column.header {
      font-size: 18px;
    }
    .column.checkbox {
      width: 45px;
      box-sizing: border-box;
    }
    .column.date {
      width: 120px;
      white-space: nowrap;
      box-sizing: border-box;
      @media (max-width: 767px) {
        display: none;
      }
    }
    .column.time {
      width: 70px;
      box-sizing: border-box;
      @media (max-width: 767px) {
        display: none;
      }
    }
    .column.client {
      width: 120px;
      box-sizing: border-box;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100%;
      overflow: hidden;
    }
    .column.products {
      width: 200px;
      box-sizing: border-box;
      overflow: hidden;
      @media (max-width: 767px) {
        display: none;
      }
    }
    .column.totalPrice {
      width: 80px;
      box-sizing: border-box;
      @media (max-width: 767px) {
        display: none;
      }
    }
    .column.address {
      width: 300px;
      box-sizing: border-box;
      @media (max-width: 767px) {
        display: none;
      }
    }
    .column.isPaid {
      width: 105px;
      box-sizing: border-box;
    }
  }
`;

export default OrderList;
