import styled from "styled-components";
import LunarCalendar from "./Calendar";
import ToDoList from "./ToDoList";
import { useEffect, useState } from "react";
import { fetchOrders } from "../../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

function getMonthRange(year, month) {
  const firstDay = new Date(year, month - 1, 1); // 該月的第一天
  const lastDay = new Date(year, month, 0); // 該月的最後一天
  return {
    firstDay: firstDay.toLocaleString().split(" ")[0],
    lastDay: lastDay.toLocaleString().split(" ")[0],
  };
}

export default function Schedule() {
  const order = useSelector((state) => {
    return state.order;
  });
  const [page, setPage] = useState(1);
  const [dateRange, setDateRanges] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [sortCondition, setSortCondition] = useState({
    date: -1,
  });
  const [selectDate, setSelectDate] = useState(dayjs().format("YYYY-MM-DD"));

  const dispatch = useDispatch();

  useEffect(() => {
    const now = new Date();
    const range = getMonthRange(now.getFullYear(), now.getMonth() + 1);

    setDateRanges([range.firstDay, range.lastDay]);
  }, []);

  useEffect(() => {
    if (dateRange.length === 0) return;

    dispatch(
      fetchOrders({
        page: page,
        searchKey: searchKey,
        sortCondition: sortCondition,
        dateRange: dateRange,
      }),
    );
  }, [dateRange, page, sortCondition]);

  const getDateTasks = () => {
    let dateTasks = [];
    if (selectDate && order?.orderList?.length) {
      dateTasks = order?.orderList
        .filter((order) => {
          return (
            dayjs(order.date).month() === dayjs(selectDate).month() &&
            dayjs(order.date).date() === dayjs(selectDate).date()
          );
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return dateTasks;
  };

  return (
    <StyledSchedule>
      <div className="flex">
        <div className="calendarWrap">
          <div className="titleContainer">
            <img src="/images/calendar.png" alt="" />
            行事曆
          </div>
          <div className="flex">
            <LunarCalendar
              orderList={order?.orderList}
              onDateChange={(value) => {
                setSelectDate(value.format("YYYY-MM-DD"));
              }}
              onPanelChange={(value) => {
                console.log(value);
                let range = getMonthRange(value.year(), value.month() + 1);
                setDateRanges([range.firstDay, range.lastDay]);
              }}
            />
            <ToDoList
              date={selectDate}
              taskList={getDateTasks()}
              onChange={() => {
                dispatch(
                  fetchOrders({
                    page: page,
                    searchKey: searchKey,
                    sortCondition: sortCondition,
                    dateRange: dateRange,
                  }),
                );
              }}
            />
          </div>
        </div>
      </div>
    </StyledSchedule>
  );
}

const StyledSchedule = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  justify-content: center;
  padding-top: 40px;
  .titleContainer {
    height: 80px;
    font-size: 32px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 30px;
  }
  .flex {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
`;
