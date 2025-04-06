import React from "react";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar, theme } from "antd";
import type { Dayjs } from "dayjs";
import zhTW from "antd/es/calendar/locale/zh_TW";
import "dayjs/locale/zh-tw";
import dayLocaleData from "dayjs/plugin/localeData";
import dayjs from "dayjs";
import { toTraditional } from "chinese-simple2traditional";
import { Solar, Lunar, HolidayUtil, Tao } from "lunar-javascript";
import styled from "styled-components";

dayjs.extend(dayLocaleData);

export const getLunarData = (value: Dayjs) => {
  const lunarObj = Lunar.fromDate(value.toDate());
  const lunarDate = lunarObj.getDayInChinese();
  const lunarMonth = lunarObj.getMonthInChinese();
  return { lunarDate, lunarMonth };
};

const getListData = (value: Dayjs) => {
  let listData: { type: string; content: string }[] = []; // Specify the type of listData
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "新信興" },
        { type: "success", content: "例行訂單" },
      ];
      break;
    case 10:
      listData = [
        // { type: "warning", content: "This is warning event." },
        // { type: "success", content: "This is usual event." },
        // { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        // { type: "warning", content: "This is warning event" },
        // { type: "success", content: "This is very long usual event......" },
        // { type: "error", content: "This is error event 1." },
        // { type: "error", content: "This is error event 2." },
        // { type: "error", content: "This is error event 3." },
        // { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const LunarCalendar: React.FC = ({
  orderList,
  onDateChange,
  onPanelChange,
}: {
  orderList: Array<any>;
  onDateChange: (date: any) => void;
  onPanelChange: (date: any) => void;
}) => {
  const monthCellRender = (value: Dayjs) => {
    return  null;
  };
  // CWA-58423588-A3EF-4858-B8DA-9FE3759A91FE

  const getDateTasks = (targetDate: any) => {
    let dateTasks = [];
    if (orderList?.length) {
      dateTasks = orderList.filter((order) => {
        // console.log(dayjs(order.date).month(), targetDate.month());
        // console.log(dayjs(order.date).date(), targetDate.date());

        return (
          dayjs(order.date).month() === targetDate.month() &&
          dayjs(order.date).date() === targetDate.date()
        );
      });
    }
    return dateTasks;
  };

  const dateCellRender = (value: Dayjs) => {
    // console.log(value.year(), value.month() + 1, value.date());
    // const listData = getListData(value);
    const lunarObj = Lunar.fromDate(value.toDate());
    const lunarData = getLunarData(value);

    let godFestivalName = "";
    // try {
    //   var d = Tao.fromLunar(
    //     Lunar.fromYmd(value.year(), value.month() + 1, value.date()),
    //   );
    //   var l = d.getFestivals();
    //   if (l.length) {
    //     godFestivalName = toTraditional(l[0].getName());
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    const tasks = getDateTasks(value);

    return (
      <ul
        className="events"
        style={{
          paddingLeft: "0",
        }}
      >
        {/* {showCondition && ( */}
        <li
          className="lunarDate"
          key={lunarObj.getDayInChinese()}
          style={{
            position: "absolute",
            top: "5px",
            listStyle: "none",
          }}
        >
          {lunarData.lunarDate}
        </li>
        {/* )} */}
        {godFestivalName && (
          <li
            className="godFestival"
            style={{
              position: "absolute",
              top: "20px",
              left: "0px",
              listStyle: "none",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: "100%",
            }}
          >
            {godFestivalName}
          </li>
        )}
        {/* {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))} */}
        {tasks.map((order) => (
          <li key={order._id}>
            <Badge
              status={order.isPaid ? "success" : "warning"}
              text={order.clientName}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <StyledLunarCalendar>
      <Calendar
        onChange={(date) => onDateChange(date)}
        onPanelChange={onPanelChange}
        cellRender={cellRender}
        locale={zhTW}
      />
    </StyledLunarCalendar>
  );
};

export default LunarCalendar;

const StyledLunarCalendar = styled.div`
  border: 2px solid rgba(5, 5, 5, 0.01);
  .calendarWrap {
    width: 800px;
    div {
    }
  }
  .ant-picker-calendar-header {
    padding: 12px 12px;
  }
  .ant-picker-calendar {
    width: 900px;
    border-radius: 20px;
  }
  .ant-picker-panel {
    border-radius: 20px;
  }
  @media (max-width: 768px) {
    .ant-picker-calendar {
      width: 100%;
    }
  }
`;
