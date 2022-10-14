import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { highlightText } from "../../util/highlightText";

const OrderItem = (props) => {
  const {
    client,
    date,
    imageUrl,
    isPaid,
    products,
    shippingStatus,
    totalPrice,
    address,
    _id,
    isSelected,
    searchKey,
  } = props;
  const navigate = useNavigate();
  const dateObj = new Date(date);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const dateStr =
    dateObj.getFullYear() +
    "-" +
    (dateObj.getMonth() + 1) +
    "-" +
    dateObj.getDate();
  const timeStr =
    dateObj.getHours() +
    ":" +
    (dateObj.getMinutes() === 0 ? "00" : dateObj.getMinutes());

  const renderProductList = () => {
    const finalIndex = products.length - 1;
    return (
      <div className="productList">
        {products.map((p, index) => (
          <span
            key={index}
            className="productRow"
            dangerouslySetInnerHTML={{
              __html: highlightText(
                searchKey,
                p.productName +
                  "(" +
                  p.quantity +
                  ")" +
                  (index !== finalIndex ? "," : "")
              ),
            }}
          ></span>
        ))}
      </div>
    );
  };

  return (
    <OrderItemWrap
      {...props}
      onClick={() => {
        navigate("/order/" + _id);
      }}
    >
      <span
        className="column checkbox"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Checkbox
          {...label}
          checked={isSelected}
          onChange={(e) => {
            props.handleTickCheckbox(e.target.checked);
          }}
        />
      </span>
      <div className="column date">{dateStr}</div>
      <div className="column time">{timeStr}</div>
      <div
        className="column client"
        dangerouslySetInnerHTML={{
          __html: highlightText(searchKey, client.name),
        }}
      ></div>
      <div className="column products">{renderProductList()}</div>
      <div className="column totalPrice">{totalPrice}</div>
      <div
        className="column address"
        dangerouslySetInnerHTML={{
          __html: highlightText(searchKey, address),
        }}
      ></div>
      <div className="column isPaid">{isPaid ? "已付款" : "未付款"}</div>
      <div className="column shippingStatus">
        {shippingStatus ? "已送達" : "未送"}
      </div>
      <div className="column"></div>
      <div className="column"></div>
    </OrderItemWrap>
  );
};

const OrderItemWrap = styled.div`
  display: flex;
  background-color: ${(props) => (props.isSelected ? "#f5f6f7" : "")};
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  align-items: center;
  height: 50px;
  cursor: pointer;
  :hover {
    background-color: #f5f6f7;
  }
  .productRow {
    white-space: nowrap;
    .column.client {
      margin-left: 10px;
    }
  }
`;

export default OrderItem;
