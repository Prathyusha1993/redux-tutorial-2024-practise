import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset, addByAmount } from "./counterSlice";

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);
  const [incAmount, setIncAmount] = useState(0);
  const addValue = Number(incAmount) || 0;
  const resetAll = () => {
    setIncAmount(0);
    dispatch(reset());
  };
  return (
    <div>
      <section>
        <p>{count}</p>
        <div>
          <button onClick={() => dispatch(increment())}>+</button>
          <button onClick={() => dispatch(decrement())}>-</button>
          <input
            type="text"
            value={incAmount}
            onChange={(e) => setIncAmount(e.target.value)}
          />
          <div>
            <button onClick={() => dispatch(addByAmount(addValue))}>
              Add Amount
            </button>
            <button onClick={resetAll}>Reset</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Counter;
