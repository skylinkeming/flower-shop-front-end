"use server";
import styled from "styled-components";
import { Config } from "../../util/Constants";
import { useState } from "react";
import UpcomingOrder from "./UpcomingOrder";
import CustomizedDialogs from "../ui/CustomDialog";
import CreateScheduledOrder from "./CreateScheduledOrder";
import ScheduledOrderList from "./List";

async function getScheduledOrders(scheduledOrderId?: string) {
  const res = await fetch(Config.url.API_URL + "/feed/scheduledOrders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

export default function ScheduledOrder() {
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [orderList, setOrderList] = useState<any[]>([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [currentTab, setCurrentTab] = useState<"upcoming order" | "order list">(
    "upcoming order",
  );
  const [showAddScheduledOrder, setShowAddScheduledOrder] = useState(false);

  if (!hasFetched) {
    getScheduledOrders().then((data: any) => {
      console.log(data.orders);
      if(currentOrder ==null){
        setCurrentOrder(data.orders[0]);
      }
      setOrderList(data.orders);
      setHasFetched(true);
    });
  }

  return (
    <StyledScheduledOrderList>
      <div className="pageTitleContainer">
        <div className="pageTitle">例行訂單（測試中）</div>
        <div
          className="btn"
          onClick={() => {
            setShowAddScheduledOrder(true);
          }}
        >
          +新增例行訂單
        </div>
      </div>
      <div className="tabs">
        <div className="tabContainer">
          <div
            className={
              "tab" + (currentTab === "upcoming order" ? " selected" : "")
            }
            onClick={() => {
              setCurrentTab("upcoming order");
            }}
          >
            近期訂單
          </div>
          <div
            className={"tab" + (currentTab === "order list" ? " selected" : "")}
            onClick={() => {
              setCurrentTab("order list");
            }}
          >
            歷史訂單
          </div>
        </div>
      </div>
      {currentTab === "upcoming order" ? (
        <UpcomingOrder
          key={currentOrder._id}
          currentOrder={currentOrder}
          onNeedRefresh={() => {
            setHasFetched(false);
          }}
        />
      ) : (
        <ScheduledOrderList
          orderList={orderList}
          onClickOrder={(id) => {
            setCurrentTab("upcoming order");
            setCurrentOrder(orderList.find((order) => order._id === id));
            setHasFetched(false);
          }}
        />
      )}
      <CustomizedDialogs
        show={showAddScheduledOrder}
        onCloseDialog={() => setShowAddScheduledOrder(false)}
        content={
          <CreateScheduledOrder
            onClose={() => {
              setShowAddScheduledOrder(false);
              setHasFetched(false);
            }}
          />
        }
      />
    </StyledScheduledOrderList>
  );
}

const StyledScheduledOrderList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  .pageTitleContainer {
    width: 1024px;
    display: flex;
    justify-content: space-around;
  }
  .pageTitle {
    display: inline-block;
    font-size: 30px;
    width: 1024px;
  }
  .tabs {
    display: flex;
    gap: 20px;
    font-size: 20px;
    justify-content: center;
    width: 1024px;
    padding: 20px 0 10px 0;
    border-top: 2px solid #ccc;
    margin-top: 40px;
    .tabContainer {
      display: flex;
      gap: 20px;
      width: 1024px;
      .tab {
        cursor: pointer;
      }
    }
    .tab.selected {
      font-weight: bold;
    }
  }
  .btn {
    border: 1px solid lightgray;
    border: 5px 10px;
    border-radius: 5px;
    padding: 5px 10px;
    display: inline-block;
    cursor: pointer;
    background-color: #f8f8f8;
    padding: 10px 20px;
    display: inline-block;
    transition: 0.3s;
    white-space: nowrap;
    :hover {
      background-color: #d9fb19;
    }
  }

  @media (max-width: 600px) {
    .pageTitle {
      max-width: 100vw;
    }
  }
`;
