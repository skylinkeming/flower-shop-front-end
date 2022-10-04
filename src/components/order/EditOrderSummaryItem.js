import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  updateEditOrderProduct,
  updateEditOrder,
} from "../../features/order/orderSlice";

const EditOrderSummaryItem = (props) => {
  const product = useSelector((state) => {
    return state.order.editOrder.products[props.index];
  });
  const products = useSelector((state) => {
    return state.order.editOrder.products;
  });

  const dispatch = useDispatch();
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  useEffect(() => {
    setTotalPrice();
  }, [product.quantity, product.price]);

  const setTotalPrice = () => {
    let total = 0;
    products.forEach((p) => {
      total += p.price * p.quantity;
    });
    dispatch(updateEditOrder({ totalPrice: total }));
  };

  return (
    <EditOrderSummaryItemWrap
      onMouseOver={() => setShowDeleteBtn(true)}
      onMouseLeave={() => setShowDeleteBtn(false)}
    >
      <div className={"inputRow"}>
        <input
          placeholder="商品名稱"
          value={product.productName}
          onChange={(e) => {
            dispatch(
              updateEditOrderProduct({
                index: props.index,
                productName: e.target.value,
              })
            );
          }}
        />
        <input
          placeholder="價錢"
          type="number"
          value={product.price}
          onChange={(e) => {
            dispatch(
              updateEditOrderProduct({
                index: props.index,
                price: +e.target.value,
              })
            );
          }}
        />
        <input
          placeholder="數量"
          type="number"
          value={product.quantity}
          onChange={(e) => {
            dispatch(
              updateEditOrderProduct({
                index: props.index,
                quantity: +e.target.value,
              })
            );
          }}
        />
        <span>
          {product.price * product.quantity
            ? product.price * product.quantity
            : "小計"}
        </span>
        <div
          className={showDeleteBtn ? "deleteBtn show" : "deleteBtn"}
          onClick={props.onClickDeleteBtn}
        >
          一
        </div>
      </div>
    </EditOrderSummaryItemWrap>
  );
};

const EditOrderSummaryItemWrap = styled.div`
  .inputRow {
    display: flex;
    justify-content: space-around;
    padding-right: 20px;
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    padding-left: 10px;
    box-sizing: border-box;
    .deleteBtn {
      border: 5px 10px;
      border: 1px solid lightgray;
      border-radius: 5px;
      padding: 3px 10px;
      cursor: pointer;
      transition: 0.3s;
      opacity: 1;
    }
    .deleteBtn.show {
      opacity: 1;
    }
  }
  input,
  span {
    margin-right: 20px;
    font-size: 16px;
    width: 120px;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 5px;
  }
  span {
    border: none;
    text-align: center;
  }
`;

export default EditOrderSummaryItem;
