import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  updateEditOrderProduct,
  updateEditOrder,
} from "../../features/order/orderSlice";

const EditOrderSummaryItem = (props) => {
  const products = useSelector((state) => {
    return state.order.editOrder.products;
  });
  const product = products[ props.index ];

  const dispatch = useDispatch();
  const [ showDeleteBtn, setShowDeleteBtn ] = useState(false);

  useEffect(() => {
    setTotalPrice();
  }, [ product.quantity, product.price ]);

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
        <select
          className="productOption"
          value={product.productId}
          onChange={(e) => {
            let selectProduct = props.productOptions.filter(
              (o) => o._id === e.target.value
            );
            dispatch(
              updateEditOrderProduct({
                index: props.index,
                productName: selectProduct[ 0 ].productName,
                productId: selectProduct[ 0 ]._id,
              })
            );
          }}
        >
          <option value="" disabled hidden>
            選擇商品
          </option>
          {props.productOptions.map((option) => {
            return <option key={option._id} value={option._id}>{option.productName}</option>;
          })}
        </select>

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
  .productOption {
    width: 120px;
    height: 37px;
    border-radius: 5px;
    margin-right: 5px;
    @media (max-width: 767px) {
      width: 80px;
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
