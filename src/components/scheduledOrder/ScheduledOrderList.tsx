import styled from "styled-components";
import ClientOrderItem from "./ClientOrderItem";
import React from "react";
import AddOrder from "../order/AddOrder";
import CustomizedDialogs from "../ui/CustomDialog";

export default function ScheduledOrderList() {
  const [showAddOrder, setShowAddOrder] = React.useState(false);

  const data = [
    { name: "興安宮" },
    { name: "興安宮" },
    { name: "興安宮" },
    { name: "興安宮" },
    { name: "興安宮" },
    { name: "興安宮" },
    { name: "興安宮" },
  ];

  return (
    <StyledScheduledOrderList>
      <div className="pageTitle">例行訂單</div>
      <div className="table">
        <div className="tableHeader">
          <div>訂單日期：2025/3/23</div>
          <div className="btns">
            <div
              className="editBtn btn"
              onClick={() => {
                setShowAddOrder(true);
              }}
            >
              ＋新增客戶
            </div>
            <div className="deleteBtn btn" onClick={() => {}}>
              編輯
            </div>
          </div>
        </div>
        <div className="tableBody">
          <ClientOrderItem isTitle={true} />
          <ClientOrderItem isTitle={true} />
          {data.map((item, index) => {
            return <ClientOrderItem key={index} clientOrderData={item} />;
          })}
        </div>
      </div>
      <CustomizedDialogs
        show={showAddOrder}
        onCloseDialog={() => setShowAddOrder(false)}
        content={<AddOrder isPopup/>}
      />
    </StyledScheduledOrderList>
  );
}

const StyledScheduledOrderList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  .pageTitle {
    display: inline-block;
    font-size: 30px;
    width: 1024px;
  }
  .table {
    padding: 20px 20px;
    width: 1024px;
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
    .tableHeader {
      padding-top: 10px;
      padding-bottom: 20px;
      border-bottom: 2px solid rgba(224, 224, 224, 1);
      margin-bottom: 25px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .btns {
        display: flex;
        gap: 10px;
      }
      .btn {
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
    }
    .tableBody {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0px;
    }
  }
`;
