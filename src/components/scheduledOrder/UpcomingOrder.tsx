import axios from "axios";
import styled from "styled-components";
import { Config } from "../../util/Constants";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { axiosErrorHandler } from "../../util/axiosErrorHandler";
import ClientOrderItem from "./ClientOrderItem";
import { updateEditOrder } from "../../features/order/orderSlice";
import CustomizedDialogs from "../ui/CustomDialog";
import AddOrder from "../order/AddOrder";

export default function UpcomingOrder({
  currentOrder,
  onNeedRefresh,
}: {
  currentOrder: any;
  onNeedRefresh: () => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [orderPopupOption, setOrderPopupOption] = useState<"isAdd" | "isEdit">(
    "isAdd",
  );
  const [selectedList, setSelectedList] = useState<any[]>([]);
  const [showAddOrder, setShowAddOrder] = useState(false);

  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");

  console.log({ currentOrder });

  const deleteManyOrders = () => {
    let requestBody = {
      idArray: selectedList,
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
        console.log(res);
        setSelectedList([]);
        // setHasFetched(false);
        onNeedRefresh();
      })
      .catch((err) => {
        axiosErrorHandler(err);
      });
  };
  return (
    <StyledUpcomingOrder>
      <div className="table">
        <div className="tableHeader">
          <div>訂單日期：{currentOrder?.date.split("T")[0]}</div>
          <div className="btns">
            <div
              className="editBtn btn"
              onClick={() => {
                if (selectedList.length === 0) {
                  setShowAddOrder(true);
                  setOrderPopupOption("isAdd");
                } else {
                  deleteManyOrders();
                }
              }}
            >
              {selectedList.length > 0 ? "刪除客戶" : "＋新增客戶"}
            </div>
            <div
              className="deleteBtn btn"
              onClick={() => {
                if (editMode) {
                  setSelectedList([]);
                }
                setEditMode((prevEditMode) => !prevEditMode);
              }}
            >
              {editMode ? "取消" : "編輯"}
            </div>
          </div>
        </div>
        <div className="tableBody">
          <ClientOrderItem isTitle={true} />
          {!isMobile && <ClientOrderItem isTitle={true} />}
          {currentOrder?.orders.map((item: any, index: number) => {
            return (
              <ClientOrderItem
                isSelected={selectedList.includes(item._id)}
                onSelect={() => {
                  if (selectedList.includes(item._id)) {
                    setSelectedList((list) =>
                      list.filter((id) => id !== item._id),
                    );
                  } else {
                    setSelectedList((list) => [...list, item._id]);
                  }
                }}
                isEditMode={editMode}
                key={index}
                clientOrderData={item}
                onClickDetail={() => {
                  setShowAddOrder(true);
                  setOrderPopupOption("isEdit");
                  dispatch(
                    updateEditOrder({
                      ...item,
                      products: JSON.parse(item.products),
                    }),
                  );
                }}
              />
            );
          })}
        </div>
      </div>
      <CustomizedDialogs
        show={showAddOrder}
        onCloseDialog={() => setShowAddOrder(false)}
        content={
          <AddOrder
            isPopup
            isAdd={orderPopupOption === "isAdd"}
            scheduledOrder={currentOrder?._id}
            onClose={() => {
              setShowAddOrder(false);
              onNeedRefresh();
              //   setHasFetched(false);
            }}
          />
        }
      />
    </StyledUpcomingOrder>
  );
}

const StyledUpcomingOrder = styled.div`
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
    }
    .tableBody {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0px;
    }
  }

  @media (max-width: 600px) {
    .table {
      max-width: 100vw;
      box-sizing: border-box;
      .tableBody {
        display: block;
      }
    }
  }
`;
