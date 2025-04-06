import { Modal } from "antd";
import LunarDateCalendar from "./LunarDateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export default function LunarDatePickerPopup({
  show,
  selectDate,
  onOk,
  onCancel,
}: {
  show: boolean;
  selectDate?: string;
  onOk: (date: Dayjs) => void;
  onCancel: () => void;
}) {
  const [selectedVal, setSelectedVal] = useState(undefined);

  return (
    <Modal
      title="選擇日期"
      open={show}
      onOk={() => {
        onOk(selectedVal);
      }}
      onCancel={onCancel}
    >
      <LunarDateCalendar
        currValue={selectDate ? dayjs(selectDate) : dayjs()}
        onDateSelected={(date) => setSelectedVal(date)}
      />
      <div>
        <input
          key={show ? 1 : 0}
          placeholder="可輸入幾點幾分於此，例如：09:00"
          style={{
            marginTop: "10px",
            width: "100%",
            textAlign: "center",
          }}
          defaultValue={
            selectedVal
              ? selectedVal?.format("HH:mm")
              : dayjs(selectDate).format("HH:mm")
          }
          onBlur={(e) => {
            const time = e.target.value;
            if (time) {
              const [hour, minute] = time.split(":").map(Number);
              const newDate = selectedVal
                ?.set("hour", hour)
                .set("minute", minute);
              setSelectedVal(newDate);
            }
          }}
          // onChange={}
        />
      </div>
    </Modal>
  );
}
