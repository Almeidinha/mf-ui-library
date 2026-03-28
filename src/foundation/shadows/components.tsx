import styled from "styled-components";

import { Surface } from "../colors";
import { Padding } from "../spacing";
import {
  shadow,
  shadow2Xl,
  shadowInner,
  shadowLg,
  shadowMd,
  shadowSm,
  shadowXl,
} from "./shadows";

const Container = styled.div`
  width: 128px;
  height: 128px;
  background: ${Surface.Default.Default};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${Padding.none};
`;

const ShadowSm = styled(Container)`
  ${shadowSm}
`;
const Shadow = styled(Container)`
  ${shadow}
`;

const ShadowMd = styled(Container)`
  ${shadowMd}
`;
const ShadowLg = styled(Container)`
  ${shadowLg}
`;

const ShadowXl = styled(Container)`
  ${shadowXl}
`;

const Shadow2Xl = styled(Container)`
  ${shadow2Xl}
`;

const ShadowInner = styled(Container)`
  ${shadowInner}
`;

export {
  Shadow,
  Shadow2Xl,
  ShadowInner,
  ShadowLg,
  ShadowMd,
  ShadowSm,
  ShadowXl,
};
