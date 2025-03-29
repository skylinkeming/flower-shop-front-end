import styled from "styled-components";

export default function ScheduledOrderList({
  orderList,
  onClickOrder,
}: {
  orderList: Array<any>;
  onClickOrder:(orderId:string)=>void;
}) {
  return (
    <StyledScheduledOrderList>
      <div className="table">
        <div className="orderItem">
          <div className="date">訂單日期</div>
          <div className="note">備註</div>
        </div>
        {orderList.map((order) => {
          return (
            <div key={order._id} className="orderItem" onClick={() => {
                onClickOrder(order._id);
            }}>
              <div className="date">{order.date.split("T")[0]}</div>
              {/* <div className="note">{order.note}</div> */}
            </div>
          );
        })}
      </div>
    </StyledScheduledOrderList>
  );
}

const StyledScheduledOrderList = styled.div`
  width: 1024px;
  height: 100%;
  padding: 20px;
  display:flex;
//   justify-content:center;
  .table {
    padding: 20px 20px;
    width: 500px;
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
    .orderItem {
      display: flex;
      border-bottom: 1px solid rgba(224, 224, 224, 1);
      padding:10px 0;
      cursor:pointer;
      .date {
        width: 200px;
      }
      .note {
        width: 200px;
      }
    }
  }
`;
