import styled from "styled-components";

export const TimerStyled = styled.div`
  text-align: center;
  .wrapperTimer {
    margin-bottom: 50px;
  }
  span {
    display: inline-block;
    font-size: 60px;
    letter-spacing: 0.02em;
    /* color: rgb(61, 61, 61); */
    color: whitesmoke;
  }
  .time {
    width: 120px;
    height: 140px;
    line-height: 120px;
    font-weight: 200;
    background: linear-gradient(to top, black, crimson 70%);
  }
  .symb:not(:last-of-type) {
    margin-right: 20px;
  }
  button {
    width: 160px;
    height: 60px;
    font-size: 14px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    /* color: cornsilk; */
    color: whitesmoke;
    background: radial-gradient(
      ellipse farthest-corner at 80px 30px,
      /* white, */ crimson,
      black
    );
    border: none;
    outline: none;
    cursor: pointer;
  }

  button:not(:last-of-type) {
    margin-right: 1px;
  }

  .start {
    border-radius: 50pc 0 0 50pc;
  }
  .reset {
    border-radius: 0 50pc 50pc 0;
  }
  .start,
  .reset {
    border-right: solid 1px whitesmoke;
  }
  .start,
  .reset {
    border-left: solid 1px whitesmoke;
  }
  button:hover,
  button:focus {
    background: radial-gradient(
      ellipse farthest-corner at 80px 30px,
      crimson,
      black 80%
    );
  }
`;
