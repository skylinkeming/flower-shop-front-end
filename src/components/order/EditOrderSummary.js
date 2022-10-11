import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import EditOrderSummaryItem from "./EditOrderSummaryItem";
import { updateEditOrder } from "../../features/order/orderSlice";
import { useEffect } from "react";

const EditOrderSummary = (props) => {
  const editOrder = useSelector((state) => {
    return state.order.editOrder;
  });
  const products = editOrder.products;
  const dispatch = useDispatch();

  useEffect(() => {
    setTotalPrice();
  }, [products]);

  const setTotalPrice = () => {
    let total = 0;
    products.forEach((p) => {
      total += p.price * p.quantity;
    });
    dispatch(updateEditOrder({ totalPrice: total }));
  };

  return (
    <EditOrderSummaryWrap>
      <div className="editProductTop">
        <div
          className="addBtn"
          onClick={() => {
            const newList = products.slice();
            newList.push({ productName: "", price: "", quantity: "" });
            dispatch(updateEditOrder({ products: newList }));
          }}
        >
          ＋
        </div>
      </div>
      <div className="showInput">
        {(!products || products.length === 0) && (
          <div className="noItem">暫無項目</div>
        )}
        {products &&
          products.map((p, index) => (
            <EditOrderSummaryItem
              key={index}
              index={index}
              onClickDeleteBtn={() => {
                let editList = products.slice();
                editList = editList.filter((p, idx) => idx !== index);
                dispatch(updateEditOrder({ products: editList }));
              }}
            />
          ))}
        {products && products.length > 0 && (
          <div className="total">總金額：{editOrder.totalPrice}</div>
        )}
      </div>
    </EditOrderSummaryWrap>
  );
};

const EditOrderSummaryWrap = styled.div`
  position: relative;
  .showInput {
    margin-bottom: 20px;
    .inputRow {
      @media (max-width: 767px) {
        padding-left:0px;
      }
      input {
        @media (max-width: 767px) {
          width: 70px;
          margin-right: 5px;
        }
      }
      input:nth-of-type(1) {
        @media (max-width: 767px) {
          width: 70px;
        }
      }
      input:nth-of-type(3) {
        @media (max-width: 767px) {
          width: 50px;
        }
      }
    }
    .noItem {
      text-align: center;
    }
    .total {
      text-align: right;
      border-top: 1px solid;
      margin: 0 20px 0 10px;
      padding-top: 5px;
      padding-right: 95px;
    }
  }
  .addBtn {
    position: absolute;
    border: 5px 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 5px 15px;
    top: -70px;
    right: -4px;
    cursor: pointer;
    transition: 0.3s;
  }
`;

export default EditOrderSummary;
