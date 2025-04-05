import styled from "styled-components";
import { getLunarData } from "./Calendar";
import dayjs from "dayjs";
import { Checkbox } from "antd";
import { useOrderHandler } from "../../hooks/useOrderHandler";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import CustomizedDialogs from "../ui/CustomDialog";
import { useState } from "react";
import AddOrder from "../order/AddOrder";
import { useDispatch } from "react-redux";
import {
  clearEditOrder,
  updateEditOrder,
} from "../../features/order/orderSlice";

const notify = () => toast("Here is your toast.");

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function ToDoList({
  date,
  taskList,
  onChange,
}: {
  date: string;
  taskList: Array<any>;
  onChange: () => void;
}) {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAddOrder, setShowAddOrder] = useState<boolean>(false);

  const dayjsDate = dayjs(date);
  const { updateOrderStatus } = useOrderHandler();

  return (
    <StyledToDoList>
      <div className="dateData">
        <div>{date ? date : ""}</div>
        {date && (
          <div>
            {"農曆" +
              getLunarData(dayjsDate).lunarMonth +
              "月" +
              getLunarData(dayjsDate).lunarDate}
          </div>
        )}
      </div>
      {taskList.length === 0 && (
        <div className="noTask">
          <img src="/images/notask.jpg" alt="" />
          <div>今天沒事做喔</div>
        </div>
      )}
      {taskList.map((task) => {
        return (
          <div
            className="hrTask"
            key={task._id}
            onClick={() => {
              setShowAddOrder(true);
              dispatch(
                updateEditOrder({
                  ...task,
                }),
              );
            }}
          >
            <div className="time">
              {
                new Date(task.date)
                  .toLocaleString()
                  .split(" ")[1]
                  .split(":00")[0]
              }
            </div>
            <div className="task">
              <div className="clientName">{task.clientName}</div>
              <div className="totalPrice">{task.totalPrice}</div>
            </div>
            <div className="checkBox" onClick={(e) => e.stopPropagation()}>
              <Checkbox
                {...label}
                checked={!!task.shippingStatus}
                onChange={(e) => {
                  updateOrderStatus(2, !task.shippingStatus, [task._id]).then(
                    (_) => {
                      onChange();
                      toast(
                        "訂單狀態更新成 " +
                          (!task.shippingStatus ? "已送達" : "未送達"),
                      );
                    },
                  );
                }}
              />
            </div>
          </div>
        );
      })}
      <Toaster />
      <CustomizedDialogs
        show={showAddOrder}
        onCloseDialog={() => {
          setShowAddOrder(false);
        }}
        content={
          <AddOrder
            isPopup
            isAdd={false}
            scheduledOrder={""}
            onClose={(isChanged: boolean) => {
              setShowAddOrder(false);
              if (isChanged) {
                onChange();
                toast("訂單更新成功");
              }
            }}
          />
        }
      />
    </StyledToDoList>
  );
}

const StyledToDoList = styled.div`
  background: white;
  width: 320px;
  height: 790px;
  margin-top: 2px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid #ddd;
  gap: 10px;
  .dateData {
    font-weight: bold;
    font-size: 24px;
    padding-bottom: 20px;
  }
  .noTask {
    padding-top: 100px;
    text-align:center;
    img {
      width: 100%;
    }
  }
  .hrTask {
    border: 1px solid #ddd;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 5px 10px;
    cursor: pointer;
    position: relative;
    &:hover {
      background: #a3fea7;
    }
    .time {
      border-right: 2px solid rgb(25, 118, 210);
      padding-right: 5px;
      height: 100%;
      display: flex;
      width: 75px;
      align-items: center;
    }
    // .task {
    //   display: flex;
    //   .clientName {
    //     width:50px;
    //   }
    // }
    .checkBox {
      position: absolute;
      right: 20px;
      top: 10px;
    }
  }
`;
