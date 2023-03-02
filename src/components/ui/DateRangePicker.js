import styled from "styled-components";
import { DatePicker, Space } from "antd";
import 'antd/dist/antd.min.css';
import React, { useState } from "react";
var moment = require("moment");
const { RangePicker } = DatePicker;

const DateRangePicker =  (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  return (
    <DateRangePickerWrap>
      <Space direction="vertical" size={12}>
        <RangePicker
          defaultValue={moment("2015-01-01", "YYYY-MM-DD")}
          ranges={[startDate, endDate]}
          onChange={(momentArr, dateArr) => {
            setStartDate(dateArr[0]);
            setEndDate(dateArr[1]);
          }}
        />
      </Space>
      <div>
        <span
          className="btn"
          onClick={() => {
            if (props.handleSearchRange && startDate && endDate) {
              props.handleSearchRange(startDate, endDate);
            }
          }}
        >
          搜尋
        </span>
        <span
          className="btn"
          onClick={() => {
            setStartDate("");
            setEndDate("");
            if (props.handleClearSearch) {
              props.handleClearSearch();
            }
          }}
        >
          清除
        </span>
      </div>
    </DateRangePickerWrap>
  );
};

const DateRangePickerWrap = styled.div`
  display: flex;
  align-items: center;
  @media (max-width:767px){
    display:block;
  }
  .btn {
    margin-left: 5px;
    border: 1px solid black;
    cursor: pointer;
    display: inline-block;
    padding: 5px 5px;
    @media (max-width: 767px) {
      margin-top: 10px;
    }
  }
`;

export default DateRangePicker;
