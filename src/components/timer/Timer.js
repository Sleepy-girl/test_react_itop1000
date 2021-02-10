import React, { useState, useReducer, useEffect, useRef } from "react";
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
      return initialState;

    default:
      return state;
  }
};

function Timer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const waitBtn = useRef(null);

  useEffect(() => {
    if (state.wait) {
      setTimeout(() => {
        waitBtn.current.disabled = false;
        dispatch({ type: "start" });
      }, 300);
    }
  }, [state.wait]);

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
          disabled={state.start ? state.wait : false}
          ref={waitBtn}
          onClick={() => {
            state.start && dispatch({ type: "wait" });
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
