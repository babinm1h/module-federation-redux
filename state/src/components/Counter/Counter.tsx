import { counterSliceActions } from "@/slices/counter.slice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state: any) => state.counter);

  const handleInc = () => {
    dispatch(counterSliceActions.inc());
  };
  const handleDec = () => {
    dispatch(counterSliceActions.dec());
  };

  return (
    <div>
      <h4>Count: {count}</h4>
      <div>
        <button onClick={handleInc}>Incr</button>
        <button onClick={handleDec}>Decr</button>
      </div>
    </div>
  );
};

export default Counter;

