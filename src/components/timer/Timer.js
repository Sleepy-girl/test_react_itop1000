import React, { useEffect, useReducer, useRef } from "react";
import { TimerStyled } from "./TimerStyled";

const initialState = {
  start: false,
  wait: false,
  reset: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "start":
      return { ...state, start: true, wait: false };

    case "stop":
      return { ...state, start: false };

    case "wait":
      return { ...state, start: false, wait: true };

    case "reset":
      return { ...initialState, start: true };

    default:
      return state;
  }
};

function Timer() {
  const delayValue = useRef(0);
  const timerRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const waitBtn = useRef(null);

  const setWait = () => {
    delayValue.current += 1;
    timerRef.current = setTimeout(() => {
      if (delayValue.current === 2) {
        dispatch({ type: "wait" });
        delayValue.current = 0;
        timerRef.current = 0;
        clearInterval(timerRef.current);
        state.start && (waitBtn.current.disabled = true);
      } else {
        delayValue.current = 0;
      }
    }, 300);
  };

  return (
    <TimerStyled>
      <span>00:00:00</span>
      <div className="wrapperBtn">
        <button
          className="start"
          name="start"
          type="button"
          onClick={() => {
            state.start
              ? dispatch({ type: "stop" })
              : dispatch({ type: "start" });
          }}
        >
          {state.start ? "stop" : "start"}
        </button>
        <button
          className="wait"
          name="wait"
          type="button"
          disabled={state.start ? false : true}
          ref={waitBtn}
          onClick={() => {
            state.start && setWait();
          }}
        >
          wait
        </button>
        <button
          className="reset"
          name="reset"
          type="button"
          onClick={() => dispatch({ type: "reset" })}
        >
          reset
        </button>
      </div>
    </TimerStyled>
  );
}

export default Timer;
