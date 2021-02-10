import styled from "styled-components";

export const TimerStyled = styled.div`
  text-align: center;

  span {
    display: block;
    font-size: 70px;
    color: rgb(61, 61, 61);
    margin-bottom: 30px;
  }

  button {
    width: 99px;
    height: 40px;
    font-size: 14px;
    text-transform: uppercase;
    color: cornsilk;
    background-color: crimson;
    border: none;
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
  button:hover,
  button:focus {
    background-color: rgba(220, 20, 60, 0.8);
  }
`;
