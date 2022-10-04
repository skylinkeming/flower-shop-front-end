import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementAsync } from "./counterSlice";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementAsync(3))}>
        IncrementAsync
      </button>
    </div>
  );
}
