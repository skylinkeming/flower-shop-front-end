import { Fragment } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ClientOrderList = ({ orderList }) => {
  let navigate = useNavigate();

  const getDateStr = (date) => {
    const dateObj = new Date(date);
    const dateStr =
      dateObj.getFullYear() +
      "-" +
      (dateObj.getMonth() + 1) +
      "-" +
      dateObj.getDate();
    const timeStr =
      dateObj.getHours() +
      ":" +
      (dateObj.getMinutes() == 0 ? "00" : dateObj.getMinutes());
    return dateStr + " " + timeStr;
  };

  const renderProductList = (order) => {
    const products = JSON.parse(order.products);
    const finalIndex = products.length - 1;
    return (
      <Fragment>
        {products.map((p, index) => (
          <span key={index} className="product">
            {p.productName +
              "(" +
              p.quantity +
              ")" +
              (index !== finalIndex ? "," : "")}
          </span>
        ))}
      </Fragment>
    );
  };

  const renderOrderList = () => {
    if (orderList.length) {
      return (
        <Fragment>
          {orderList.map((order, idx) => {
            return (
              <div
                className="orderRow"
                key={idx}
                onClick={() => {
                  navigate("/order/" + order._id);
                }}
              >
                <div className="date">{getDateStr(order.date)}</div>
                <div className="products">{renderProductList(order)}</div>
                <div className="totalPrice">{order.totalPrice}</div>
              </div>
            );
          })}
        </Fragment>
      );
    } else {
      return <div className="noOrder">暫無訂單</div>;
    }
  };

  return (
    <ClientOrderListWrap>
      <div className="orderTab">
      </div>
      <div className="orderRow tableHeader">
        <div className="date">日期</div>
        <div className="products">商品</div>
        <div className="totalPrice">總金額</div>
      </div>
      {renderOrderList()}
    </ClientOrderListWrap>
  );
};

const ClientOrderListWrap = styled.div`
  font-size: 18px;
  line-height: 25px;
  .orderTab {
    color: #aaa;
    border-bottom: 2px solid #aaa;
    padding-bottom: 10px;
    font-size: 18px;
    text-align: right;
    span {
      margin: 0 10px;
      cursor: pointer;
      :nth-of-type(1) {
        color: black;
      }
    }
  }
  .noOrder {
    text-align: center;
    margin-top: 120px;
  }
  .tableHeader.orderRow {
    cursor: initial;
    border-bottom: 2px solid rgba(224, 224, 224, 1);
    text-align: center;
  }
  .orderRow {
    cursor: pointer;
    padding: 5px;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }
  .date {
    width: 150px;
  }
  .products {
    width: 300px;
    text-align: center;
  }
`;

export default ClientOrderList;
