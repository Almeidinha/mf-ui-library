import { css } from "styled-components";

const shadowSm = css`
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
`;

const shadow = css`
  box-shadow:
    0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
`;

const shadowMd = css`
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
`;

const shadowLg = css`
  box-shadow:
    0px 10px 15px -3px rgba(0, 0, 0, 0.1),
    0px 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
`;

const shadowXl = css`
  box-shadow:
    0px 20px 25px -5px rgba(0, 0, 0, 0.1),
    0px 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-radius: 6px;
`;

const shadow2Xl = css`
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
`;

const shadowInner = css`
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
`;

export {
  shadow,
  shadow2Xl,
  shadowInner,
  shadowLg,
  shadowMd,
  shadowSm,
  shadowXl,
};
