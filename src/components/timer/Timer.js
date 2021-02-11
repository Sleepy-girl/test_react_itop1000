import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useCallback,
} from "react";
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

const initialStateTimer = {
  hours: 0,
  mins: 0,
  secs: 0,
  currentDeltaTime: 0,
};

function Timer() {
  const [timer, setTimer] = useState(initialStateTimer);
  const timerRef = useRef(null);

  const delayValue = useRef(0);
  const timerBtnRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const waitBtn = useRef(null);

  const startTimer = useCallback(() => {
    const startTime = Date.now();

    if (timer.currentDeltaTime && !state.start) {
      timerRef.current = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = currentTime - startTime + timer.currentDeltaTime;
        const hours = Math.floor(
          (deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const mins = Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((deltaTime % (1000 * 60)) / 1000);

        setTimer({ hours, mins, secs, currentDeltaTime: deltaTime });
      }, 1000);

      return;
    }

    timerRef.current = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const hours = Math.floor(
        (deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((deltaTime % (1000 * 60)) / 1000);

      setTimer({ hours, mins, secs });
    }, 1000);
  });

  const waitTimer = () => {
    clearInterval(timerRef.current);
  };

  const setWait = () => {
    delayValue.current += 1;
    timerBtnRef.current = setTimeout(() => {
      if (delayValue.current === 2) {
        dispatch({ type: "wait" });
        waitTimer();
        delayValue.current = 0;
        timerBtnRef.current = 0;
        clearInterval(timerBtnRef.current);
        state.start && (waitBtn.current.disabled = true);
      } else {
        delayValue.current = 0;
      }
    }, 300);
  };

  useEffect(() => {
    if (state.start) {
      startTimer();
    }
  }, [startTimer, state.start]);

  return (
    <TimerStyled>
      <div className="wrapperTimer">
        <span className="time symb">
          {timer.hours.toString().padStart(2, "0")}
        </span>
        <span className="symb">:</span>
        <span className="time symb">
          {timer.mins.toString().padStart(2, "0")}
        </span>
        <span className="symb">:</span>
        <span className="time symb">
          {timer.secs.toString().padStart(2, "0")}
        </span>
      </div>

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
