import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function ClientOrderItem({
  clientOrderData,
  onClickDetail,
  isTitle,
}: {
  clientOrderData?: any;
  onClickDetail?: () => void;
  isTitle?: boolean;
}) {

  if (isTitle) {
    return (
      <StyledClientItem>
        <div className="first flex">客戶名稱</div>
        <div className="second flex">數量及金額</div>
      </StyledClientItem>
    );
  }

  return (
    <StyledClientItem
      onClick={() => {
        onClickDetail()
      }}
    >
      <div className="first flex">
        <div>{clientOrderData?.clientName}</div>
      </div>
      <div className="second flex">
        <div className="total">{clientOrderData.totalPrice}</div>
        <Checkbox
          onClick={e=> e.stopPropagation()}
          {...label}
          // color="success"
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
        />

        <div className="paidStatus">{clientOrderData.note}</div>
      </div>
    </StyledClientItem>
  );
}

const StyledClientItem = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 0px 10px;
  height: 60px;
  font-size: 24px;
  outline: 1px solid rgba(224, 224, 224, 1);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0px;
  .first {
    border-right: 1px solid rgba(224, 224, 224, 1);
  }
  .first,
  .second {
    height: 100%;
    padding-left: 10px;
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .total {
    width: 60px;
  }
  .paidStatus {
    text-align: right;
    font-size: 18px;
    position: absolute;
    right: 10px;
    bottom: 15px;
  }
`;
