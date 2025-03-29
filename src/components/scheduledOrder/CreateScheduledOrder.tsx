import axios from "axios";
import { Config } from "../../util/Constants";
import { axiosErrorHandler } from "../../util/axiosErrorHandler";
import { DatePicker } from "antd";
import styled from "styled-components";
import { useState } from "react";

export default function CreateScheduledOrder({
  onClose,
}: {
  onClose: () => void;
}) {
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const createScheduledOrder = (date: string, note: string) => {
    if (!date) {
      alert("請選擇訂單日期");
      return;
    }

    axios
      .post(
        Config.url.API_URL + "/feed/scheduledOrders",
        { date: date, note: note },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
        onClose();
      })
      .catch(axiosErrorHandler);
  };

  return (
    <StyledCreateScheduledOrder>
      <h1>新增例行訂單</h1>
      <div className="row">
        <div className="label">訂單日期</div>
        <DatePicker
          rootClassName="custom-datepicker"
          getPopupContainer={(node) => node}
          onChange={(date, dateString) => {
            console.log(date, dateString);
            setDate(dateString as string);
            // createScheduledOrder(dateString as string);
          }}
        />
      </div>
      <div className="row">
        <div className="label">備註</div>
        <textarea
          className="textArea"
          placeholder="請輸入備註"
          onChange={(e) => {
            setNote(e.target.value);
            console.log(e.target.value);
          }}
        />
      </div>
      <div className="btnArea">
        <div
          className="btn confirm"
          onClick={() => {
            createScheduledOrder(date, note);
          }}
        >
          確認
        </div>
        <div
          className="btn"
          onClick={() => {
            onClose();
          }}
        >
          取消
        </div>
      </div>
      {/* Add your form or components here */}
    </StyledCreateScheduledOrder>
  );
}

const StyledCreateScheduledOrder = styled.div`
  width: 500px;
  height: 450px;
  padding: 10px 20px 40px 20px;
  .row {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-top: 20px;
    .label {
      width: 80px;
    }
    textarea {
      border-radius: 5px;
      height: 60px;
      padding: 10px;
    }
  }

  .btnArea {
    text-align: center;
    margin-top: 20px;
    .confirm {
      margin-right: 20px;
    }
    .btn {
      display: inline-block;
      border: 5px 10px;
      border: 1px solid lightgray;
      border-radius: 5px;
      padding: 5px 10px;
      cursor: pointer;
      -webkit-transition: 0.3s;
      transition: 0.3s;
    }
  }
`;
