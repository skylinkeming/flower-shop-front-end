import { Fragment } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { converToDateAndTimeStr } from "../../util/dateHelper";

const ClientOrderList = ({ orderList }) => {
  let navigate = useNavigate();

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
                className="orderRow data"
                key={idx}
                onClick={() => {
                  navigate("/order/" + order._id);
                }}
              >
                <div className="date">{converToDateAndTimeStr(order.date)}</div>
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
      <div className="orderTab"></div>
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
  .orderRow.data {
    :hover {
      background: #f5f6f7;
    }
  }
  .date {
    width: 33%;
    overflow: hidden;
    white-space: nowrap;
  }
  .products {
    width: 33%;
    text-align: center;
  }
  .totalPrice {
    width: 33%;
    text-align: center;
  }
`;

export default ClientOrderList;
